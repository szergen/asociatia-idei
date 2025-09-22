# Asociatia IDEI Website

The main website for Asociatia IDEI built with Next.js, Builder.io CMS, and integrated shop functionality.

## 🚀 Features

- **Builder.io CMS**: Content management with visual editor
- **E-commerce Shop**: Product catalog and Stripe payments
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags, sitemaps, structured data
- **Romanian Localization**: Native language support
- **Shared Components**: Reusable UI from `@asociatia-idei/shared-ui`

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **CMS**: Builder.io
- **Styling**: Tailwind CSS
- **Payments**: Stripe
- **Language**: TypeScript
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── components/           # Website-specific components
├── pages/               # Next.js pages and API routes
├── shop/                # E-commerce functionality
│   ├── components/      # Shop components
│   ├── hooks/          # Shop-related hooks
│   └── utils/          # Shop utilities
├── builder/             # Builder.io integration
│   ├── components/     # Custom Builder components
│   └── config/         # Builder configuration
└── styles/             # Global styles and Tailwind config
```

## 🏃‍♂️ Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:

   ```bash
   cp .env.example .env.local
   ```

   Add your keys:

   ```env
   BUILDER_PUBLIC_KEY=your_builder_io_public_key
   BUILDER_PRIVATE_KEY=your_builder_io_private_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   STRIPE_PUBLIC_KEY=your_stripe_public_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser**: http://localhost:3000

## 🏗️ Development

### Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript checker
```

### Adding Builder.io Components

1. Create component in `src/builder/components/`
2. Register in Builder.io Studio
3. Use in Builder.io visual editor

Example:

```typescript
// src/builder/components/CustomHero.tsx
import { Builder } from "@builder.io/react";

const CustomHero = ({ title, subtitle, image }) => (
  <section className="hero">
    <h1>{title}</h1>
    <p>{subtitle}</p>
    <img src={image} alt={title} />
  </section>
);

Builder.registerComponent(CustomHero, {
  name: "Custom Hero",
  inputs: [
    { name: "title", type: "string" },
    { name: "subtitle", type: "string" },
    { name: "image", type: "file" },
  ],
});
```

### Shop Development

The shop module includes:

- Product catalog
- Shopping cart
- Checkout process
- Order management
- Stripe integration

### Shared Components Usage

```typescript
import { Button, Header, Footer } from "@asociatia-idei/shared-ui";

const MyPage = () => (
  <div>
    <Header navigation={navigationItems} />
    <main>
      <Button variant="primary">Click me</Button>
    </main>
    <Footer />
  </div>
);
```

## 🌐 Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Set build settings:

   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

3. Add environment variables in Vercel dashboard

4. Deploy! 🚀

### Manual Deployment

```bash
npm run build
npm run start
```

## 🔧 Configuration

### Builder.io Setup

1. Create Builder.io account
2. Get API keys from Builder.io dashboard
3. Configure models in Builder.io:
   - **Page**: For general pages
   - **Product**: For shop items
   - **Blog Post**: For content articles

### Stripe Setup

1. Create Stripe account
2. Get API keys from Stripe dashboard
3. Configure webhook endpoints:
   - `/api/webhooks/stripe`

## 📝 Content Management

### Pages

- Managed through Builder.io visual editor
- Custom components available in Builder.io
- SEO settings in Builder.io

### Shop Products

- Products managed in Builder.io or Stripe
- Inventory tracking
- Image optimization

### Blog Posts

- Content creation in Builder.io
- Rich text editing
- Media management

## 🐛 Troubleshooting

### Common Issues

1. **Builder.io not loading**:

   - Check API keys in `.env.local`
   - Verify domain in Builder.io settings

2. **Stripe payments failing**:

   - Check webhook configuration
   - Verify API keys
   - Check network requests in browser

3. **Shared components not updating**:
   ```bash
   cd ../../packages/shared-ui
   npm run build
   cd ../../apps/website
   npm run dev
   ```

### Debug Mode

Enable debug logging:

```env
DEBUG=builder:*
NEXT_PUBLIC_DEBUG=true
```

## 📊 Analytics

- **Vercel Analytics**: Built-in performance monitoring
- **Google Analytics**: Add GA tracking ID
- **Builder.io Analytics**: Content performance tracking

## 🔐 Security

- Environment variables for sensitive data
- HTTPS enforcement in production
- Stripe webhook signature verification
- Content Security Policy headers

## 📞 Support

- Check main repository [documentation](../../docs/)
- Open issues on GitHub
- Contact: contact@asociatia-idei.eu
