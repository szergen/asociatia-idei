#!/bin/bash

# Quick fix script for common OpenEDX login issues
# Run this if users can't log in

set -e

echo "================================================"
echo "🔧 OpenEDX Login Issue Fixer"
echo "================================================"
echo ""

echo "This script will:"
echo "  1. Create missing user profiles"
echo "  2. Activate all users"
echo "  3. Clear sessions"
echo "  4. Restart LMS"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo "Step 1/4: Creating missing user profiles..."
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
from common.djangoapps.student.models import UserProfile

User = get_user_model()
fixed = 0

for user in User.objects.all():
    try:
        profile = user.profile
        print(f'  {user.username} - Profile OK')
    except UserProfile.DoesNotExist:
        UserProfile.objects.create(
            user=user,
            name=user.username
        )
        print(f'  ✅ Created profile for {user.username}')
        fixed += 1

if fixed > 0:
    print(f'\n✅ Created {fixed} missing profile(s)')
else:
    print('\n✅ All profiles already exist')
"

echo ""
echo "Step 2/4: Activating all users..."
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
count = User.objects.filter(is_active=False).update(is_active=True)
if count > 0:
    print(f'✅ Activated {count} user(s)')
else:
    print('✅ All users already active')
"

echo ""
echo "Step 3/4: Clearing sessions..."
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.sessions.models import Session
count = Session.objects.all().count()
Session.objects.all().delete()
print(f'✅ Cleared {count} session(s)')
"

echo ""
echo "Step 4/4: Restarting LMS..."
tutor local restart lms > /dev/null 2>&1

echo ""
echo "================================================"
echo "✅ All Done!"
echo "================================================"
echo ""
echo "Try logging in now:"
echo "  URL: http://local.overhang.io:8000"
echo ""
echo "💡 Tips:"
echo "  - Use your USERNAME (not email) to log in"
echo "  - Try Incognito/Private mode to avoid cache"
echo "  - Wait 30 seconds for LMS to fully restart"
echo ""
echo "If you still can't log in:"
echo "  - Check logs: tutor local logs lms -f"
echo "  - See: TROUBLESHOOTING-LOGIN.md"
echo ""

