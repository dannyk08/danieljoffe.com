# Daniel Joffe - Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.13-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Nx](https://img.shields.io/badge/Nx-21.4.1-143055?logo=nx)](https://nx.dev/)

> **A modern, performant portfolio website showcasing 8+ years of full-stack engineering expertise**

Live at: [danieljoffe.com](https://danieljoffe.com)

---

## 🚀 About

This is the personal portfolio website of Daniel Joffe, a Senior Software Engineer specializing in full-stack development, technical leadership, and performance optimization. The site showcases professional experience, achievements, methodologies, and project work through an accessible, fast, and modern web experience.

### Key Features

- 📱 **Fully Responsive Design** - Optimized for all devices and screen sizes
- ⚡ **Performance Optimized** - Built with Next.js 15 and advanced optimization techniques
- ♿ **Accessibility First** - WCAG compliant with proper semantic markup
- 🎨 **Modern UI/UX** - Beautiful, clean design with smooth animations using GSAP
- 📊 **Analytics & Monitoring** - Integrated with Google Analytics, Vercel Analytics, and Sentry
- 🔍 **SEO Optimized** - Comprehensive meta tags, structured data, and OpenGraph support
- 📧 **Contact Form** - Secure contact form with hCaptcha protection
- 📱 **PWA Ready** - Service worker implementation for offline capabilities

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.5.2 (App Router)
- **UI Library**: React 19.1.1
- **Language**: TypeScript 5.9.2
- **Styling**: Tailwind CSS 4.1.13
- **Animations**: GSAP 3.13.0
- **Icons**: Lucide React

### Development & Build Tools

- **Monorepo**: Nx 21.4.1
- **Package Manager**: Yarn
- **Linting**: ESLint 9 with custom configuration
- **Testing**: Jest + React Testing Library
- **E2E Testing**: Playwright
- **Component Development**: Storybook 9.1.4

### Production & Monitoring

- **Analytics**: Google Analytics, Vercel Analytics
- **Performance**: Vercel Speed Insights
- **Error Tracking**: Sentry
- **Form Protection**: hCaptcha
- **Image Optimization**: Next.js Image + Unsplash integration

---

## 📁 Project Structure

```
apps/root/src/
├── app/                    # Next.js App Router pages
│   ├── home/              # Homepage components (Hero, Achievements, etc.)
│   ├── about/             # About page with professional timeline
│   ├── projects/          # Project showcase pages
│   ├── api/               # API routes (contact form, etc.)
│   └── thank-you/         # Thank you pages
├── components/
│   ├── assembled/         # Complex, reusable components
│   └── units/            # Basic UI components (Button, Input, etc.)
├── content/              # MDX content files
├── lib/                  # Utility libraries and configurations
├── state/                # Global state management
├── types/                # TypeScript type definitions
└── utils/                # Helper functions and constants
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/dannyk08/danieljoffe.com.git
   cd danieljoffe.com
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp apps/root/.env.example apps/root/.env.local
   # Edit the .env.local file with your configuration
   ```

4. **Start the development server**

   ```bash
   npx nx dev root
   ```

   The application will be available at `http://localhost:3000`

---

## 📜 Available Scripts

### Development

```bash
# Start development server
npx nx dev root

# Build for production
npx nx build root

# Start production server
npx nx start root

# Run linting
npx nx lint root

# Run tests
npx nx test root

# Run E2E tests
npx nx e2e root-e2e
```

### Development Tools

```bash
# Start Storybook
npx nx storybook root

# Run bundle analyzer
yarn analyze

# Generate project graph
npx nx graph
```

---

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright with multiple browser support
- **Component Testing**: Storybook for visual component development
- **Linting**: ESLint with custom rules for code quality

```bash
# Run all tests
npx nx test root

# Run E2E tests
npx nx e2e root-e2e

# Run tests in watch mode
npx nx test root --watch
```

---

## 📊 Performance & Monitoring

The application includes several performance and monitoring features:

- **Core Web Vitals Tracking**: Automated performance monitoring
- **Error Boundary**: React error boundaries with Sentry integration
- **Service Worker**: Caching and offline functionality
- **Image Optimization**: Next.js Image component with Unsplash integration
- **Bundle Analysis**: Webpack bundle analyzer for optimization

---

## 🌐 Deployment

The application is optimized for deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - automatic deployments on push to main branch

### Environment Variables

Key environment variables needed for production:

```bash
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
SENTRY_DSN=your_sentry_dsn
HCAPTCHA_SITE_KEY=your_hcaptcha_site_key
HCAPTCHA_SECRET_KEY=your_hcaptcha_secret_key
```

---

## 🤝 Contributing

This is a personal portfolio project, but if you'd like to suggest improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

**Daniel Joffe**  
Senior Software Engineer

- 🌐 Website: [danieljoffe.com](https://danieljoffe.com)
- 💼 LinkedIn: [linkedin.com/in/dannyk08](https://linkedin.com/in/dannyk08)
- 🐙 GitHub: [github.com/dannyk08](https://github.com/dannyk08)
- 📧 Email: hello@danieljoffe.com

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [GSAP](https://greensock.com/gsap/)
- Icons by [Lucide](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)
- Hosted on [Vercel](https://vercel.com/)
