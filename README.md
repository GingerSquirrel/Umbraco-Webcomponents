# Web Components Vite Project

This repository contains a modern setup for building reusable web components using Vite, TypeScript, and SCSS, with integration points for Umbraco CMS.

---

## 📦 Repository Structure

```
webcomponents-vite-project
├── frontend
│   ├── src
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── components/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── UmbracoWebcomponents
│   ├── Controllers/
│   ├── Services/
│   ├── Views/
│   └── ...
├── README.md         # (this file)
└── ...
```

---

## 🚀 Quick Start

1. **Frontend (Vite)**
   - Navigate to the `frontend` folder:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```
   - Open [http://localhost:3000](http://localhost:3000) to view the app.

2. **Umbraco Integration**
   - The `UmbracoWebcomponents` folder contains .NET/Umbraco code for backend integration.
   - Reference built frontend assets in your Umbraco `.cshtml` views.

---

## 🛠 Features

- **Component-based:** Organize your UI as reusable web components.
- **TypeScript & SCSS:** Write modern, type-safe code and modular styles.
- **Build-time Image Generation:** Automatically create screenshots of components for documentation and marketing.
- **PWA Support:** Service worker and manifest for progressive web app functionality.
- **Vite-powered:** Fast development server and optimized builds.
- **Umbraco-ready:** Designed for easy integration with Umbraco CMS.

---

## 📚 More Info

- See `frontend/README.md` for frontend-specific instructions.
- See `UmbracoWebcomponents/` for backend/Umbraco usage.
- See `COMPONENT-IMAGES.md` for automated image generation documentation.

## 🖼️ Component Image Generation

Generate screenshots of all your web components automatically:

```bash
cd frontend
npm run build:images
```

This creates high-quality images perfect for:
- 📖 Documentation and component libraries
- 🎨 Design system showcases
- 📊 Component catalogs

Images are generated in multiple formats (PNG, WebP). See `COMPONENT-IMAGES.md` for complete documentation.

---
