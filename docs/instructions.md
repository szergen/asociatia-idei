# Asociatia IDEI Mono-repo Setup Instructions

## Overview

This mono-repo contains the entire Asociatia IDEI digital ecosystem:

- **Website** (`apps/website`): Main website with Builder.io CMS and shop functionality
- **E-learning** (`apps/elearning`): OpenEDX customizations and themes
- **Shared Packages** (`packages/`): Reusable components and utilities

## Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0
- Docker (for OpenEDX development)
- Git

## Initial Setup

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd asociatia-idei
npm install
```

This will install dependencies for all workspaces.

### 2. Environment Variables

#### Website (.env.local in apps/website)

```env
BUILDER_PUBLIC_KEY=your_builder_io_public_key
BUILDER_PRIVATE_KEY=your_builder_io_private_key
NEXT_PUBLIC_SITE_URL=https://www.asociatia-idei.eu
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

#### OpenEDX (.env in apps/elearning)

```env
OPENEDX_PLATFORM_NAME="Asociatia IDEI Learning"
OPENEDX_CONTACT_EMAIL=contact@asociatia-idei.eu
OPENEDX_LMS_BASE=learning.asociatia-idei.eu
OPENEDX_CMS_BASE=cms.learning.asociatia-idei.eu
```

## Development

### Website Development

```bash
# Start website development server
npm run website:dev

# Build website
npm run website:build
```

### Shared Components Development

```bash
# Build shared packages
npm run shared-ui:build

# Watch for changes in shared packages
cd packages/shared-ui
npm run dev
```

### OpenEDX Development

```bash
cd apps/elearning

# Build custom theme
npm run build:theme

# Watch for theme changes
npm run watch

# Start OpenEDX with Docker
npm run docker:up
```

## Project Structure

```
asociatia-idei/
├── apps/
│   ├── website/              # Next.js website
│   │   ├── src/
│   │   │   ├── components/   # Website-specific components
│   │   │   ├── pages/        # Next.js pages
│   │   │   ├── shop/         # Shop functionality
│   │   │   └── builder/      # Builder.io integration
│   │   └── package.json
│   └── elearning/            # OpenEDX customizations
│       ├── theme/
│       │   ├── lms/          # Learning Management System theme
│       │   └── cms/          # Content Management System theme
│       ├── plugins/          # Custom OpenEDX plugins
│       └── configurations/   # OpenEDX settings
├── packages/
│   ├── shared-ui/            # Shared React components
│   ├── shared-utils/         # Shared utilities
│   └── shared-types/         # Shared TypeScript types
└── docs/                     # Documentation
```

## Deployment

### Website Deployment (Vercel)

1. Connect repository to Vercel
2. Set build command: `npm run build --workspace=apps/website`
3. Set output directory: `apps/website/.next`
4. Add environment variables

### OpenEDX Deployment

1. **VPS Setup** (Hostinger/AWS):

   ```bash
   # Copy docker-compose to server
   scp -r apps/elearning/docker/ user@server:/opt/openedx/

   # Deploy with Docker
   cd /opt/openedx/docker/
   docker-compose up -d
   ```

2. **Domain Configuration**:
   - Main site: `www.asociatia-idei.eu` → Vercel
   - Learning platform: `learning.asociatia-idei.eu` → OpenEDX server
   - CMS: `cms.learning.asociatia-idei.eu` → OpenEDX server

## Key Features

### Website Features

- Builder.io CMS integration
- Shop functionality with Stripe payments
- Responsive design
- SEO optimization
- Romanian localization

### E-learning Features

- Custom OpenEDX theme matching website design
- Shared components with main website
- Course catalog integration
- User progress tracking
- Certificate generation

### Shared Components

- Consistent design system
- Reusable UI components
- Utility functions
- Type definitions

## Development Workflow

1. **Feature Development**:

   ```bash
   # Create feature branch
   git checkout -b feature/new-feature

   # Develop in appropriate workspace
   cd apps/website  # or apps/elearning
   npm run dev

   # Test shared components
   cd packages/shared-ui
   npm run build
   ```

2. **Shared Component Updates**:

   ```bash
   # Update shared component
   cd packages/shared-ui
   # Make changes
   npm run build

   # Test in website
   cd ../../apps/website
   npm run dev
   ```

3. **OpenEDX Theme Development**:
   ```bash
   cd apps/elearning
   npm run watch  # Watch for SASS changes
   # Edit theme files in theme/lms/ or theme/cms/
   ```

## Troubleshooting

### Common Issues

1. **Shared package not updating**: Run `npm run build` in the shared package
2. **OpenEDX not starting**: Check Docker logs with `docker-compose logs`
3. **Builder.io not loading**: Verify API keys in environment variables

### Useful Commands

```bash
# Clean all node_modules
npm run clean

# Rebuild all packages
npm run build

# Check workspace dependencies
npm ls --workspaces

# Run tests across all workspaces
npm test --workspaces
```

## Resources

- [Builder.io Documentation](https://www.builder.io/c/docs)
- [OpenEDX Documentation](https://docs.openedx.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
