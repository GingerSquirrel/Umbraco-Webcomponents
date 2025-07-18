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

import { PWAUtils } from './utils/pwa.js';

// Initialize PWA features
document.addEventListener('DOMContentLoaded', async () => {
    // Register service worker
    await PWAUtils.registerServiceWorker();
    
    // Setup install prompt
    PWAUtils.setupInstallPrompt();
    
    // Request notification permission if needed
    if (!PWAUtils.isStandalone()) {
        await PWAUtils.requestNotificationPermission();
    }
    
    console.log('PWA initialized');
});