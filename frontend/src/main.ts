import './main.scss'; // Import your SCSS file
import './components/mycomponent/MyComponent.js'; 
import './components/button/button';
import './components/achievements/achievements';
import './components/clients/clients';
import './components/community/community';
import './components/hero/hero';
import './components/imageandtext/imageandtext';
import './components/menu/menu';
import './components/quote/quote';
import './components/cards/cards';

// Import dev tools for development environment
if (import.meta.env.DEV) {
    import('./components/dev-tools/dev-tools.js');
}

import { PWAUtils } from './utils/pwa.js';

// Initialize PWA features
document.addEventListener('DOMContentLoaded', async () => {
    // Register service worker (will check if disabled)
    await PWAUtils.registerServiceWorker();
    
    // Setup install prompt
    PWAUtils.setupInstallPrompt();
    
    // Request notification permission if needed
    if (!PWAUtils.isStandalone()) {
        await PWAUtils.requestNotificationPermission();
    }
    
    // Add dev tools in development
    if (import.meta.env.DEV) {
        const devTools = document.createElement('dev-tools');
        document.body.appendChild(devTools);
    }
    
    console.log('PWA initialized');
});