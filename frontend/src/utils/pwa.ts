export class PWAUtils {
    private static deferredPrompt: any = null;
    private static isServiceWorkerDisabled = false;

    /**
     * Check if service worker is disabled via localStorage or environment
     */
    static isServiceWorkerDisabledLocally(): boolean {
        // Check localStorage for user preference
        const userDisabled = localStorage.getItem('sw-disabled') === 'true';
        
        // Check development environment flag
        const devDisabled = import.meta.env.VITE_DISABLE_SW === 'true';
        
        // Check class property (runtime toggle)
        return this.isServiceWorkerDisabled || userDisabled || devDisabled;
    }

    /**
     * Toggle service worker disabled state and persist to localStorage
     */
    static async toggleServiceWorker(disabled: boolean): Promise<void> {
        this.isServiceWorkerDisabled = disabled;
        localStorage.setItem('sw-disabled', disabled.toString());
        
        if (disabled) {
            await this.unregisterServiceWorker();
            console.log('🚫 Service Worker disabled locally');
        } else {
            console.log('✅ Service Worker enabled locally');
            // Reload to re-register the service worker
            window.location.reload();
        }
    }

    /**
     * Unregister all service workers
     */
    static async unregisterServiceWorker(): Promise<void> {
        if ('serviceWorker' in navigator) {
            try {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (const registration of registrations) {
                    await registration.unregister();
                    console.log('Service Worker unregistered:', registration);
                }
            } catch (error) {
                console.error('Failed to unregister service workers:', error);
            }
        }
    }

    static async registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
        // Check if service worker is disabled
        if (this.isServiceWorkerDisabledLocally()) {
            console.log('🚫 Service Worker registration skipped (disabled locally)');
            return null;
        }
        if ('serviceWorker' in navigator) {
            try {
                // Determine service worker path based on environment
                const isUmbracoMode = import.meta.env.VITE_UMB === 'true';
                const swPath = isUmbracoMode ? './sw.js' : '/sw.js';
                const swScope = isUmbracoMode ? './' : '/';
                
                // Enhanced registration with better error handling for development
                const registration = await navigator.serviceWorker.register(swPath, {
                    scope: swScope,
                    // Disable cache during development to avoid SSL issues
                    updateViaCache: 'none'
                });
                
                console.log('Service Worker registered successfully:', registration);
                
                // Handle updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                console.log('New service worker available');
                                this.showUpdatePrompt();
                            }
                        });
                    }
                });
                
                return registration;
            } catch (error) {
                console.error('Service Worker registration failed:', error);
                
                // Enhanced SSL error handling
                if (error instanceof Error && (
                    error.message.includes('SSL certificate') || 
                    error.message.includes('certificate')
                )) {
                    console.warn('SSL certificate issue detected. This is common in development.');

                    return null;
                }
                
                // Handle other security errors
                if (typeof error === 'object' && error !== null && 'name' in error && (error as any).name === 'SecurityError') {
                    console.warn('Security error during service worker registration.');

                }
                
                return null;
            }
        }
        return null;
    }


    static setupInstallPrompt(): void {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallButton();
        });

        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            this.hideInstallButton();
        });
    }

    static async promptInstall(): Promise<boolean> {
        if (!this.deferredPrompt) {
            return false;
        }

        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        this.deferredPrompt = null;
        
        return outcome === 'accepted';
    }

    static isStandalone(): boolean {
        return window.matchMedia('(display-mode: standalone)').matches ||
               (window.navigator as any).standalone === true;
    }

    static async requestNotificationPermission(): Promise<NotificationPermission> {
        if ('Notification' in window) {
            return await Notification.requestPermission();
        }
        return 'denied';
    }

    static async showNotification(title: string, options?: NotificationOptions): Promise<void> {
        if ('serviceWorker' in navigator && 'Notification' in window) {
            try {
                const registration = await navigator.serviceWorker.ready;
                await registration.showNotification(title, {
                    icon: '/icons/icon-192x192.png',
                    badge: '/icons/icon-72x72.png',
                    ...options
                });
            } catch (error) {
                console.warn('Failed to show notification:', error);
            }
        }
    }

    private static showUpdatePrompt(): void {
        const updatePrompt = document.createElement('div');
        updatePrompt.id = 'sw-update-prompt';
        updatePrompt.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #2196F3;
                color: white;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 10000;
                max-width: 300px;
            ">
                <div style="margin-bottom: 10px;">
                    <strong>App Update Available</strong>
                </div>
                <div style="margin-bottom: 15px; font-size: 14px;">
                    A new version of the app is available. Refresh to update?
                </div>
                <button id="sw-update-btn" style="
                    background: white;
                    color: #2196F3;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-right: 8px;
                ">Update</button>
                <button id="sw-dismiss-btn" style="
                    background: transparent;
                    color: white;
                    border: 1px solid white;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                ">Later</button>
            </div>
        `;
        
        document.body.appendChild(updatePrompt);
        
        document.getElementById('sw-update-btn')?.addEventListener('click', () => {
            window.location.reload();
        });
        
        document.getElementById('sw-dismiss-btn')?.addEventListener('click', () => {
            updatePrompt.remove();
        });
    }

    private static showInstallButton(): void {
        const installButton = document.createElement('button');
        installButton.textContent = '📱 Install App';
        installButton.id = 'pwa-install-btn';
        installButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            padding: 12px 20px;
            background: var(--Brand-Primary, #4CAF4F);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(76, 175, 79, 0.3);
            transition: all 0.3s ease;
        `;
        
        // Add hover effects
        installButton.addEventListener('mouseenter', () => {
            installButton.style.transform = 'translateY(-2px)';
            installButton.style.boxShadow = '0 6px 16px rgba(76, 175, 79, 0.4)';
        });
        
        installButton.addEventListener('mouseleave', () => {
            installButton.style.transform = 'translateY(0)';
            installButton.style.boxShadow = '0 4px 12px rgba(76, 175, 79, 0.3)';
        });
        
        installButton.addEventListener('click', async () => {
            const accepted = await this.promptInstall();
            if (accepted) {
                this.hideInstallButton();
            }
        });
        
        document.body.appendChild(installButton);
    }

    private static hideInstallButton(): void {
        const button = document.getElementById('pwa-install-btn');
        if (button) {
            button.remove();
        }
    }

    static isDevelopment(): boolean {
        return location.hostname === 'localhost' || 
               location.hostname === '127.0.0.1' || 
               location.hostname.endsWith('.local');
    }

    static async initialize(): Promise<void> {
        console.log('Initializing PWA features...');
        
        this.setupInstallPrompt();
        
        const registration = await this.registerServiceWorker();
        
        if (!registration && this.isDevelopment()) {
            console.warn('Service Worker registration failed in development.');
            console.warn('Consider setting up proper SSL certificates with mkcert.');
        }
        
        if (registration && 'Notification' in window) {
            const permission = await this.requestNotificationPermission();
            console.log('Notification permission:', permission);
        }
    }
}