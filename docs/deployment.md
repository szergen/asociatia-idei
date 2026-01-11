# Deployment Guide

This guide covers deployment strategies for both the website and e-learning platform.

## 🌐 Website Deployment (Vercel)

### Prerequisites

- GitHub repository
- Vercel account
- Builder.io account
- Stripe account

### Step 1: Repository Setup

1. **Push code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial mono-repo setup"
   git push origin main
   ```

### Step 2: Vercel Configuration

1. **Connect repository to Vercel**:

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure build settings**:

   ```
   Framework Preset: Next.js
   Root Directory: apps/website
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Environment variables**:
   ```env
   BUILDER_PUBLIC_KEY=bpk-your-key
   BUILDER_PRIVATE_KEY=bpk-your-private-key
   NEXT_PUBLIC_SITE_URL=https://www.asociatia-idei.eu
   STRIPE_PUBLIC_KEY=pk_live_your-key
   STRIPE_SECRET_KEY=sk_live_your-key
   STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
   ```

### Step 3: Domain Configuration

1. **Add custom domain**:

   - Go to project settings in Vercel
   - Add domain: `www.asociatia-idei.eu`
   - Configure DNS records as instructed

2. **SSL Certificate**:
   - Vercel automatically provisions SSL certificates
   - Verify HTTPS is working

### Step 4: Builder.io Setup

1. **Configure Builder.io**:

   ```javascript
   // In Builder.io settings
   {
     "domains": ["www.asociatia-idei.eu", "vercel-preview-url"],
     "webhooks": {
       "publish": "https://www.asociatia-idei.eu/api/revalidate"
     }
   }
   ```

2. **Create content models**:
   - Page
   - Product
   - Blog Post

### Step 5: Stripe Configuration

1. **Webhook endpoints**:
   ```
   Endpoint URL: https://www.asociatia-idei.eu/api/webhooks/stripe
   Events: payment_intent.succeeded, checkout.session.completed
   ```

## 🎓 E-learning Platform Deployment (OpenEDX)

### Prerequisites

- Ubuntu 20.04+ server (2GB+ RAM, 20GB+ storage)
- Docker and Docker Compose
- Domain: `learning.asociatia-idei.eu`

### Step 1: Server Setup

