const UMB = import.meta.env.VITE_UMB === 'true';

import styles from './button.scss?inline';
import template from './button.html?raw';
import { BaseComponent } from '../BaseComponent';
import arrowRightIcon from '../../global/images/icon-right.svg?raw';

const iconSvgs: Record<string, string> = {
    'right': arrowRightIcon,
    // Add more icons as needed
};

class ButtonComponent extends BaseComponent {
    static get observedAttributes() {
        return ['label', 'class', 'size', 'icon', 'icon-position', 'href', 'target', 'disabled'];
    }

    constructor() {
        super(template, styles);
        this.setupKeyboardHandling();
    }

    setupKeyboardHandling() {
        this.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    }

    async loadSvgFromUrl(url: string): Promise<string> {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.text();
            }
        } catch (error) {
            console.warn(`Failed to load SVG from ${url}:`, error);
        }
        // Fallback to image if SVG loading fails
        return `<img src="${url}" alt="icon" class="icon-img">`;
    }

    async updateLabelWithIcon() {
        const anchor = this.shadowRoot?.querySelector('a');
        if (!anchor) return;

        const label = this.getAttribute('label') ?? '';
        const icon = this.getAttribute('icon');

        if (!icon) {
            anchor.textContent = label;
            return;
        }

        let iconMarkup = '';
        
        if (iconSvgs[icon]) {
            // Use predefined SVG
            iconMarkup = iconSvgs[icon];
        } else if (icon.toLowerCase().endsWith('.svg')) {
            // Load SVG from URL
            iconMarkup = await this.loadSvgFromUrl(icon);
        } else {
            // Use icon as URL for image
            iconMarkup = `<img src="${icon}" alt="icon" class="icon-img">`;
        }

        anchor.innerHTML = `<span>${label}</span> ${iconMarkup}`;
        
        // Add CSS class to SVG elements
        const svg = anchor.querySelector('svg');
        if (svg) {
            svg.classList.add('icon-svg');
        }
    }

    updateDisabledState() {
        const anchor = this.shadowRoot?.querySelector('a');
        if (!anchor) return;

        const isDisabled = this.hasAttribute('disabled');
        
        if (isDisabled) {
            anchor.setAttribute('aria-disabled', 'true');
            anchor.setAttribute('tabindex', '-1');
            anchor.removeAttribute('href');
            anchor.style.pointerEvents = 'none';
            anchor.style.cursor = 'not-allowed';
            
            anchor.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                return false;
            };
        } else {
            anchor.removeAttribute('aria-disabled');
            anchor.setAttribute('tabindex', '0');
            anchor.setAttribute('href', this.getAttribute('href') || '#');
            anchor.style.pointerEvents = '';
            anchor.style.cursor = '';
            anchor.onclick = null;
        }
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        const anchor = this.shadowRoot?.querySelector('a');
        if (!anchor) return;

        switch (name) {
            case 'label':
            case 'icon':
                this.updateLabelWithIcon();
                break;
            case 'class':
                anchor.className = newValue ?? '';
                break;
            case 'size':
                anchor.setAttribute('data-size', newValue ?? '');
                break;
            case 'icon-position':
                anchor.setAttribute('data-icon-position', newValue ?? '');
                break;
            case 'href':
                if (!this.hasAttribute('disabled')) {
                    anchor.setAttribute('href', newValue ?? '#');
                }
                break;
            case 'target':
                anchor.setAttribute('target', newValue ?? '_self');
                break;
            case 'disabled':
                this.updateDisabledState();
                break;
        }
    }

    async connectedCallback() {
        const anchor = this.shadowRoot?.querySelector('a');
        if (!anchor) return;

        // Initialize all attributes
        await this.updateLabelWithIcon();
        
        anchor.className = this.getAttribute('class') ?? '';
        anchor.setAttribute('data-size', this.getAttribute('size') ?? '');
        anchor.setAttribute('data-icon-position', this.getAttribute('icon-position') ?? '');
        anchor.setAttribute('target', this.getAttribute('target') ?? '_self');
        
        this.updateDisabledState();
    }
}

customElements.define('button-component', ButtonComponent);