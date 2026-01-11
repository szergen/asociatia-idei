#!/bin/bash

# Script to create OpenEDX users with proper profile
# This prevents the 500 error on login

set -e

echo "================================================"
echo "OpenEDX User Creator (with Profile)"
echo "================================================"
echo ""

# Get user details
read -p "Username: " username
read -p "Email: " email
read -p "Full Name: " fullname
read -sp "Password: " password
echo ""
read -p "Is this a superuser? (y/n): " is_super
read -p "Is this staff (can create courses)? (y/n): " is_staff

# Set boolean values
if [[ "$is_super" == "y" || "$is_super" == "Y" ]]; then
    superuser="True"
    staff="True"  # Superusers must be staff
else
    superuser="False"
    if [[ "$is_staff" == "y" || "$is_staff" == "Y" ]]; then
        staff="True"
    else
        staff="False"
    fi
fi

echo ""
echo "Creating user with profile..."

# Create user with profile
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
from common.djangoapps.student.models import UserProfile

User = get_user_model()

# Create or get user
user, created = User.objects.get_or_create(
    username='$username',
    defaults={
        'email': '$email',
        'is_staff': $staff,
        'is_superuser': $superuser,
        'is_active': True
    }
)

if created:
    user.set_password('$password')
    user.save()
    print('✅ User created')
else:
    print('⚠️  User already exists, updating...')
    user.email = '$email'
    user.is_staff = $staff
    user.is_superuser = $superuser
    user.set_password('$password')
    user.save()
    print('✅ User updated')

# Create or update profile
try:
    profile = UserProfile.objects.get(user=user)
    profile.name = '$fullname'
    profile.save()
    print('✅ Profile updated')
except UserProfile.DoesNotExist:
    profile = UserProfile.objects.create(
        user=user,
        name='$fullname'
    )
    print('✅ Profile created')

print('')
print('User Details:')
print(f'  Username: {user.username}')
print(f'  Email: {user.email}')
print(f'  Full Name: $fullname')
print(f'  Staff: {user.is_staff}')
print(f'  Superuser: {user.is_superuser}')
print(f'  Active: {user.is_active}')
print('')
print('✅ User is ready to log in!')
"

echo ""
echo "================================================"
echo "✅ Done!"
echo "================================================"
echo ""
echo "Login at: http://local.overhang.io:8000"
echo "Username: $username"
echo "Password: (the one you entered)"
echo ""
echo "💡 Tip: Use Incognito/Private mode to avoid cache issues"

