# User Management Guide

## User Types in OpenEDX

### 1. **Superuser** (Admin)

- Full system access
- Access to Django admin panel
- Can create/manage all courses
- Can manage all users

### 2. **Staff**

- Can create and manage courses in Studio (CMS)
- Can access instructor dashboard
- Cannot access Django admin

### 3. **Instructor**

- Can manage assigned courses
- Can grade and monitor students
- Limited administrative access

### 4. **Student**

- Can enroll in and take courses
- Can view their progress
- Standard learner account

## Creating Users

### Via Command Line (Recommended)

#### Method 1: Use Helper Script (Recommended - Prevents Login Issues)

```bash
# This creates user with proper profile to avoid 500 errors
./create-user-with-profile.sh
```

#### Method 2: Interactive Creation

```bash
# Create superuser interactively - you'll be prompted for details
tutor local exec lms ./manage.py lms createsuperuser

# IMPORTANT: You must create profile after to prevent login errors!
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
from common.djangoapps.student.models import UserProfile
User = get_user_model()
user = User.objects.get(username='yourusername')  # Change to your username
UserProfile.objects.get_or_create(user=user, defaults={'name': user.username})
print('✅ Profile created!')
"
```

#### Method 2: Direct Creation via Django Shell

**Create Admin/Superuser:**

```bash
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
user = User.objects.create_user('admin', 'admin@example.com', 'yourpassword')
user.is_staff = True
user.is_superuser = True
user.save()
print('✅ Superuser created!')
"
```

**Create Staff User (Course Creator):**

```bash
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
user = User.objects.create_user('instructor', 'instructor@example.com', 'password123')
user.is_staff = True
user.save()
print('✅ Staff user created!')
"
```

**Create Regular Student:**

```bash
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
user = User.objects.create_user('student1', 'student1@example.com', 'password123')
print('✅ Student created!')
"
```

#### Method 3: Use Helper Script

```bash
cd apps/elearning
./CREATE-USERS.sh
# Follow the interactive prompts
```

### Via Django Admin Panel

1. **Access Django Admin:**

   - URL: http://local.overhang.io:8000/admin
   - Login with your superuser credentials

2. **Create User:**

   - Go to "Users" → "Add user"
   - Enter username and password
   - Click "Save and continue editing"

3. **Set Permissions:**

   - Check "Staff status" for instructors
   - Check "Superuser status" for admins
   - Add to groups if needed

4. **Save**

### Via LMS Registration

Students can self-register:

1. Go to: http://local.overhang.io:8000/register
2. Fill in the registration form
3. Click "Create Account"
4. Verify email (if email is configured)

## Managing Users

### List All Users

```bash
tutor local exec lms ./manage.py lms list_users
```

### Change User Password

```bash
tutor local exec lms ./manage.py lms changepassword username
```

### Make User Staff

```bash
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
user = User.objects.get(username='username');
user.is_staff = True;
user.save();
print('User is now staff')
"
```

### Make User Superuser

```bash
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
user = User.objects.get(username='username');
user.is_superuser = True;
user.is_staff = True;
user.save();
print('User is now superuser')
"
```

## Demo Course with Demo Users

Import the demo course which includes sample content:

```bash
tutor local do importdemocourse
```

This creates a demo course with example content that you can explore.

## User Roles in Courses

### Assigning Course Roles

In **Studio (CMS)**:

1. Open your course
2. Go to **Settings → Course Team**
3. Add user email/username
4. Select role:
   - **Staff** - Full course access, can modify content
   - **Admin** - Can manage course team, settings
   - **Beta Testers** - Can preview course before release

### Course Access Levels

- **Course Staff**: Full access to course content and settings
- **Course Instructor**: Can access instructor dashboard, grading
- **Course Beta Tester**: Can preview unpublished content
- **Student**: Standard learner access

## Bulk User Creation

### From CSV File

Create a CSV file `users.csv`:

```csv
username,email,password,is_staff
john.doe,john@example.com,password123,false
jane.smith,jane@example.com,password456,true
```

Run Python script:

```bash
tutor local exec lms ./manage.py lms shell << 'EOF'
import csv
from django.contrib.auth import get_user_model

User = get_user_model()

with open('/tmp/users.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        user, created = User.objects.get_or_create(
            username=row['username'],
            email=row['email']
        )
        user.set_password(row['password'])
        user.is_staff = row['is_staff'].lower() == 'true'
        user.save()
        print(f"Created: {user.username}")
EOF
```

