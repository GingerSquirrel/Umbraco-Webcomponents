#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find an available port
async function findAvailablePort(startPort = 4173) {
  const net = await import('net');
  
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    server.on('error', () => {
      resolve(findAvailablePort(startPort + 1));
    });
  });
}

// Check if server is already running
async function isServerRunning(port) {
  const net = await import('net');
  
  return new Promise((resolve) => {
    const socket = new net.Socket();
    
    socket.setTimeout(1000);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => {
      resolve(false);
    });
    
    socket.connect(port, 'localhost');
  });
}

async function generateImages() {
  console.log('🏗️  Starting image generation process...');
  
  let previewServer = null;
  let port = 4173; // Default preview port
  let shouldStopServer = false;
  
  try {
    // Check if preview server is already running
    const serverRunning = await isServerRunning(port);
    
    if (serverRunning) {
      console.log(`✅ Preview server already running on port ${port}`);
    } else {
      // Find an available port and start server
      port = await findAvailablePort();
      shouldStopServer = true;
      
      console.log(`🚀 Starting preview server on port ${port}...`);
      const isWindows = process.platform === 'win32';
      previewServer = spawn(isWindows ? 'npm.cmd' : 'npm', ['run', 'preview', '--', '--port', port.toString()], {
        cwd: path.resolve(__dirname, '..'),
        stdio: 'pipe',
        shell: true
      });

      // Wait for server to start
      await new Promise((resolve, reject) => {
        let output = '';
        let resolved = false;
        const timeout = setTimeout(() => {
          reject(new Error('Preview server failed to start within 30 seconds'));
        }, 30000);

        previewServer.stdout.on('data', (data) => {
          const text = data.toString();
          output += text;
          console.log('Preview server:', text.trim());
          
          // Strip ANSI color codes and check for server ready
          const cleanOutput = output.replace(/\x1b\[[0-9;]*m/g, '');
          
          if (cleanOutput.includes('Local:') && cleanOutput.includes('localhost:') && !resolved) {
            console.log('✅ Server ready detected!');
            resolved = true;
            clearTimeout(timeout);
            resolve();
          }
        });

        previewServer.stderr.on('data', (data) => {
          const text = data.toString();
          console.error('Preview server error:', text.trim());
          // Don't fail on Storybook warnings
          if (!text.includes('Could not resolve addon')) {
            clearTimeout(timeout);
            reject(new Error(`Preview server error: ${text}`));
          }
        });

        previewServer.on('error', (error) => {
          clearTimeout(timeout);
          reject(error);
        });

        previewServer.on('close', (code) => {
          if (code !== 0) {
            clearTimeout(timeout);
            reject(new Error(`Preview server exited with code ${code}`));
          }
        });
      });

      console.log('✅ Preview server started');
      
      // Wait a bit for server to stabilize
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    // Step 3: Generate images using Puppeteer directly
    console.log('📸 Generating component images...');
    
    const puppeteer = await import('puppeteer');
    
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set desktop viewport - larger width to ensure desktop layout
    await page.setViewport({ 
      width: 1920, 
      height: 1080,
      deviceScaleFactor: 1
    });

    // Set desktop user agent to ensure desktop styling
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');

    const outputDir = path.resolve(__dirname, '../dist/component-images');
    const umbracoOutputDir = path.resolve(__dirname, '../../UmbracoWebcomponents/wwwroot/component-images');
    
    // Create output directories
    const fsPromises = await import('fs/promises');
    await fsPromises.mkdir(outputDir, { recursive: true });
    await fsPromises.mkdir(umbracoOutputDir, { recursive: true });

    console.log(`📁 Output directories:`);
    console.log(`  - Frontend: ${outputDir}`);
    console.log(`  - Umbraco: ${umbracoOutputDir}`);

    // Navigate to the built site
    const serverUrl = `http://localhost:${port}`;
    console.log(`📄 Loading page: ${serverUrl}`);
    await page.goto(serverUrl, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Add white background to ensure components without background show properly
    await page.addStyleTag({
      content: `
        body { 
          background-color: white; 
        }
      `
    });

    // Apply white background only to components that don't have one
    await page.evaluate(() => {
      const components = document.querySelectorAll(
        'footer-component, hero-component, cards-component, menu-component, ' +
        'quote-component, clients-component, achievements-component, community-component, button-component'
      );
      
      components.forEach(component => {
        const computedStyle = window.getComputedStyle(component);
        const backgroundColor = computedStyle.backgroundColor;
        
        // Check if background is transparent or unset
        if (backgroundColor === 'rgba(0, 0, 0, 0)' || 
            backgroundColor === 'transparent' || 
            backgroundColor === 'initial' ||
            backgroundColor === 'inherit') {
          component.style.backgroundColor = 'white';
        }
      });
    });

    // Wait for components to load
    console.log('⏳ Waiting for footer-component to load...');
    await page.waitForSelector('footer-component', { timeout: 10000 });

    // Additional delay for dynamic content
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Define components to capture
    const components = [
      { selector: 'footer-component', name: 'footer' },
      { selector: 'hero-component', name: 'hero' },
      { selector: 'cards-component', name: 'cards' },
      { selector: 'menu-component', name: 'menu' },
      { selector: 'quote-component', name: 'quote' },
      { selector: 'clients-component', name: 'clients' },
      { selector: 'achievements-component', name: 'achievements' },
      { selector: 'community-component', name: 'community' },
      { selector: 'button-component', name: 'button' },
      { selector: 'image-and-text-component', name: 'image-and-text' }
    ];

    const formats = ['png', 'webp'];
    const quality = 90;

    // Capture each component
    for (const component of components) {
      const element = await page.$(component.selector);
      
      if (!element) {
        console.warn(`⚠️  Component ${component.selector} not found, skipping...`);
        continue;
      }

      console.log(`📸 Capturing ${component.name} component...`);

      // Standard capture
      for (const format of formats) {
        const screenshot = await element.screenshot({
          type: format,
          omitBackground: false, // Keep background to capture white
          quality: format === 'png' ? undefined : quality
        });

        const filename = `${component.name}.${format}`;
        
        // Save to both output directories
        await fsPromises.writeFile(path.join(outputDir, filename), screenshot);
        await fsPromises.writeFile(path.join(umbracoOutputDir, filename), screenshot);
        
        console.log(`  ✓ Generated ${filename} (frontend + umbraco)`);
      }
    }

    // Generate metadata
    const files = await fsPromises.readdir(outputDir);
    const metadata = {
      generatedAt: new Date().toISOString(),
      components: components.map(c => c.name),
      totalImages: files.filter(f => f.match(/\.(png|jpg|jpeg|webp)$/)).length,
      formats: [...new Set(files.map(f => f.split('.').pop()).filter(Boolean))],
      directories: [
        'frontend/dist/component-images',
        'UmbracoWebcomponents/wwwroot/component-images'
      ]
    };

    // Save metadata to both locations
    const metadataJson = JSON.stringify(metadata, null, 2);
    await fsPromises.writeFile(path.join(outputDir, 'metadata.json'), metadataJson);
    await fsPromises.writeFile(path.join(umbracoOutputDir, 'metadata.json'), metadataJson);

    console.log(`📋 Generated metadata.json with ${metadata.totalImages} images`);
    console.log(`📁 Images saved to both frontend and Umbraco directories`);

    await browser.close();
    console.log('✅ Image generation completed!');

  } catch (error) {
    console.error('❌ Error during image generation:', error);
    throw error;
  } finally {
    // Step 4: Stop preview server only if we started it
    if (shouldStopServer && previewServer && !previewServer.killed) {
      console.log('🛑 Stopping preview server...');
      previewServer.kill('SIGTERM');
      
      // Wait a moment for graceful shutdown
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('🎉 Image generation process completed!');
  }
}

// Run the image generation
generateImages().catch(console.error);
