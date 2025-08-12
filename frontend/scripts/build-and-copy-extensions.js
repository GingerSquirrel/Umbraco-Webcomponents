import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const UMBRACO_PROJECT_PATH = join(__dirname, '../../UmbracoWebcomponents');
const FRONTEND_EXTENSIONS_PATH = join(__dirname, '../src/umbraco-extensions');

function copyDirectory(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  const entries = readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

function copyExtensionToUmbraco(extensionName) {
  const extensionPath = join(FRONTEND_EXTENSIONS_PATH, extensionName);
  const distPath = join(extensionPath, 'dist');
  const manifestPath = join(extensionPath, 'umbraco-package.json');
  
  if (!existsSync(distPath)) {
    console.error(`❌ Build output not found: ${distPath}`);
    console.log('Run "npm run build" first in the extension directory');
    return;
  }

  const umbracoPluginPath = join(UMBRACO_PROJECT_PATH, 'App_Plugins', extensionName);
  const umbracoDistPath = join(umbracoPluginPath, 'dist');

  console.log(`📦 Copying ${extensionName} to Umbraco...`);

  // Copy dist files
  copyDirectory(distPath, umbracoDistPath);
  console.log(`✅ Copied dist files to ${umbracoDistPath}`);

  // Copy manifest
  if (existsSync(manifestPath)) {
    const manifestDestPath = join(umbracoPluginPath, 'umbraco-package.json');
    copyFileSync(manifestPath, manifestDestPath);
    console.log(`✅ Copied manifest to ${manifestDestPath}`);
  }

  console.log(`🎉 Extension ${extensionName} copied successfully!`);
}

// Get extension name from command line argument
const extensionName = process.argv[2];

if (!extensionName) {
  console.error('❌ Please provide an extension name');
  console.log('Usage: node copy-to-umbraco.js <extension-name>');
  process.exit(1);
}

copyExtensionToUmbraco(extensionName);