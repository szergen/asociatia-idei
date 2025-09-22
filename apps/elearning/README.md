# Asociatia IDEI E-learning Platform

OpenEDX customizations and theme for the Asociatia IDEI e-learning platform, featuring shared components with the main website for consistent branding.

## 🎓 Features

- **Custom OpenEDX Theme**: Matching main website design
- **Shared Components**: Consistent UI with main website
- **Course Management**: Full OpenEDX LMS capabilities
- **Progress Tracking**: Student analytics and reporting
- **Certificate Generation**: Automated course completion certificates
- **Multi-language Support**: Romanian and English content

## 🛠️ Tech Stack

- **Platform**: OpenEDX (Olive release)
- **Frontend**: React components (shared)
- **Backend**: Django (OpenEDX core)
- **Database**: MySQL/PostgreSQL
- **Styling**: SASS + Tailwind CSS
- **Deployment**: Docker

## 📁 Project Structure

```
apps/elearning/
├── theme/
│   ├── lms/                 # Learning Management System theme
│   │   ├── static/
│   │   │   ├── sass/        # SASS styles
│   │   │   ├── js/          # JavaScript customizations
│   │   │   └── images/      # Theme images
│   │   └── templates/       # Django templates
│   └── cms/                 # Content Management System theme
│       ├── static/
│       └── templates/
├── plugins/                 # Custom OpenEDX plugins
├── configurations/          # OpenEDX configuration files
├── docker/                  # Docker setup
│   ├── docker-compose.yml
│   └── Dockerfile
└── scripts/                 # Deployment and utility scripts
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js >= 18.0.0 (for theme development)
- Python 3.8+ (for OpenEDX development)

### Local Development Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Build shared components**:

   ```bash
   cd ../../packages/shared-ui
   npm run build
   cd ../../apps/elearning
   ```

3. **Set up environment variables**:

   ```bash
   cp .env.example .env
   ```

   Configure your settings:

   ```env
   OPENEDX_PLATFORM_NAME="Asociatia IDEI Learning"
   OPENEDX_CONTACT_EMAIL=contact@asociatia-idei.eu
   OPENEDX_LMS_BASE=learning.asociatia-idei.eu
   OPENEDX_CMS_BASE=cms.learning.asociatia-idei.eu
   MYSQL_ROOT_PASSWORD=your_mysql_password
   ```

4. **Start OpenEDX with Docker**:

   ```bash
   npm run docker:up
   ```

5. **Access the platform**:
   - LMS: http://localhost:8000
   - CMS: http://localhost:8001

### Theme Development

1. **Watch for changes**:

   ```bash
   npm run watch
   ```

2. **Edit theme files**:

   - SASS: `theme/lms/static/sass/`
   - Templates: `theme/lms/templates/`
   - JavaScript: `theme/lms/static/js/`

3. **Build theme**:
   ```bash
   npm run build:theme
   ```

## 🎨 Customization

### Theme Development

The custom theme extends OpenEDX's default theme while maintaining consistency with the main website.

#### SASS Structure

```
theme/lms/static/sass/
├── main.scss              # Main entry point
├── components/            # Component-specific styles
├── layouts/               # Layout styles
├── utilities/             # Utility classes
└── variables/             # SASS variables
```

#### Using Shared Components

```javascript
// In theme JavaScript files
import { Button, Header } from "@asociatia-idei/shared-ui";

// Render shared components in OpenEDX templates
const customButton = React.createElement(Button, {
  variant: "primary",
  children: "Enroll Now",
});
```

### Custom XBlocks

Create custom course components:

```python
# plugins/custom_xblocks/video_player.py
from xblock.core import XBlock
from xblock.fields import String, Scope

class CustomVideoPlayer(XBlock):
    display_name = String(default="Custom Video Player")
    video_url = String(default="", scope=Scope.content)

    def student_view(self, context=None):
        # Render custom video player
        pass
