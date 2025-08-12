# SEO Preview Property Editor

A powerful Umbraco property editor that allows content editors to input Meta Title and Meta Description while seeing a real-time Google search result preview. Perfect for SEO optimization and ensuring your content looks great in search results!

## ✨ Features

### **Dual Input Fields**
- **Meta Title Input**: Character-counted input with SEO recommendations
- **Meta Description Textarea**: Multi-line input for detailed descriptions

### **Real-time Google Search Preview**
- **Live Preview**: See exactly how your content will appear in Google search results
- **Authentic Styling**: Matches Google's current search result design
- **Interactive Elements**: Hover effects and realistic appearance

### **SEO Guidance**
- **Character Count Indicators**: Real-time feedback on title and description length
- **Color-coded Warnings**: 
  - 🟢 Green: Within optimal range
  - 🟡 Yellow: Approaching limit
  - 🔴 Red: Over recommended limit
- **Best Practice Recommendations**:
  - Meta Title: 50-60 characters (max 60)
  - Meta Description: 120-155 characters (max 155)

### **Smart Text Handling**
- **Auto-truncation**: Preview shows exactly how Google will truncate long text
- **JSON Storage**: Stores both fields as structured JSON data
- **Fallback Content**: Shows helpful placeholder text when fields are empty

## 📱 Responsive Design

- **Desktop Layout**: Side-by-side input and preview panels
- **Mobile Layout**: Stacked layout for smaller screens
- **Consistent Spacing**: Clean, professional appearance across all devices

## 🎯 Use Cases

- **Blog Posts**: Optimize article titles and descriptions
- **Product Pages**: Craft compelling product search snippets
- **Landing Pages**: Perfect homepage and campaign page SEO
- **News Articles**: Enhance news content discoverability
- **Service Pages**: Improve service page search visibility

## 🛠️ Installation

The property editor has been automatically deployed to `App_Plugins/seo-preview/` in your Umbraco installation.

## 📋 Usage Instructions

### 1. **Create a Data Type**
1. Go to **Settings → Data Types** in Umbraco backoffice
2. Click **Create** → **New Data Type**
3. Name it "SEO Meta Fields" (or similar)
4. Select **"SEO Preview"** as the Property Editor
5. **Save** the Data Type

### 2. **Add to Document Types**
1. Go to **Settings → Document Types**
2. Edit your desired Document Type (e.g., "Blog Post", "Page")
3. Go to the **Design** tab
4. Click **Add property**
5. Set the property details:
   - **Name**: "SEO Meta"
   - **Alias**: "seoMeta"
   - **Data Type**: Select your "SEO Meta Fields" data type
6. **Save** the Document Type

### 3. **Content Editing**
1. Create or edit content using the Document Type
2. Find the **SEO Meta** property
3. Enter your **Meta Title** (aim for 50-60 characters)
4. Enter your **Meta Description** (aim for 120-155 characters)
5. Watch the **Google Search Preview** update in real-time
6. Adjust content based on the preview and character count indicators
7. **Save and Publish** your content

## 💾 Data Storage

The property editor stores data as JSON in this format:
```json
{
  "metaTitle": "Your optimized page title",
  "metaDescription": "Your compelling meta description that appears in search results"
}
```

## 🎨 Preview Accuracy

The Google search preview includes:
- **Authentic URL styling** (blue, underlined)
- **Realistic title formatting** (20px, blue, hover effects)
- **Accurate description styling** (14px, gray)
- **Proper line heights and spacing**
- **Text truncation** exactly as Google displays it

## 🔧 Technical Details

- **Framework**: Built with Lit and TypeScript
- **Property Editor Schema**: Uses `Umbraco.JSON` for structured data
- **Bundle Size**: ~7.2KB (1.83KB gzipped)
- **Browser Support**: Modern browsers (ES2022+)
- **Responsive**: Mobile-first design with desktop enhancements

## 🚀 Development

To rebuild this property editor:

```bash
cd frontend/src/umbraco-extensions/seo-preview
npm run build
node "../../../scripts/copy-to-umbraco.js" seo-preview
```

## 📁 File Structure

```
seo-preview/
├── src/
│   └── seo-preview-property-editor-ui.element.ts  # Main component
├── dist/
│   ├── seo-preview.js                             # Built output
│   └── seo-preview.js.map                         # Source map
├── package.json                                   # Dependencies
├── tsconfig.json                                  # TypeScript config
├── vite.config.js                                 # Build config
└── umbraco-package.json                           # Umbraco manifest
```

## 🎯 SEO Best Practices

### **Meta Title Tips**
- Include your primary keyword near the beginning
- Keep it under 60 characters to avoid truncation
- Make it compelling and click-worthy
- Avoid keyword stuffing
- Include your brand name if space allows

### **Meta Description Tips**
- Summarize the page content accurately
- Include a call-to-action when appropriate
- Use 120-155 characters for optimal display
- Include relevant keywords naturally
- Make it unique for each page

## 🔮 Future Enhancements

Potential features for future versions:
- Custom domain URL in preview
- Multiple search engine previews (Bing, etc.)
- Rich snippet preview support
- Social media preview (Facebook, Twitter)
- Keyword density analysis
- SERP competition analysis

---

**The SEO Preview Property Editor is now ready to help your content team create search-optimized content with confidence!** 🚀
