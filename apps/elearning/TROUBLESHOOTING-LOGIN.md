# Login Troubleshooting Guide

## Common Login Issues and Solutions

### Issue 1: Internal Server Error (500) on Login

**Symptoms:**

- User credentials are correct
- Login page shows 500 error or redirects back to login
- Browser console shows API errors

**Cause:** Missing UserProfile object

**Solution:**

```bash
# Fix for existing user
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
from common.djangoapps.student.models import UserProfile

User = get_user_model()
username = 'YOUR_USERNAME'  # Change this
user = User.objects.get(username=username)

# Create profile if missing
profile, created = UserProfile.objects.get_or_create(
    user=user,
    defaults={'name': user.username}
)

if created:
    print('✅ Profile created!')
else:
    print('Profile already exists')
"

# Restart LMS
tutor local restart lms
```

**Prevention:** Always use `./create-user-with-profile.sh` to create new users.

### Issue 2: "Invalid Credentials" Error

**Possible Causes:**

1. **Using email instead of username**

   - Solution: Use your **username**, not email address

2. **Wrong password**

   - Solution: Reset password:

   ```bash
   tutor local exec lms ./manage.py lms changepassword YOUR_USERNAME
   ```

3. **User is inactive**
   - Solution: Activate user:
   ```bash
   tutor local exec lms ./manage.py lms shell -c "
   from django.contrib.auth import get_user_model
   User = get_user_model()
   user = User.objects.get(username='YOUR_USERNAME')
   user.is_active = True
   user.save()
   print('User activated!')
   "
   ```

### Issue 3: Login Page Loads But Button Does Nothing

**Possible Causes:**

1. **JavaScript errors**

   - Check browser console (F12)
   - Clear browser cache
   - Try incognito/private mode

2. **Static files not loaded**
   ```bash
   tutor local exec lms ./manage.py lms collectstatic --noinput
   tutor local restart lms
   ```

### Issue 4: Redirect Loop After Login

**Solution:**

```bash
# Clear sessions
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.sessions.models import Session
Session.objects.all().delete()
print('Sessions cleared!')
"

# Restart
tutor local restart lms
```

### Issue 5: User Created with `createsuperuser` Can't Login

**This is the most common issue!**

The Django `createsuperuser` command doesn't create the required OpenEDX UserProfile.

**Solution:**

```bash
# Fix all users without profiles
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
from common.djangoapps.student.models import UserProfile

User = get_user_model()

for user in User.objects.all():
    try:
        profile = user.profile
        print(f'{user.username} - Profile OK')
    except UserProfile.DoesNotExist:
        UserProfile.objects.create(
            user=user,
            name=user.username
        )
        print(f'✅ Created profile for {user.username}')
"

tutor local restart lms
```

## Diagnostic Commands

### Check User Status

```bash
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
from common.djangoapps.student.models import UserProfile

User = get_user_model()
username = 'YOUR_USERNAME'

try:
    user = User.objects.get(username=username)
    print(f'Username: {user.username}')
    print(f'Email: {user.email}')
    print(f'Is Active: {user.is_active}')
    print(f'Is Staff: {user.is_staff}')
    print(f'Is Superuser: {user.is_superuser}')

    try:
        profile = user.profile
        print(f'Profile: ✅ Exists')
        print(f'Profile Name: {profile.name}')
    except UserProfile.DoesNotExist:
        print(f'Profile: ❌ MISSING (This causes login errors!)')

except User.DoesNotExist:
    print(f'User not found: {username}')
"
```

### Check LMS Logs for Errors

```bash
# View recent login errors
tutor local logs lms --tail=100 | grep -i "login\|error\|500"

# Follow logs in real-time
tutor local logs lms -f
```

### Test Database Connection

```bash
tutor local exec lms ./manage.py lms dbshell
# Type \q to exit
```

## Best Practices

### ✅ Always Create Users With Profiles

Use one of these methods:

**Method 1: Helper Script (Easiest)**

```bash
./create-user-with-profile.sh
```

**Method 2: Command with Profile**

```bash
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
from common.djangoapps.student.models import UserProfile
User = get_user_model()
user = User.objects.create_user('username', 'email@test.com', 'password')
UserProfile.objects.create(user=user, name='Full Name')
"
```

### ❌ Avoid These Methods

**Don't use** without creating profile after:

```bash
# This creates user without profile - causes 500 error!
tutor local exec lms ./manage.py lms createsuperuser
```

If you do use it, immediately run:

```bash
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
from common.djangoapps.student.models import UserProfile
User = get_user_model()
user = User.objects.latest('date_joined')
UserProfile.objects.get_or_create(user=user, defaults={'name': user.username})
"
```

## Quick Fix for "Can't Login" Issues

Run this all-in-one fix:

```bash
#!/bin/bash
echo "🔧 Fixing common login issues..."

# 1. Fix missing profiles
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
from common.djangoapps.student.models import UserProfile
User = get_user_model()
for user in User.objects.all():
    profile, created = UserProfile.objects.get_or_create(
        user=user,
        defaults={'name': user.username}
    )
    if created:
        print(f'✅ Created profile for {user.username}')
"

# 2. Activate all users
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
User.objects.all().update(is_active=True)
print('✅ All users activated')
"

# 3. Clear sessions
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.sessions.models import Session
Session.objects.all().delete()
print('✅ Sessions cleared')
"

# 4. Restart LMS
echo "🔄 Restarting LMS..."
tutor local restart lms

echo "✅ Done! Try logging in now."
echo "💡 Use Incognito/Private mode to avoid cache issues"
```

Save as `fix-login.sh`, make executable with `chmod +x fix-login.sh`, and run with `./fix-login.sh`

## Still Having Issues?

1. **Clear browser completely**

   - Use Incognito/Private mode
   - Or clear all cookies for `local.overhang.io`

2. **Check services are running**

   ```bash
   tutor local status
   ```

3. **View detailed logs**

   ```bash
   tutor local logs lms -f
   ```

4. **Ask for help**
   - Include error messages from logs
   - Include output from diagnostic commands
   - Contact: contact@asociatia-idei.eu

## Resources

- Main Setup Guide: [SETUP-GUIDE.md](./SETUP-GUIDE.md)
- User Management: [USER-MANAGEMENT.md](./USER-MANAGEMENT.md)
- Tutor Docs: https://docs.tutor.overhang.io/
