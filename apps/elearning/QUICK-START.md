# Quick Start Guide - Simplified Setup

This is a simplified approach to get OpenEDX running quickly without custom plugins.

## Prerequisites

1. **Docker Desktop** installed and running
2. **Tutor** installed: `pip install 'tutor[full]'`
3. **For Apple Silicon (M1/M2/M3)**: Run this first:
   ```bash
   export DOCKER_DEFAULT_PLATFORM=linux/amd64
   echo 'export DOCKER_DEFAULT_PLATFORM=linux/amd64' >> ~/.zshrc
   ```

## Step 1: Basic Tutor Setup

```bash
cd apps/elearning

# Initialize Tutor configuration
tutor config save --set PLATFORM_NAME="Asociatia IDEI Learning"

# Launch OpenEDX (this will take 15-30 minutes on first run)
tutor local launch
```

## Step 2: Access Your Platform

After launch completes:

- **LMS (Students)**: http://local.overhang.io:8000 or http://local.overhang.io/
- **CMS (Studio)**: http://studio.local.overhang.io:8001 or http://studio.local.overhang.io
- **Admin**: Email and password created during setup

## Step 3: Create Additional Users

**Important:** Use this script to avoid login issues:

```bash
# Interactive user creation with proper profile
./create-user-with-profile.sh
```

Or create users directly:

```bash
# Create a test student
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
from common.djangoapps.student.models import UserProfile
User = get_user_model()
user = User.objects.create_user('student1', 'student1@test.com', 'test123')
UserProfile.objects.create(user=user, name='Student One')
print('✅ Student created: student1 / test123')
"
```

## Step 4: Add Custom Theme (Optional)

Once OpenEDX is running, you can add the custom theme:

### Option A: Copy Theme to Tutor Directory

```bash
# Build the theme
cd theme
npm install
npm run build
cd ..

# Copy to Tutor's themes directory
cp -r theme "$(tutor config printroot)/env/build/openedx/themes/idei-theme"

# Rebuild OpenEDX images
tutor images build openedx
tutor local restart
```

### Option B: Mount Theme as Volume (Development)

Edit Tutor's docker-compose.override.yml:

```bash
# Create override file
cat > "$(tutor config printroot)/env/local/docker-compose.override.yml" << 'EOF'
version: "3.7"
services:
  lms:
    volumes:
      - /Users/szergen/Documents/Workplace/asociatia-idei/apps/elearning/theme:/openedx/themes/idei-theme:ro
  cms:
    volumes:
      - /Users/szergen/Documents/Workplace/asociatia-idei/apps/elearning/theme:/openedx/themes/idei-theme:ro
EOF

# Apply changes
tutor local restart
```

### Enable the Theme

```bash
# Configure OpenEDX to use the theme
tutor config save --set OPENEDX_COMPREHENSIVE_THEME_DIRS='["/openedx/themes"]'
tutor config save --set OPENEDX_DEFAULT_SITE_THEME="idei-theme"

# Restart to apply
tutor local restart
```

## Common Commands

```bash
# Start OpenEDX
tutor local start

# Stop OpenEDX
tutor local stop

# View logs
tutor local logs -f

# Create user with profile (recommended)
./create-user-with-profile.sh

# Create admin user interactively
tutor local exec lms ./manage.py lms createsuperuser
# Then fix profile:
tutor local exec lms ./manage.py lms shell -c "
from django.contrib.auth import get_user_model
from common.djangoapps.student.models import UserProfile
User = get_user_model()
user = User.objects.get(username='yourusername')
UserProfile.objects.get_or_create(user=user, defaults={'name': user.username})
"

# Import demo course
tutor local do importdemocourse

# Restart services
tutor local restart

# Check status
tutor local status
```

## Troubleshooting

### Port Already in Use

```bash
# Check what's using the port
sudo lsof -i :8000

# Or change ports
tutor config save --set LMS_PORT=8080
tutor config save --set CMS_PORT=8081
tutor local restart
```

### Services Not Starting

```bash
# Check Docker resources (8GB+ RAM recommended)
# Docker Desktop → Settings → Resources

# View logs
tutor local logs -f

# Restart everything
tutor local restart
```

### Theme Not Showing

```bash
# Rebuild theme
cd theme && npm run build && cd ..

# Check if theme is accessible in container
tutor local exec lms ls -la /openedx/themes

# Restart services
tutor local restart lms cms

# Clear browser cache
```

### Apple Silicon Issues

If you get ARM64 errors:

```bash
# Set platform
export DOCKER_DEFAULT_PLATFORM=linux/amd64

# Or enable Rosetta in Docker Desktop:
# Settings → General → "Use Rosetta for x86/amd64 emulation"
```

## Next Steps

1. **Create your first course** in Studio (CMS)
2. **Customize the theme** (see THEME-DEVELOPMENT.md)
3. **Add users** via Django admin or `createuser` command
4. **Configure email** for notifications
5. **Set up HTTPS** for production

## Without Custom Theme

If you just want to try OpenEDX without the custom theme:

```bash
# Just launch with defaults
tutor local launch

# Access at:
# - LMS: http://local.overhang.io:8000
# - CMS: http://studio.local.overhang.io:8001
```

The default Indigo theme will be used.

## Production Deployment

For production:

1. Get a domain name
2. Point DNS to your server
3. Update Tutor config:
   ```bash
   tutor config save --set LMS_HOST="learning.your-domain.com"
   tutor config save --set CMS_HOST="studio.learning.your-domain.com"
   tutor config save --set ENABLE_HTTPS=true
   ```
4. Launch: `tutor local launch`

## Getting Help

- Full docs: [SETUP-GUIDE.md](./SETUP-GUIDE.md)
- Theme customization: [THEME-DEVELOPMENT.md](./THEME-DEVELOPMENT.md)
- Tutor docs: https://docs.tutor.overhang.io/
- Contact: contact@asociatia-idei.eu
