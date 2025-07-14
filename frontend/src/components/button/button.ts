const UMB = import.meta.env.VITE_UMB === 'true';

import styles from './button.scss?inline';
import template from './button.html?raw';
import { BaseComponent } from '../BaseComponent';
import arrowRightIcon from '../../global/images/icon-right.svg?raw'; // Import SVG as raw string

const iconSvgs: Record<string, string> = {
    'right': arrowRightIcon,
    // Add more icons as needed, e.g. 'down': downIcon
};

class ButtonComponent extends BaseComponent {
    static get observedAttributes() {
        return ['label', 'class', 'size', 'icon', 'icon-position', 'href', 'target', 'disabled'];
    }

    constructor() {
        super(template, styles);
        this.setupKeyboardHandling();
        this.updateButtonContent();
    }

      setupKeyboardHandling() {
        // Add keyboard event handling after the component is created
        this.addEventListener('keydown', (event) => {
        // Handle Enter key (keyCode 13 or key 'Enter')
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            this.click(); // Trigger click event
        }
        
        // Handle Space key (keyCode 32 or key ' ')
        if (event.key === ' ' || event.keyCode === 32) {
            event.preventDefault();
            this.click(); // Trigger click event
        }
        });
    }

     updateButtonContent() {
    const anchor = this.shadowRoot?.querySelector('a');
    if (!anchor) return;

    // Handle disabled attribute
    const isDisabled = this.hasAttribute('disabled');
    
    if (isDisabled) {
      // Set disabled attributes and styles
      anchor.setAttribute('aria-disabled', 'true');
      anchor.setAttribute('tabindex', '-1');
      anchor.removeAttribute('href'); // Remove href to prevent navigation
      anchor.style.pointerEvents = 'none';
      anchor.style.cursor = 'not-allowed';
      
      // Prevent all anchor click events when disabled
      anchor.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      };
    } else {
      // Enable the button
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

        // Helper to update label with inline SVG if icon attribute is present
        const updateLabelWithIcon = () => {
            const label = this.getAttribute('label') ?? '';
            const icon = this.getAttribute('icon');
            if (icon && iconSvgs[icon]) {
                anchor.innerHTML = `<span>${label}</span> ${iconSvgs[icon]}`;
                // Optionally add class to the SVG
                const svg = anchor.querySelector('svg');
                if (svg) svg.classList.add('icon-svg');
            } else {
                anchor.textContent = label;
            }
        };

        switch (name) {
            case 'label':
            case 'icon':
                updateLabelWithIcon();
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
                anchor.setAttribute('href', newValue ?? '#');
                break;
            case 'target':
                anchor.setAttribute('target', newValue ?? '_self');
                break;
            case 'disabled':
                if (newValue !== null) {
                    anchor.setAttribute('aria-disabled', 'true');
                    anchor.tabIndex = -1;
                } else {
                    anchor.removeAttribute('aria-disabled');
                    anchor.tabIndex = 0;
                }
                break;
        }
    }

    connectedCallback() {
        const anchor = this.shadowRoot?.querySelector('a');
        if (!anchor) return;

        const label = this.getAttribute('label') ?? '';
        const icon = this.getAttribute('icon');
        if (icon && iconSvgs[icon]) {
            anchor.innerHTML = `<span>${label}</span> ${iconSvgs[icon]}`;
            const svg = anchor.querySelector('svg');
            if (svg) svg.classList.add('icon-svg');
        } else {
            anchor.textContent = label;
        }

        anchor.className = this.getAttribute('class') ?? '';
        anchor.setAttribute('data-size', this.getAttribute('size') ?? '');
        anchor.setAttribute('data-icon', icon ?? '');
        anchor.setAttribute('data-icon-position', this.getAttribute('icon-position') ?? '');
        anchor.setAttribute('href', this.getAttribute('href') ?? '#');
        anchor.setAttribute('target', this.getAttribute('target') ?? '_self');
        if (this.hasAttribute('disabled')) {
            anchor.setAttribute('aria-disabled', 'true');
            anchor.tabIndex = -1;
        } else {
            anchor.removeAttribute('aria-disabled');
            anchor.tabIndex = 0;
        }
    
    }
}

customElements.define('button-component', ButtonComponent);