## User Authentication

### Email Verification

By default, email verification is disabled in development.

To enable:

```bash
tutor config save --set FEATURES.ENABLE_EMAIL_VERIFICATION=true
tutor local restart
```

### Social Login (Optional)

Enable OAuth providers:

#### Google OAuth

```bash
tutor config save --set FEATURES.ENABLE_THIRD_PARTY_AUTH=true
# Add Google OAuth credentials in Django admin
```

#### Custom OAuth

1. Go to Django Admin → OAuth2
2. Add OAuth application
3. Configure redirect URLs

## Password Management

### Reset User Password

```bash
tutor local exec lms ./manage.py lms changepassword username
```

### Password Reset Email

Users can reset password via:

- URL: http://local.overhang.io:8000/password_reset
- Enter email address
- Follow reset link (requires email configuration)

### Configure Email for Password Reset

```bash
tutor config save --set SMTP_HOST="smtp.gmail.com"
tutor config save --set SMTP_PORT=587
tutor config save --set SMTP_USE_TLS=true
tutor config save --set SMTP_USERNAME="your-email@gmail.com"
tutor config save --set SMTP_PASSWORD="your-app-password"
tutor local restart
```

## User Enrollment

### Enroll User in Course

Via **Django Admin**:

1. Go to: http://local.overhang.io:8000/admin
2. Navigate to "Student" → "Course enrollments"
3. Add enrollment with course ID and username

Via **Command Line**:

```bash
tutor local exec lms ./manage.py lms shell -c "
from student.models import CourseEnrollment;
from django.contrib.auth import get_user_model;
from opaque_keys.edx.keys import CourseKey;

User = get_user_model();
user = User.objects.get(username='student');
course_key = CourseKey.from_string('course-v1:edX+DemoX+Demo_Course');
CourseEnrollment.enroll(user, course_key);
print('User enrolled')
"
```

### Bulk Enrollment

From CSV:

```bash
# Format: username,course_id
# Example: john.doe,course-v1:edX+DemoX+Demo_Course
```

## Common User Operations

### Check User Status

```bash
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
user = User.objects.get(username='username');
print(f'Username: {user.username}');
print(f'Email: {user.email}');
print(f'Is Staff: {user.is_staff}');
print(f'Is Superuser: {user.is_superuser}');
print(f'Is Active: {user.is_active}')
"
```

### Deactivate User

```bash
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
user = User.objects.get(username='username');
user.is_active = False;
user.save();
print('User deactivated')
"
```

### Delete User

```bash
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
user = User.objects.get(username='username');
user.delete();
print('User deleted')
"
```

## Testing Accounts

For development/testing:

```bash
# Create test students
for i in {1..5}; do
  tutor local createuser "student$i" "student$i@test.com"
done

# Create test instructor
tutor local createuser --staff "teacher1" "teacher@test.com"
```

## Security Best Practices

1. **Use strong passwords** for admin accounts
2. **Enable email verification** in production
3. **Enable HTTPS** in production
4. **Limit superuser accounts**
5. **Regularly audit user access**
6. **Use OAuth/SSO** for enterprise
7. **Enable 2FA** if available

## Quick Reference

```bash
# Create superuser (interactive)
tutor local exec lms ./manage.py lms createsuperuser

# Create superuser (direct)
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
user = User.objects.create_user('admin', 'admin@example.com', 'password')
user.is_staff = True
user.is_superuser = True
user.save()
"

# Create instructor (staff)
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
user = User.objects.create_user('teacher', 'teacher@example.com', 'password')
user.is_staff = True
user.save()
"

# Create student
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
user = User.objects.create_user('student', 'student@example.com', 'password')
"

# Use helper script
./CREATE-USERS.sh

# Change password
tutor local exec lms ./manage.py lms changepassword username

# Access Django admin
# http://local.overhang.io:8000/admin
```

## Resources

- **OpenEDX User Docs**: https://docs.openedx.org/
- **Django Admin**: http://local.overhang.io:8000/admin
- **Tutor Docs**: https://docs.tutor.overhang.io/
