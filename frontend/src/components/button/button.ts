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