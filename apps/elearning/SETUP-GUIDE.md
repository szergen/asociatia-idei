# Asociatia IDEI OpenEDX Platform - Setup Guide

Complete guide for setting up the OpenEDX e-learning platform with custom Asociatia IDEI theme.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation Methods](#installation-methods)
3. [Quick Start with Tutor](#quick-start-with-tutor)
4. [Development Setup](#development-setup)
5. [Theme Customization](#theme-customization)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Python 3.8+**

   ```bash
   python --version
   ```

2. **Node.js 18+**

   ```bash
   node --version
   ```

3. **Docker & Docker Compose** (for Tutor)

   ```bash
   docker --version
   docker-compose --version
   ```

4. **Tutor** (OpenEDX deployment tool)
   ```bash
   pip install 'tutor[full]'==15.3.0
   ```

### System Requirements

- **RAM**: Minimum 8GB (16GB recommended)
- **Storage**: Minimum 20GB free space
- **OS**: Linux, macOS, or WSL2 on Windows

## Installation Methods

We provide two methods to run OpenEDX:

### Method 1: Tutor (Recommended)

Tutor is the official OpenEDX deployment tool. It's easier to set up and maintain.

**Pros:**

- Quick setup with one command
- Automatic configuration
- Easy plugin system
- Production-ready

**Cons:**

- Less control over individual services
- Requires learning Tutor commands

### Method 2: Docker Compose

Direct Docker setup with more control over individual services.

**Pros:**

- Full control over services
- Easier to debug
- Familiar Docker commands

**Cons:**

- More complex setup
- Manual configuration required
- More maintenance

## Quick Start with Tutor

### 1. Automated Installation (Recommended)

Run our automated installation script:

```bash
cd apps/elearning
chmod +x install.sh
./install.sh
```

The script will:

- Check prerequisites
- Install dependencies
- Build the custom theme
- Install the Tutor plugin
- Initialize OpenEDX

### 2. Manual Installation

If you prefer manual steps:

```bash
# 1. Install npm dependencies
npm install

# 2. Build the custom theme
cd theme
npm install
npm run build
cd ..

# 3. Install the Tutor plugin
cd plugins/idei-theme
pip install -e .
cd ../..

# 4. Enable the plugin
tutor plugins enable idei-theme

# 5. Initialize Tutor
tutor local quickstart
```

### 3. Access the Platform

After installation, the platform will be available at:

- **LMS (Student)**: http://local.overhang.io:8000
- **CMS (Instructor)**: http://studio.local.overhang.io:8001

Default credentials will be created during the quickstart process.

## Development Setup

### Using Make Commands

We provide a Makefile with useful commands:

```bash
# Show all available commands
make help

# Complete development setup
make dev-setup

# Start OpenEDX
make start

# Stop OpenEDX
make stop

# Restart services
make restart

# View logs
make logs

# Build theme only
make theme

# Watch for theme changes
make watch

# Create superuser
make create-superuser

# Import demo course
make import-demo-course
```

### Using npm Scripts

```bash
# Build theme
npm run build:theme

# Watch for theme changes
npm run watch

# Start Tutor
npm run tutor:start

# Stop Tutor
npm run tutor:stop

# View logs
npm run tutor:logs

# Open LMS shell
npm run tutor:exec-lms

# Complete dev setup and start
npm run dev
```

### Theme Development Workflow

1. **Start watching for changes:**

   ```bash
   make watch
   # or
   npm run watch
   ```

2. **Edit theme files** in `theme/`:

   - SCSS: `theme/components/_header.scss`, `theme/components/_footer.scss`
   - Templates: `theme/lms/templates/`, `theme/cms/templates/`
   - Variables: `theme/_variables.scss`

3. **The theme will automatically rebuild** when you save changes

4. **Restart services** to see changes:
   ```bash
   make update-theme
   # or
   tutor local restart lms cms
   ```

## Theme Customization

### Header and Footer

The header and footer match your main website design and are defined in:

- **Styles**:
  - `theme/components/_header.scss`
  - `theme/components/_footer.scss`
- **Templates**:
  - `theme/lms/templates/header.html`
  - `theme/lms/templates/footer.html`

### Changing Colors

Edit `theme/_variables.scss`:

```scss
// Primary color
$primary-color: #2563eb; // Change to your brand color

// Other colors
$text-color: #374151;
$background: #ffffff;
```

### Adding Custom Styles

Create new SCSS files in `theme/components/` and import them in `theme/lms.scss`:

```scss
@import "components/my-custom-component";
```

### Modifying Templates

OpenEDX uses Mako templates. Edit files in:

- `theme/lms/templates/` for student-facing pages
- `theme/cms/templates/` for instructor-facing pages

## Configuration

### Tutor Configuration

Main configuration is in `tutor-config.yml`. Key settings:

```yaml
# Platform name
PLATFORM_NAME: "Asociatia IDEI Learning"

# Domains (update for production)
LMS_HOST: "learning.asociatia-idei.eu"
CMS_HOST: "cms.learning.asociatia-idei.eu"

# Language
LANGUAGE_CODE: "ro"
TIME_ZONE: "Europe/Bucharest"

# Enable HTTPS in production
ENABLE_HTTPS: true
```

Apply configuration changes:

```bash
tutor config save
tutor local restart
```

### Environment Variables

For Docker Compose setup, copy and edit `.env`:

```bash
cd docker
cp .env.example .env
# Edit .env with your settings
```

## Production Deployment

### 1. Update Domain Configuration

Edit `tutor-config.yml`:

```yaml
LMS_HOST: "learning.asociatia-idei.eu"
CMS_HOST: "cms.learning.asociatia-idei.eu"
ENABLE_HTTPS: true
```

### 2. Set Strong Passwords

```bash
tutor config save --set MYSQL_ROOT_PASSWORD="strong_password_here"
tutor config save --set OPENEDX_MYSQL_PASSWORD="another_strong_password"
```

### 3. Configure Email

Edit `tutor-config.yml`:

```yaml
EMAIL_HOST: "smtp.gmail.com"
EMAIL_PORT: 587
EMAIL_USE_TLS: true
DEFAULT_FROM_EMAIL: "noreply@asociatia-idei.eu"
```

### 4. Enable HTTPS

```bash
tutor local https enable
```

### 5. Deploy

```bash
tutor local quickstart
```

## Troubleshooting

### Theme Not Showing

```bash
# Rebuild theme
cd theme && npm run build && cd ..

# Restart services
tutor local restart lms cms

# Clear browser cache
```

### Services Not Starting

```bash
# Check status
tutor local status

# View logs
tutor local logs -f

# Restart all services
tutor local restart
```

### Permission Errors

```bash
# Fix permissions
sudo chown -R $(whoami) $(tutor config printroot)
```

### Database Issues

```bash
# Run migrations
tutor local exec lms ./manage.py lms migrate
tutor local exec cms ./manage.py cms migrate
```

### Plugin Not Loading

```bash
# Reinstall plugin
cd plugins/idei-theme
pip install -e .
cd ../..

# Enable plugin
tutor plugins enable idei-theme

# Rebuild
tutor local quickstart
```

### Port Already in Use

```bash
# Change ports in config
tutor config save --set LMS_PORT=8080
tutor config save --set CMS_PORT=8081

# Or stop conflicting services
sudo lsof -i :8000
sudo kill -9 <PID>
```

## Useful Commands

### User Management

```bash
# Create superuser
tutor local exec lms ./manage.py lms createsuperuser

# Create staff user
tutor local exec lms ./manage.py lms create_user -s -p password --staff user@example.com

# List users
tutor local exec lms ./manage.py lms list_users
```

### Course Management

```bash
# Import demo course
tutor local importdemocourse

# Create course
tutor local exec cms ./manage.py cms create_course
```

### Database

```bash
# Backup database
tutor local exec mysql mysqldump --all-databases > backup.sql

# Restore database
tutor local exec -i mysql mysql < backup.sql
```

### Logs

```bash
# View all logs
tutor local logs -f

# View specific service logs
tutor local logs -f lms
tutor local logs -f cms
```

## Next Steps

1. **Create your first course**: Log into CMS and create a new course
2. **Customize the theme**: Edit colors and styles in `theme/_variables.scss`
3. **Add users**: Create instructor and student accounts
4. **Configure email**: Set up SMTP for notifications
5. **Enable HTTPS**: Secure your platform for production

## Support

- **Tutor Documentation**: https://docs.tutor.overhang.io/
- **OpenEDX Documentation**: https://docs.openedx.org/
- **Contact**: contact@asociatia-idei.eu

## License

MIT License - See LICENSE file for details
