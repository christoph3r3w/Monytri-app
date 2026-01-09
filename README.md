# Monytri Progressive Web App <img width="30" height="30" alt="Monytri Appe" src="./static/Monytri-01-1.png" />


## Project Description

An MVP designed to showcase the services, capabilities, and adaptability of the Monytri financial platform to stakeholders and investors. It is a progressive web app that centralizes stock gifting, asset transfers, and payment requests, while also allowing users to practice and learn about financial literacy.

The platform encourages users to stay up to date with their personal portfolios, learn from curated educational content on portfolio management, and exchange assets through built-in services.

## Core Features

### User Experience
- **Gifting & Requests**: Send and request gifted assets
- **Portfolio Overview**: View all portfolios in one centralized dashboard
- **Calculator**: Extrapolation and projection tool for financial scenarios
- **Curated Media**: Educational content and announcements curated by the Monytri team
- **QR Sharing**: Generate QR codes to request amounts or share the app easily

### App Experience 
- **Progressive Web App (PWA)**: App-like functionality delivered through web technologies
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Intuitive Navigation**: Clear user flows with accessible design patterns
- **Offline Capability**: Service worker support for limited offline use
- **Environment Responsiveness**: Platform and device detection for adaptive behavior


## Getting Started

### Production Environment

The application is maintained on GitHub and Netlify with continuous integration, and the content is managed via Appwrite.

Access the live application at: [**Monytri.app**](https://monytri.app/)

### Netlify 
Log in to Netlify with your connected account, and select the project. 
> Here you can check and manage application traffic, DNS settings, and domain settings.

### Appwrite
Log in to Appwrite with your connected account and select the project. 
> On this platform you can manage and add content to the application. (blogs, podcasts, announcements, image assets, videos)

##### To add content, 
1. Navigate to the content type in the database tab.
2. Select the option to add a new row.
3. and fill in the necessary parameters.
 
##### For image assets
 1. Navigate to the storage tab and add the assets.
 2. Copy the generated link of the asset and navigate to the blog section in the database tab.
 3. Select the banner-image section.
 4. Create a new row for the copied asset link.
 5. Fill in the necessary parameters.

### Development Prerequisites
- Node.js (version 18+ recommended)
- npm
- Svelte 5

## Technical Architecture

### Technology Stack
- **SvelteKit** - Frontend & SSR 
- **Appwrite** - Auth - Storage - CMS
- **Capacitor** - Cross-platform native app creation
- **CSS** - Global styling
- **Tailwind CSS** - Utility-first CSS 
- **PWA Features** - Service worker implementation and offline functionality
- **Web APIs** - Integration with modern browser capabilities

#### Installation & Setup
```bash
# Clone the repository
git clone https://github.com/christoph3r3w/Monytri-app.git
> Or download the folder from GitHub

# Navigate to project directory
cd Monytri-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build app
npm run build
```

#### Project Structure
```
src/
├── routes/           # Application pages and routing logic
├── lib/             # Reusable components and utilities
├── static/          # Static assets and images
└── app.css         # Global styling and design system
```

## Device Compatibility

This application functions on _most_ mobile and desktop environments and browsers that support:
- HTML 4 & 5
- JavaScript (ECMAScript 2026)


## Project Status & Development
- Development: MVP phase has concluded
- Live status:  [![Netlify Status](https://api.netlify.com/api/v1/badges/08a4e3a9-42ce-4a4b-859f-cf756c1f2da3/deploy-status)](https://app.netlify.com/projects/monytri-alpha/deploys)

## Support & Documentation

### Issues & Bug Reports
Report technical issues through [GitHub Issues](https://github.com/christoph3r3w/Monytri-app/issues)


### Community & Updates
- [Instagram](https://www.instagram.com/monytri.fintech/) - Product updates and announcements
- [LinkedIn](https://www.linkedin.com/company/monytri/) - Professional updates and company news

---

*Monytri Progressive Web App - Revolutionizing Digital Financial Services*
