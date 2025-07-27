import { Plugin } from 'vite';
import { writeFile, mkdir, readdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

interface ComponentImageOptions {
  outputDir?: string;
  viewportWidth?: number;
  viewportHeight?: number;
  scale?: number;
  formats?: ('png' | 'jpg' | 'webp')[];
  socialMediaSizes?: boolean;
  quality?: number;
  serverUrl?: string;
  waitForSelector?: string;
  delay?: number;
}

interface ComponentConfig {
  selector: string;
  name: string;
  customSizes?: { [key: string]: { width: number; height: number } };
}

interface Metadata {
  generatedAt: string;
  components: string[];
  totalImages: number;
  formats: string[];
  directories: string[];
}

export function componentImagesPlugin(options: ComponentImageOptions = {}): Plugin {
  const {
    outputDir = 'dist/component-images',
    viewportWidth = 1200,
    viewportHeight = 800,
    scale = 1,
    formats = ['png'],
    socialMediaSizes = false,
    quality = 90,
    serverUrl = 'http://localhost:4173',
    waitForSelector = 'footer-component',
    delay = 1000
  } = options;

  // Helper functions
  const captureComponent = async (
    page: any, 
    component: ComponentConfig, 
    outputDir: string, 
    formats: string[], 
    quality: number,
    socialMediaSizes: boolean
  ) => {
    const element = await page.$(component.selector);
    
    if (!element) {
      console.warn(`⚠️  Component ${component.selector} not found, skipping...`);
      return;
    }

    console.log(`📸 Capturing ${component.name} component...`);

    // Standard capture
    for (const format of formats) {
      const screenshot = await element.screenshot({
        type: format as 'png' | 'jpeg' | 'webp',
        omitBackground: true,
        quality: format === 'png' ? undefined : quality
      });

      const filename = `${component.name}.${format}`;
      await writeFile(path.join(outputDir, filename), screenshot);
      console.log(`  ✓ Generated ${filename}`);
    }

    // Custom sizes if defined
    if (component.customSizes) {
      await captureCustomSizes(page, component, outputDir, formats, quality);
    }
  };



  const captureCustomSizes = async (
    page: any, 
    component: ComponentConfig, 
    outputDir: string, 
    formats: string[], 
    quality: number
  ) => {
    if (!component.customSizes) return;

    const customDir = path.join(outputDir, 'custom-sizes', component.name);
    await mkdir(customDir, { recursive: true });

    for (const [sizeName, dimensions] of Object.entries(component.customSizes)) {
      await captureWithDimensions(
        page,
        component.selector,
        dimensions.width,
        dimensions.height,
        path.join(customDir, sizeName),
        formats,
        quality
      );
      console.log(`  ✓ Generated ${component.name} custom size: ${sizeName}`);
    }
  };

  const captureWithDimensions = async (
    page: any,
    selector: string,
    width: number,
    height: number,
    outputPath: string,
    formats: string[],
    quality: number
  ) => {
    // Set viewport to desired dimensions
    await page.setViewport({ width, height });
    
    // Wait for layout to adjust
    await page.waitForTimeout(500);
    
    const element = await page.$(selector);
    if (!element) return;

    for (const format of formats) {
      const screenshot = await element.screenshot({
        type: format as 'png' | 'jpeg' | 'webp',
        omitBackground: true,
        quality: format === 'png' ? undefined : quality
      });

      await writeFile(`${outputPath}.${format}`, screenshot);
    }
  };

  const generateMetadata = async (components: ComponentConfig[], outputDir: string) => {
    const metadata: Metadata = {
      generatedAt: new Date().toISOString(),
      components: components.map(c => c.name),
      totalImages: 0,
      formats: [],
      directories: []
    };

    // Count generated files
    try {
      const files = await readdir(outputDir);
      metadata.totalImages = files.filter(f => f.match(/\.(png|jpg|jpeg|webp)$/)).length;
      const formatSet = new Set(
        files
          .map(f => f.split('.').pop())
          .filter((ext): ext is string => ext !== undefined)
      );
      metadata.formats = Array.from(formatSet);
      
      // Check for subdirectories
      const subdirs = ['social-media', 'custom-sizes'];
      for (const subdir of subdirs) {
        if (existsSync(path.join(outputDir, subdir))) {
          metadata.directories.push(subdir);
        }
      }
    } catch (error) {
      console.warn('Could not generate complete metadata:', error);
    }

    await writeFile(
      path.join(outputDir, 'metadata.json'),
      JSON.stringify(metadata, null, 2)
    );

    console.log(`📋 Generated metadata.json with ${metadata.totalImages} images`);
  };

  return {
    name: 'component-images',
    
    async buildEnd() {
      console.log('🖼️  Starting component image generation...');
      
      let browser: any = null;
      
      try {
        // Dynamic import to avoid build-time dependency
        const puppeteer = await import('puppeteer');
        
        // Launch Puppeteer
        browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        
        // Set viewport
        await page.setViewport({ 
          width: viewportWidth, 
          height: viewportHeight,
          deviceScaleFactor: scale
        });

        // Ensure output directory exists
        await mkdir(outputDir, { recursive: true });

        // Navigate to the built site
        console.log(`📄 Loading page: ${serverUrl}`);
        await page.goto(serverUrl, { 
          waitUntil: 'networkidle0',
          timeout: 30000 
        });

        // Wait for components to load
        console.log(`⏳ Waiting for ${waitForSelector} to load...`);
        await page.waitForSelector(waitForSelector, { timeout: 10000 });

        // Additional delay for dynamic content
        await page.waitForTimeout(delay);

        // Define components to capture
        const components: ComponentConfig[] = [
          { selector: 'footer-component', name: 'footer' },
          { selector: 'hero-component', name: 'hero' },
          { selector: 'cards-component', name: 'cards' },
          { selector: 'menu-component', name: 'menu' },
          { selector: 'quote-component', name: 'quote' },
          { selector: 'clients-component', name: 'clients' },
          { selector: 'achievements-component', name: 'achievements' },
          { selector: 'community-component', name: 'community' },
          { selector: 'button-component', name: 'button' }
        ];

        // Capture each component
        for (const component of components) {
          await captureComponent(page, component, outputDir, formats, quality, socialMediaSizes);
        }

        // Generate component library metadata
        await generateMetadata(components, outputDir);

        console.log('✅ Component image generation completed!');
        
      } catch (error) {
        console.error('❌ Error generating component images:', error);
        console.log('💡 Make sure to install puppeteer: npm install --save-dev puppeteer');
        console.log('💡 Make sure your preview server is running: npm run preview');
      } finally {
        if (browser) {
          await browser.close();
        }
      }
    }
  };
}
