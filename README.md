# 🏭 Money Factory AI - Official Website

**A Solana-native venture engine that turns raw ideas into funded, AI-orchestrated businesses.**

[![Solana](https://img.shields.io/badge/Built%20on-Solana-9945FF?style=for-the-badge&logo=solana)](https://solana.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

---

## 🌟 Overview

Money Factory AI is a comprehensive venture engine built exclusively for the Solana ecosystem. This repository contains the official website showcasing our platform, technology, and vision.

### Key Features

- **AEPO (AI-Enhanced Pathway Orchestration)** - Individual learning and building paths
- **AECO (AI-Enhanced Cohort Orchestration)** - Group dynamics and cohort programs  
- **Zyno Multi-Agent System** - 17 specialized AI agents for venture creation
- **Solana-Native Integration** - Deep integration with Solana ecosystem primitives
- **Launch & Collaterize** - Bonding curves and liquidity mechanisms

---

## 📁 Project Structure

```
landing_page_money_factory/
├── index.html                  # Main landing page
├── product.html                # Product overview (AEPO/AECO/Zyno)
├── investors.html              # Investor brief
├── token.html                  # Tokenomics & $MFAI
├── documentation_hub.html      # Documentation landing page
├── litepaper.html             # Technical litepaper
├── user_guide.html            # User documentation
├── zyno.html                  # AI agents overview
├── docs.html                  # Technical documentation
├── launch_collaterize.html    # Bonding curves & launch
├── _components.html           # Reusable components
├── packages/                  # Shared TypeScript packages
│   └── shared/
│       └── src/
│           ├── zyno-agents.ts
│           ├── zyno-data-models.ts
│           └── zyno-error-types.ts
└── assets/
    ├── logo_mfai.png
    ├── logoCollaterize.svg
    └── solana.svg
```

---

## 🎨 Design System

### Technology Stack
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling
- **Lucide Icons** - Modern icon library
- **Google Fonts** - Inter & Space Grotesk

### Color Palette
- **Solana Purple**: `#9945FF`
- **Solana Green**: `#14F195`
- **MFAI Primary**: `#6366F1`
- **MFAI Secondary**: `#8B5CF6`
- **MFAI Accent**: `#06B6D4`

### Design Principles
- Glass-morphism effects with backdrop blur
- Gradient text for emphasis
- Smooth hover animations
- Responsive design (mobile-first)
- Dark theme optimized for Solana ecosystem

---

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/cyranoaladin/Money_Factory.git
   cd Money_Factory
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html  # macOS
   xdg-open index.html  # Linux
   start index.html  # Windows
   ```

3. **Or use a local server**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (with http-server)
   npx http-server -p 8000
   ```

4. **Visit** `http://localhost:8000`

---

## 📚 Documentation

### Pages Overview

| Page | Description | Key Content |
|------|-------------|-------------|
| **index.html** | Main landing page | Hero, features, journey overview |
| **product.html** | Product details | AEPO, AECO, Zyno, 17 AI agents |
| **investors.html** | Investor brief | Problem, solution, traction, roadmap |
| **token.html** | Tokenomics | $MFAI utility, distribution, governance |
| **documentation_hub.html** | Docs landing | Links to all documentation |
| **litepaper.html** | Technical overview | Architecture, economics, roadmap |
| **user_guide.html** | User manual | How to use Money Factory AI |
| **zyno.html** | AI agents | 17 specialized agents overview |
| **docs.html** | Technical docs | API, data models, endpoints |
| **launch_collaterize.html** | Launch mechanics | Bonding curves, liquidity |

### Navigation Structure

```
Home → Journey → Product → Agents & API → Token → Investors → Docs
```

All pages include:
- ✅ Clickable logo (returns to home)
- ✅ Consistent navigation bar
- ✅ Footer with disclaimer
- ✅ Responsive mobile menu

---

## 🔧 Development

### Code Standards

- **HTML**: Semantic HTML5, proper accessibility attributes
- **CSS**: Tailwind utility classes, custom CSS variables for theme
- **JavaScript**: Vanilla JS for interactions, no frameworks
- **TypeScript**: Shared types in `packages/shared/`

### Quality Checklist

- [x] All text in English (no French)
- [x] `<html lang="en">` on all pages
- [x] Canonical AEPO/AECO/Zyno definitions
- [x] Consistent navigation across all pages
- [x] Legal disclaimer on all pages
- [x] SEO meta tags on all pages
- [x] Responsive design tested
- [x] All internal links verified
- [x] No broken links to .md files

---

## 🌐 Deployment

### GitHub Pages (Recommended)

1. Go to repository **Settings** → **Pages**
2. Select **main** branch
3. Click **Save**
4. Site will be live at `https://cyranoaladin.github.io/Money_Factory/`

### Custom Domain

1. Add `CNAME` file with your domain
2. Configure DNS:
   ```
   A     @     185.199.108.153
   A     @     185.199.109.153
   A     @     185.199.110.153
   A     @     185.199.111.153
   CNAME www   cyranoaladin.github.io
   ```

### Vercel / Netlify

Simply connect your GitHub repository and deploy. No build step required.

---

## 📊 Project Status

### Completion: 100% ✅

- [x] 10/10 HTML pages completed
- [x] Global design system applied
- [x] Brand consistency verified
- [x] Navigation fully functional
- [x] All content in English
- [x] SEO optimized
- [x] Responsive design
- [x] Legal disclaimers added

### Recent Updates

**2025-11-22** - Complete website revision
- Standardized all 10 pages
- Corrected AEPO/AECO/Zyno definitions
- Made all logos clickable
- Added legal disclaimers
- Unified navigation structure

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use semantic HTML
- Follow Tailwind CSS conventions
- Maintain consistent spacing (2 spaces)
- Add comments for complex sections
- Test on multiple browsers

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Website**: [moneyfactory.ai](https://moneyfactory.ai) *(coming soon)*
- **GitHub**: [github.com/cyranoaladin/Money_Factory](https://github.com/cyranoaladin/Money_Factory)
- **Discord**: [discord.gg/shztvSg9](https://discord.gg/shztvSg9)
- **Twitter**: [@MoneyFactoryAI](https://x.com/MoneyFactoryAI)

---

## ⚠️ Disclaimer

**Nothing on this site constitutes financial or investment advice. Always do your own research.**

---

## 📞 Contact

For questions, partnerships, or support:
- **Email**: contact@moneyfactory.ai
- **Discord**: [Join our community](https://discord.gg/shztvSg9)
- **Twitter**: [@MoneyFactoryAI](https://x.com/MoneyFactoryAI)

---

<div align="center">

**Built with ❤️ on Solana**

[![Solana](https://img.shields.io/badge/Powered%20by-Solana-9945FF?style=flat-square&logo=solana)](https://solana.com)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)

</div>