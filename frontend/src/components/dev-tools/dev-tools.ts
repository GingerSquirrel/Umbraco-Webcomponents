import { PWAUtils } from '../../utils/pwa.js';

class DevTools extends HTMLElement {
    private isOpen = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    private render() {
        if (!this.shadowRoot) return;

        const isSwDisabled = PWAUtils.isServiceWorkerDisabledLocally();
        const isDevelopment = import.meta.env.DEV;

        // Only show in development mode
        if (!isDevelopment) {
            this.style.display = 'none';
            return;
        }

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 14px;
                }

                .dev-tools {
                    background: #2d2d2d;
                    color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                    overflow: hidden;
                    min-width: 250px;
                    transition: all 0.3s ease;
                }

                .dev-tools__header {
                    background: #1e1e1e;
                    padding: 12px 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    user-select: none;
                }

                .dev-tools__title {
                    font-weight: 600;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .dev-tools__toggle {
                    background: none;
                    border: none;
                    color: #ffffff;
                    cursor: pointer;
                    font-size: 16px;
                    transition: transform 0.3s ease;
                }

                .dev-tools__toggle.open {
                    transform: rotate(180deg);
                }

                .dev-tools__content {
                    padding: ${this.isOpen ? '16px' : '0 16px'};
                    border-top: ${this.isOpen ? '1px solid #404040' : 'none'};
                    max-height: ${this.isOpen ? '200px' : '0'};
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .dev-tools__section {
                    margin-bottom: 16px;
                }

                .dev-tools__section:last-child {
                    margin-bottom: 0;
                }

                .dev-tools__label {
                    display: block;
                    font-weight: 500;
                    margin-bottom: 8px;
                    color: #cccccc;
                }

                .dev-tools__control {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .toggle-switch {
                    position: relative;
                    width: 40px;
                    height: 20px;
                    background: #404040;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: background 0.3s ease;
                    display: inline-block;
                    vertical-align: middle;
                }

                .toggle-switch.active {
                    background: #007bff;
                }

                .toggle-switch__slider {
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 16px;
                    height: 16px;
                    background: white;
                    border-radius: 50%;
                    transition: transform 0.3s ease;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
                }

                .toggle-switch.active .toggle-switch__slider {
                    transform: translateX(20px);
                }

                .dev-tools__status {
                    font-size: 12px;
                    color: #999999;
                    margin-left: auto;
                }

                .dev-tools__status.disabled {
                    color: #ff6b6b;
                }

                .dev-tools__status.enabled {
                    color: #51cf66;
                }

                .dev-tools__button {
                    background: #404040;
                    border: none;
                    color: white;
                    padding: 6px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    transition: background 0.2s ease;
                }

                .dev-tools__button:hover {
                    background: #505050;
                }

                .dev-tools__button:active {
                    background: #303030;
                }
            </style>

            <div class="dev-tools">
                <div class="dev-tools__header" data-action="toggle">
                    <span class="dev-tools__title">Dev Tools</span>
                    <button class="dev-tools__toggle ${this.isOpen ? 'open' : ''}" type="button">
                        ▼
                    </button>
                </div>
                <div class="dev-tools__content">
                    <div class="dev-tools__section">
                        <label class="dev-tools__label">Service Worker</label>
                        <div class="dev-tools__control">
                            <div class="toggle-switch ${!isSwDisabled ? 'active' : ''}" data-action="toggle-sw">
                                <div class="toggle-switch__slider"></div>
                            </div>
                            <span class="dev-tools__status ${isSwDisabled ? 'disabled' : 'enabled'}">
                                ${isSwDisabled ? 'Disabled' : 'Enabled'}
                            </span>
                        </div>
                    </div>
                    <div class="dev-tools__section">
                        <button class="dev-tools__button" data-action="clear-cache">
                            Clear Cache
                        </button>
                        <button class="dev-tools__button" data-action="reload">
                            Hard Reload
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    private addEventListeners() {
        if (!this.shadowRoot) return;

        this.shadowRoot.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const action = target.closest('[data-action]')?.getAttribute('data-action');

            switch (action) {
                case 'toggle':
                    this.togglePanel();
                    break;
                case 'toggle-sw':
                    this.toggleServiceWorker();
                    break;
                case 'clear-cache':
                    this.clearCache();
                    break;
                case 'reload':
                    this.hardReload();
                    break;
            }
        });
    }

    private togglePanel() {
        this.isOpen = !this.isOpen;
        this.render();
    }

    private async toggleServiceWorker() {
        const isDisabled = PWAUtils.isServiceWorkerDisabledLocally();
        
        try {
            await PWAUtils.toggleServiceWorker(!isDisabled);
            // Re-render to update the toggle state
            this.render();
        } catch (error) {
            console.error('Failed to toggle service worker:', error);
        }
    }

    private async clearCache() {
        if ('caches' in window) {
            try {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(name => caches.delete(name)));
                console.log('🗑️ All caches cleared');
                alert('Cache cleared successfully!');
            } catch (error) {
                console.error('Failed to clear cache:', error);
                alert('Failed to clear cache');
            }
        }
    }

    private hardReload() {
        window.location.reload();
    }
}

customElements.define('dev-tools', DevTools);

export { DevTools };
