# System Architecture

## Overview

The Asociatia IDEI digital ecosystem is designed as a mono-repo with two main applications sharing common components and utilities.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    User Layer                               │
├─────────────────────────────────────────────────────────────┤
│  www.asociatia-idei.eu     │  learning.asociatia-idei.eu    │
│  (Main Website + Shop)     │  (OpenEDX Platform)            │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                Application Layer                            │
├──────────────────────────────┬──────────────────────────────┤
│         Website App          │       E-learning App         │
│      (Next.js + Builder.io)  │      (OpenEDX + Custom)      │
│                              │                              │
│  ┌─────────────────────────┐ │  ┌─────────────────────────┐ │
│  │ Builder.io CMS          │ │  │ OpenEDX Studio          │ │
│  │ Shop Module             │ │  │ Custom Theme            │ │
│  │ Payment Integration     │ │  │ Plugins                 │ │
│  └─────────────────────────┘ │  └─────────────────────────┘ │
└──────────────────────────────┴──────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                Shared Layer                                 │
├─────────────────────┬─────────────────────┬─────────────────┤
│    Shared UI        │   Shared Utils      │  Shared Types   │
│  - Components       │  - Utilities        │  - Interfaces   │
│  - Styles           │  - Helpers          │  - Types        │
│  - Hooks            │  - Validators       │  - Schemas      │
└─────────────────────┴─────────────────────┴─────────────────┘
```

## Technology Stack

### Website Application

- **Framework**: Next.js 14
- **CMS**: Builder.io
- **Styling**: Tailwind CSS
- **Payments**: Stripe
- **Hosting**: Vercel
- **Database**: Builder.io (content) + Stripe (payments)

### E-learning Application

- **Platform**: OpenEDX (Olive release)
- **Customization**: Custom theme + plugins
- **Frontend**: React components (shared)
- **Backend**: Django (OpenEDX core)
- **Database**: MySQL/PostgreSQL
- **Hosting**: Docker on VPS

### Shared Infrastructure

- **Language**: TypeScript
- **Package Manager**: npm workspaces
- **Component System**: React
- **Styling**: Tailwind CSS + SASS
- **Build Tools**: TypeScript compiler

## Data Flow

### Content Management

```
Builder.io Studio → Builder.io API → Website → User
OpenEDX Studio → OpenEDX API → E-learning Platform → User
```

### E-commerce Flow

```
User → Website → Stripe → Payment Processing → Order Fulfillment
```

### Authentication Flow

```
User → OpenEDX → Django Auth → Course Access
```

## Component Sharing Strategy

### Shared Components

- Header/Navigation
- Footer
- Buttons and form elements
- Cards and layouts
- Typography components

### Usage Pattern

```typescript
// In Website App
import { Button, Header } from "@asociatia-idei/shared-ui";

// In OpenEDX Theme
import { Button } from "@asociatia-idei/shared-ui";
// Compiled to CSS for OpenEDX theme
```

## Security Considerations

### Website Security

- HTTPS enforcement
- Environment variable protection
- Builder.io API key security
- Stripe webhook verification
- CSRF protection

### OpenEDX Security

- Django security middleware
- User authentication
- Course access control
- Data privacy compliance (GDPR)

## Performance Optimization

### Website Performance

- Next.js static generation
- Image optimization
- Code splitting
- CDN delivery (Vercel)
- Caching strategies

### OpenEDX Performance

- Database optimization
- Static file serving
- Caching (Redis)
- CDN for media files

## Scalability Considerations

### Horizontal Scaling

- Website: Vercel automatic scaling
- OpenEDX: Load balancer + multiple instances
- Database: Read replicas

### Vertical Scaling

- Shared components: Tree-shaking
- Bundle optimization
- Resource monitoring

## Monitoring and Logging

### Website Monitoring

- Vercel Analytics
- Error tracking (Sentry)
- Performance monitoring
- User analytics

### OpenEDX Monitoring

- Application logs
- Database performance
- User engagement metrics
- Course completion rates

## Backup and Recovery

### Website Backup

- Builder.io content backup
- Environment configuration backup
- Code repository (Git)

### OpenEDX Backup

- Database backups
- Media file backups
- Configuration backups
- User data backups

## Development Environment

### Local Development

```bash
# Website development
npm run website:dev

# OpenEDX development
cd apps/elearning
npm run docker:up
```

### Staging Environment

- Website: Vercel preview deployments
- OpenEDX: Staging server

### Production Environment

- Website: Vercel production
- OpenEDX: Production server with monitoring