1. **Update server**:

   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install Docker**:

   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   sudo usermod -aG docker $USER
   ```

3. **Install Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### Step 2: Application Deployment

1. **Create deployment directory**:

   ```bash
   sudo mkdir -p /opt/openedx
   sudo chown $USER:$USER /opt/openedx
   ```

2. **Copy application files**:

   ```bash
   # From your local machine
   scp -r apps/elearning/* user@server:/opt/openedx/
   ```

3. **Set up environment**:

   ```bash
   cd /opt/openedx
   cp .env.example .env
   # Edit .env with production values
   ```

4. **Start services**:
   ```bash
   docker-compose -f docker/docker-compose.prod.yml up -d
   ```

### Step 3: SSL Configuration

1. **Install Certbot**:

   ```bash
   sudo apt install certbot nginx
   ```

2. **Generate certificates**:

   ```bash
   sudo certbot certonly --standalone -d learning.asociatia-idei.eu
   sudo certbot certonly --standalone -d cms.learning.asociatia-idei.eu
   ```

3. **Configure Nginx**:

   ```nginx
   # /etc/nginx/sites-available/openedx
   server {
       listen 443 ssl;
       server_name learning.asociatia-idei.eu;

       ssl_certificate /etc/letsencrypt/live/learning.asociatia-idei.eu/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/learning.asociatia-idei.eu/privkey.pem;

       location / {
           proxy_pass http://localhost:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

### Step 4: Initial Setup

1. **Create superuser**:

   ```bash
   docker-compose exec openedx-lms python manage.py createsuperuser
   ```

2. **Configure site**:
   ```bash
   docker-compose exec openedx-lms python manage.py configure_site
   ```

## 🔄 CI/CD Pipeline

### GitHub Actions (Website)

Create `.github/workflows/deploy-website.yml`:

```yaml
name: Deploy Website

on:
  push:
    branches: [main]
    paths: ["apps/website/**", "packages/**"]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm install

      - name: Build shared packages
        run: npm run build --workspace=packages/shared-ui

      - name: Build website
        run: npm run build --workspace=apps/website
        env:
          BUILDER_PUBLIC_KEY: ${{ secrets.BUILDER_PUBLIC_KEY }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: apps/website
```

### OpenEDX Deployment Script

Create `scripts/deploy-openedx.sh`:

```bash
#!/bin/bash
set -e

echo "Deploying OpenEDX..."

# Build theme
npm run build:theme

# Copy files to server
rsync -avz --exclude node_modules ./ user@server:/opt/openedx/

# Restart services
ssh user@server "cd /opt/openedx && docker-compose -f docker/docker-compose.prod.yml restart"

echo "Deployment complete!"
```

## 📊 Monitoring

### Website Monitoring

1. **Vercel Analytics**: Built-in performance monitoring
2. **Uptime monitoring**: Use services like UptimeRobot
3. **Error tracking**: Integrate Sentry

### OpenEDX Monitoring

1. **Server monitoring**:

   ```bash
   # Install monitoring tools
   sudo apt install htop iotop netstat
   ```

2. **Application logs**:

   ```bash
   docker-compose logs -f openedx-lms
   docker-compose logs -f openedx-cms
   ```

3. **Database monitoring**:
   ```bash
   docker-compose exec mysql mysqladmin status
   ```

## 🔄 Backup Strategy

### Website Backup

1. **Code**: Stored in Git repository
2. **Content**: Builder.io handles content backup
3. **Environment**: Document all environment variables

### OpenEDX Backup

1. **Database backup**:

   ```bash
   #!/bin/bash
   # backup-db.sh
   DATE=$(date +%Y%m%d_%H%M%S)
   docker-compose exec mysql mysqldump -u root -p$MYSQL_ROOT_PASSWORD openedx > backups/db_$DATE.sql
   ```

2. **Media files backup**:

   ```bash
   # backup-media.sh
   rsync -avz /opt/openedx/media/ /backups/media/
   ```

3. **Automated backups**:
   ```bash
   # Add to crontab
   0 2 * * * /opt/openedx/scripts/backup-db.sh
   0 3 * * * /opt/openedx/scripts/backup-media.sh
   ```

## 🚨 Disaster Recovery

### Website Recovery

1. **Vercel outage**: Deploy to alternative platform (Netlify)
2. **Builder.io outage**: Static fallback pages
3. **Data loss**: Restore from Git + Builder.io backups

### OpenEDX Recovery

1. **Server failure**:

   ```bash
   # Restore on new server
   docker-compose up -d
   mysql -u root -p openedx < backups/latest_db.sql
   rsync -avz backups/media/ /opt/openedx/media/
   ```

2. **Database corruption**:
   ```bash
   # Restore from backup
   docker-compose stop mysql
   docker-compose run --rm mysql mysql -u root -p openedx < backups/db_backup.sql
   docker-compose start mysql
   ```

## 🔐 Security

### Website Security

1. **Environment variables**: Never commit secrets
2. **HTTPS**: Enforced by Vercel
3. **Content Security Policy**: Configure in Next.js
4. **Dependency updates**: Regular security updates

### OpenEDX Security

1. **Firewall**:

   ```bash
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw allow 22
   sudo ufw enable
   ```

2. **SSL renewal**:

   ```bash
   # Add to crontab
   0 12 * * * /usr/bin/certbot renew --quiet
   ```

3. **Security updates**:
   ```bash
   # Regular system updates
   sudo apt update && sudo apt upgrade -y
   ```

## 📈 Performance Optimization

### Website Performance

1. **Image optimization**: Next.js automatic optimization
2. **CDN**: Vercel Edge Network
3. **Caching**: ISR (Incremental Static Regeneration)
4. **Bundle analysis**: `@next/bundle-analyzer`

### OpenEDX Performance

1. **Database optimization**:

   ```sql
   -- Optimize MySQL
   OPTIMIZE TABLE auth_user;
   OPTIMIZE TABLE student_courseenrollment;
   ```

2. **Caching**:

   ```yaml
   # Redis configuration
   CACHES:
     default:
       BACKEND: django_redis.cache.RedisCache
       LOCATION: redis://redis:6379/1
   ```

3. **Static files**:
   ```bash
   # Serve static files with Nginx
   location /static/ {
       alias /opt/openedx/staticfiles/;
       expires 1y;
   }
   ```

## 📞 Support

- **Website issues**: Check Vercel dashboard and logs
- **OpenEDX issues**: Check Docker logs and server status
- **Emergency contact**: contact@asociatia-idei.eu
- **Documentation**: See [instructions.md](instructions.md) and [architecture.md](architecture.md)
