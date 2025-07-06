# Web Components Vite Project

A project which aims to to build webcomponents in Umbraco in the most efficient way possible, using TypeScript, SCSS and Umbraco specific build configurations.

---

## 📁 Project Structure

```
webcomponents-vite-project
├── src
│   ├── index.html                  # Main HTML file
│   ├── main.ts                     # Main TypeScript entry
│   └── components
│       ├── mycomponent
│       │    ├── MyComponent.js     # Example custom web component
│       │    ├── MyComponent.scss   # Component-specific styles (optional)
│       │    └── MyComponent.html   # Component template (optional)
│       └── ...                     # Add more components here
├── package.json                    # npm configuration and scripts
├── vite.config.js                  # Vite configuration
└── README.md                       # Project documentation
```

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd webcomponents-vite-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 🛠 Usage

- The main entry point is `src/index.html`, which loads your main script.
- Add or modify components in the `src/components` directory.
- Import and register your custom elements in `main.ts` and add them to `main.scss`.

---

## 🎨 Design Reference

This project is inspired by a [Figma minimal landing page design](https://www.figma.com/community/file/1222060007934600841/minimal-landing-page-design-website-home-page-design-agency-website-ui-design).

---

## 📚 Notes

- You can use SCSS for global and component-specific styles.
- Vite enables fast hot module replacement and modern build tooling.
- Extend this setup to add more components or integrate with frameworks as needed.