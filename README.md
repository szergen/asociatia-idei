# Asociatia IDEI - Digital Ecosystem

Welcome to the Asociatia IDEI mono-repo! This repository contains the complete digital ecosystem for the Asociatia IDEI NGO, including the main website, e-learning platform, and shared components.

## 🏗️ Project Structure

```
asociatia-idei/
├── apps/
│   ├── website/              # Main website (Next.js + Builder.io + Shop)
│   └── elearning/            # E-learning platform (OpenEDX customizations)
├── packages/
│   ├── shared-ui/            # Shared React components
│   ├── shared-utils/         # Shared utilities and helpers
│   └── shared-types/         # Shared TypeScript types
├── docs/                     # Comprehensive documentation
└── backup/                   # Previous website backup
```

## 🚀 Quick Start

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start website development**:

   ```bash
   npm run website:dev
   ```

3. **Build shared components**:
   ```bash
   npm run shared-ui:build
   ```

## 📚 Applications

### 🌐 Website (`apps/website`)

- **Tech Stack**: Next.js 14, Builder.io, Tailwind CSS, Stripe
- **Features**: CMS-driven content, e-commerce shop using Stripe as payment provider, responsive design
- **URL**: www.asociatia-idei.eu

### 🎓 E-learning Platform (`apps/elearning`)

- **Tech Stack**: OpenEDX, Custom React theme, Docker
- **Features**: Course management, progress tracking, certificates
- **URL**: learning.asociatia-idei.eu

### 📦 Shared Packages (`packages/`)

- **shared-ui**: Reusable React components
- **shared-utils**: Common utilities and helpers
- **shared-types**: TypeScript type definitions

## 🛠️ Development

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0
- Docker (for OpenEDX)

### Available Scripts

```bash
# Development
npm run website:dev          # Start website dev server
npm run shared-ui:build      # Build shared components

# Build
npm run build               # Build all workspaces
npm run website:build       # Build website only

# Utilities
npm run clean              # Clean all node_modules
npm run lint               # Lint all workspaces
```

## 📖 Documentation

- 📋 [Setup Instructions](docs/instructions.md) - Detailed setup and development guide
- 🏛️ [Architecture](docs/architecture.md) - System architecture and design decisions
- 🚀 [Deployment](docs/deployment.md) - Deployment strategies and configurations

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes in the appropriate workspace
3. Build and test: `npm run build && npm run lint`
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📝 Environment Variables

### Website

```env
BUILDER_PUBLIC_KEY=your_builder_io_public_key
NEXT_PUBLIC_SITE_URL=https://www.asociatia-idei.eu
STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### OpenEDX

```env
OPENEDX_PLATFORM_NAME="Asociatia IDEI Learning"
OPENEDX_LMS_BASE=learning.asociatia-idei.eu
```

## 🏢 About Asociatia IDEI

Asociatia IDEI is a Romanian NGO focused on education, innovation, and community development. This digital ecosystem supports our mission through:

- **Educational Content**: Courses, workshops, and learning materials
- **Community Building**: Events, networking, and collaboration
- **Fundraising**: Shop for supporting the organization
- **Knowledge Sharing**: Open-source contributions and resources

## 📞 Support

- **Documentation**: Check the [docs](docs/) folder
- **Issues**: Open a GitHub issue
- **Contact**: contact@asociatia-idei.eu

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by the Asociatia IDEI team
