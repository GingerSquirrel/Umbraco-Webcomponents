# Component Image Generation

This project includes automated build-time image generation for all web components, perfect for documentation, marketing materials, and component showcases.

## Features

- **Build-time Generation**: Creates images during the build process using Puppeteer
- **Multiple Formats**: Supports PNG, WebP, and JPEG formats
- **Dual Output**: Saves to both frontend dist and Umbraco wwwroot directories
- **Desktop Rendering**: Uses 1920x1080 viewport with desktop user agent for proper styling
- **Smart Backgrounds**: Preserves existing component backgrounds, adds white to transparent ones
- **High Quality**: Configurable quality settings and device scale factor
- **Metadata Export**: Generates comprehensive metadata about all exported images

## Usage

### Quick Start

```bash
# Build project and generate component images
npm run build:images

# Or build for Umbraco and generate images
npm run build:umb:images
```

This will:
1. Build your project with Vite
2. Start a preview server (or use existing one)
3. Use Puppeteer to capture desktop screenshots of all components
4. Generate images in PNG and WebP formats
5. Save to both frontend/dist and UmbracoWebcomponents/wwwroot directories
6. Create metadata.json files with generation details

### Generated Output

Images are saved to:
- **Standard build**: `dist/component-images/`
- **Umbraco build**: `UmbracoWebcomponents/wwwroot/component-images/`

Directory structure:
```
component-images/
├── footer.png                    # Standard component images
├── footer.webp
├── hero.png
├── hero.webp
├── custom-sizes/                 # Custom dimension variants
│   └── footer/
│       └── thumbnail.png
└── metadata.json                 # Generation metadata
```

## Configuration

### Plugin Options

The image generation plugin accepts these options:

```javascript
componentImagesPlugin({
  outputDir: 'dist/component-images',    // Output directory
  viewportWidth: 1200,                   // Browser viewport width
  viewportHeight: 800,                   // Browser viewport height
  scale: 2,                              // Device scale factor (for retina)
  formats: ['png', 'webp'],             // Image formats to generate
  socialMediaSizes: false,               // Generate social media variants
  quality: 90,                           // JPEG/WebP quality (1-100)
  serverUrl: 'http://localhost:4173',    // Preview server URL
  waitForSelector: 'footer-component',   // Wait for this component to load
  delay: 1000                            // Additional delay in milliseconds
})
```

### Adding Custom Components

To add new components to the generation process, edit the `components` array in `src/plugins/vite-plugin-component-images.ts`:

```javascript
const components: ComponentConfig[] = [
  { 
    selector: 'my-component', 
    name: 'my-component',
    customSizes: {
      'thumbnail': { width: 300, height: 200 },
      'banner': { width: 1200, height: 400 }
    }
  }
];
```

## Advanced Usage

### Manual Generation

You can also run the image generation manually:

```javascript
import { componentImagesPlugin } from './src/plugins/vite-plugin-component-images.js';

const plugin = componentImagesPlugin({
  outputDir: './my-images',
  formats: ['png'],
  socialMediaSizes: false
});

// Execute the generation
await plugin.buildEnd.call({});
```

### Custom Image Processing

The plugin exports helper functions that can be used independently:

```javascript
import { captureComponent, generateMetadata } from './src/plugins/vite-plugin-component-images.js';

// Custom screenshot logic
await captureComponent(page, {
  selector: 'my-component',
  name: 'my-component'
}, outputDir, ['png'], 90, false);
```

## Integration with CI/CD

### GitHub Actions

```yaml
name: Generate Component Images
on: [push]
jobs:
  images:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build:images
      - uses: actions/upload-artifact@v3
        with:
          name: component-images
          path: dist/component-images/
```

### Azure DevOps

```yaml
- task: NodeTool@0
  inputs:
    versionSpec: '18.x'
- script: npm ci
- script: npm run build:images
- task: PublishBuildArtifacts@1
  inputs:
    pathToPublish: 'dist/component-images'
    artifactName: 'component-images'
```

## Troubleshooting

### Common Issues

**Puppeteer fails to launch**
```bash
# Install additional dependencies (Linux)
sudo apt-get install -y libgtk-3-0 libxss1 libasound2

# Or use Docker
docker run --rm -v $(pwd):/app -w /app node:18 npm run build:images
```

**Components not found**
- Ensure your components are properly registered and rendered on the page
- Check the `waitForSelector` matches an existing component
- Increase the `delay` option if components load asynchronously

**Memory issues**
- Reduce `scale` factor
- Generate fewer formats at once
- Increase Node.js memory: `NODE_OPTIONS="--max_old_space_size=4096"`

### Debug Mode

Enable debug logging by setting environment variable:

```bash
DEBUG=component-images npm run build:images
```

## Performance Tips

1. **Selective Generation**: Only generate images when needed using environment flags
2. **Format Optimization**: Use WebP for smaller file sizes
3. **Parallel Processing**: The plugin processes components sequentially for stability
4. **Caching**: Generated images can be cached in CI/CD pipelines

## Integration with Storybook

The generated images work perfectly with Storybook documentation:

```javascript
// In your stories
import componentImage from '../dist/component-images/footer.png';

export default {
  title: 'Components/Footer',
  parameters: {
    docs: {
      description: {
        component: `![Footer Component](${componentImage})`
      }
    }
  }
};
```

## API Reference

### ComponentImageOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `outputDir` | string | `'dist/component-images'` | Output directory for images |
| `viewportWidth` | number | `1200` | Browser viewport width |
| `viewportHeight` | number | `800` | Browser viewport height |
| `scale` | number | `2` | Device scale factor |
| `formats` | array | `['png']` | Image formats to generate |
| `socialMediaSizes` | boolean | `false` | Generate social media variants |
| `quality` | number | `90` | JPEG/WebP quality |
| `serverUrl` | string | `'http://localhost:4173'` | Preview server URL |
| `waitForSelector` | string | `'footer-component'` | Wait for component |
| `delay` | number | `1000` | Additional delay (ms) |

### ComponentConfig

| Option | Type | Description |
|--------|------|-------------|
| `selector` | string | CSS selector for the component |
| `name` | string | Output filename (without extension) |
| `customSizes` | object | Custom dimension variants |

This automated image generation system ensures your component library always has up-to-date visual documentation and marketing materials.
