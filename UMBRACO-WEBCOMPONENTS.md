# Web Components in Umbraco BlockList

This guide shows you how to use your frontend web components as live previews in the Umbraco backoffice BlockList editor.

## 🎯 What This Achieves

- **True WYSIWYG**: Editors see the actual frontend components in the backoffice
- **Consistent Design**: Same components used in frontend and backoffice previews
- **Real-time Preview**: Components update instantly as content changes
- **Better UX**: Editors can visually understand how content will appear

## 🛠️ Setup Instructions

### 1. Ensure Web Component Assets Are Built

First, make sure your web components are built for Umbraco:

```bash
npm run umbbuild
```

This copies your web component CSS and JavaScript to `UmbracoWebcomponents/wwwroot/assets/`.

### 2. Configure BlockList Items

For each BlockList element type:

1. **Go to Settings → Document Types**
2. **Select your BlockList document type** (e.g., "Main Content")
3. **Edit the BlockList property**
4. **Click on "Available Blocks"**
5. **For each block type:**
   - Click the ⚙️ settings icon
   - Under "Custom View", check "Use custom view"
   - Browse and select the corresponding `.ts` file from `App_Plugins/WebComponents/`:
     - `achievements-preview.ts` for Achievements
     - `cards-preview.ts` for Cards  
     - `footer-preview.ts` for Footer
     - `hero-preview.ts` for Hero
     - etc.

### 3. Available Preview Views

The following TypeScript preview views are available:

| Umbraco Module | Preview View | Web Component |
|----------------|--------------|---------------|
| Achievements Module | `achievements-preview.ts` | `<achievements-component>` |
| Cards Module | `cards-preview.ts` | `<cards-component>` |
| Clients Module | `clients-preview.ts` | `<clients-component>` |
| Community Module | `community-preview.ts` | `<community-component>` |
| Footer Module | `footer-preview.ts` | `<footer-component>` |
| Hero Module | `hero-preview.ts` | `<hero-component>` |
| Menu Module | `menu-preview.ts` | `<menu-component>` |
| Quote Module | `quote-preview.ts` | `<quote-component>` |
| Call To Action Module | `button-preview.ts` | `<button-component>` |
| Image And Text Module | `imageandtext-preview.ts` | `<imageandtext-component>` |

## 🔧 Technical Implementation

### Shared Preview Partial

All preview views use `_WebComponentPreview.cshtml` which:
- ✅ Loads critical CSS and component assets
- ✅ Provides consistent preview styling
- ✅ Handles backoffice compatibility
- ✅ Adds visual indicators ("Live Preview" badge)

### Asset Loading

Each preview automatically loads:
- `/assets/critical.css` - Critical styles for immediate rendering
- `/assets/index.css` - Main component styles  
- `/assets/index.js` - Web component JavaScript (ES modules)

### Preview Styling

Components are wrapped in `.webcomponent-preview` containers with:
- Clean white background
- Subtle borders and shadows
- "Live Preview" badge
- Responsive scaling options
- CSS resets for backoffice compatibility

## 🎨 Customization

### Scaling Components

To scale components down for backoffice viewing, add the `compact` class:

```html
<div class="webcomponent-preview compact">
    <hero-component></hero-component>
</div>
```

### Custom Styling

Override preview styles by modifying `_WebComponentPreview.cshtml` or adding component-specific CSS.

### Component Data Binding

To pass Umbraco content to web components, you can:

1. **Use HTML attributes:**
```html
<hero-component 
    title="@content.Title" 
    subtitle="@content.Subtitle">
</hero-component>
```

2. **Use JavaScript data binding:**
```html
<script>
document.querySelector('hero-component').data = {
    title: '@content.Title',
    subtitle: '@content.Subtitle'
};
</script>
```

## 🔄 Regenerating Preview Views

If you add new components or modify the mapping, regenerate preview views:

```bash
npm run generate:preview-views
```

This will:
- ✅ Create preview views for all BlockList components
- ✅ Update component mappings
- ✅ Generate fresh documentation

## 🐛 Troubleshooting

### Components Not Rendering

1. **Check asset paths**: Ensure `/assets/index.js` and `/assets/index.css` are accessible
2. **Verify build**: Run `npm run umbbuild` to rebuild assets
3. **Browser console**: Check for JavaScript errors in browser dev tools
4. **Module loading**: Ensure web components are properly defined

### Styling Issues

1. **CSS conflicts**: Check if backoffice CSS is interfering
2. **Asset loading**: Verify critical.css and index.css are loading
3. **Component CSS**: Ensure component styles are included in the build

### Performance

1. **Lazy loading**: Consider lazy loading for heavy components
2. **Asset optimization**: Ensure assets are minified and compressed
3. **Caching**: Leverage browser caching for static assets

## 📚 Resources

- [Umbraco BlockList Documentation](https://docs.umbraco.com/umbraco-cms/fundamentals/backoffice/property-editors/built-in-umbraco-property-editors/block-editor/block-list-editor)
- [Custom BlockList Views](https://docs.umbraco.com/umbraco-cms/tutorials/creating-custom-views-for-blocklist)
- [Web Components Documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

## 🎉 Benefits

- **Better Content Experience**: Editors see exactly what users will see
- **Reduced Errors**: Visual feedback prevents content mistakes
- **Faster Editing**: No need to preview on frontend constantly
- **Design Consistency**: Same components everywhere
- **Modern Development**: Leverage your existing web component architecture