```

### Configuration

OpenEDX configuration files are in `configurations/`:

- `lms.yml`: LMS settings
- `cms.yml`: CMS settings
- `common.yml`: Shared settings

## 🐳 Docker Setup

### Services

The Docker setup includes:

- **openedx-lms**: Learning Management System
- **openedx-cms**: Content Management System
- **mysql**: Database
- **mongodb**: NoSQL database for analytics
- **elasticsearch**: Search functionality
- **redis**: Caching and sessions

### Commands

```bash
# Start all services
npm run docker:up

# Stop all services
npm run docker:down

# Rebuild images
npm run docker:build

# View logs
docker-compose -f docker/docker-compose.yml logs -f

# Execute commands in containers
docker-compose -f docker/docker-compose.yml exec openedx-lms bash
```

## 📚 Course Development

### Creating Courses

1. Access CMS at http://localhost:8001
2. Create new course
3. Add course content:
   - Videos
   - Text components
   - Assessments
   - Custom XBlocks

### Course Structure

```
Course
├── Chapter 1
│   ├── Section 1.1
│   │   ├── Video
│   │   ├── Text
│   │   └── Quiz
│   └── Section 1.2
└── Chapter 2
```

### Assessment Types

- **Multiple Choice**: Standard quiz questions
- **Custom Graders**: Advanced assessment logic
- **Peer Assessment**: Student peer review
- **Open Response**: Written assignments

## 🚀 Deployment

### Production Deployment

1. **Server Setup** (Ubuntu 20.04+):

   ```bash
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh

   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.0.0/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

2. **Deploy Application**:

   ```bash
   # Copy files to server
   scp -r docker/ user@server:/opt/openedx/

   # Start production environment
   cd /opt/openedx/docker/
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **Domain Configuration**:
   - **LMS**: learning.asociatia-idei.eu
   - **CMS**: cms.learning.asociatia-idei.eu

### SSL Setup

```bash
# Install Certbot
sudo apt install certbot

# Generate certificates
sudo certbot certonly --standalone -d learning.asociatia-idei.eu
sudo certbot certonly --standalone -d cms.learning.asociatia-idei.eu
```

## 🔧 Administration

### User Management

```bash
# Create superuser
docker-compose exec openedx-lms python manage.py createsuperuser

# Create courses
docker-compose exec openedx-cms python manage.py create_course

# Import course content
docker-compose exec openedx-cms python manage.py import_course
```

### Database Management

```bash
# Database migrations
docker-compose exec openedx-lms python manage.py migrate

# Backup database
docker-compose exec mysql mysqldump -u root -p openedx > backup.sql

# Restore database
docker-compose exec -i mysql mysql -u root -p openedx < backup.sql
```

## 📊 Analytics

- **Student Progress**: Built-in OpenEDX analytics
- **Course Performance**: Instructor dashboard
- **System Metrics**: Docker monitoring
- **Custom Analytics**: Integration with Google Analytics

## 🔐 Security

- **User Authentication**: Django authentication system
- **Course Access Control**: Enrollment-based access
- **Data Privacy**: GDPR compliance features
- **SSL/HTTPS**: Production encryption

## 🐛 Troubleshooting

### Common Issues

1. **Theme not updating**:

   ```bash
   npm run build:theme
   docker-compose restart openedx-lms
   ```

2. **Database connection errors**:

   ```bash
   docker-compose logs mysql
   docker-compose restart mysql
   ```

3. **Shared components not loading**:
   ```bash
   cd ../../packages/shared-ui
   npm run build
   cd ../../apps/elearning
   npm run build:theme
   ```

### Debug Mode

Enable OpenEDX debug mode:

```yaml
# In configurations/lms.yml
DEBUG: true
LOGGING_ENV: debug
```

## 📞 Support

- OpenEDX Documentation: https://docs.openedx.org/
- Main repository [documentation](../../docs/)
- Contact: contact@asociatia-idei.eu
