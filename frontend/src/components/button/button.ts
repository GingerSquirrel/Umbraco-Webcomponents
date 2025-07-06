const UMB = import.meta.env.VITE_UMB === 'true';

import styles from './button.scss?inline';
import template from './button.html?raw';
import { BaseComponent } from '../BaseComponent';

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

        switch (name) {
            case 'label':
                anchor.textContent = newValue ?? '';
                break;
            case 'class':
                anchor.className = newValue ?? '';
                break;
            case 'size':
                anchor.setAttribute('data-size', newValue ?? '');
                break;
            case 'icon':
                anchor.setAttribute('data-icon', newValue ?? '');
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

        anchor.textContent = this.getAttribute('label') ?? '';
        anchor.className = this.getAttribute('class') ?? '';
        anchor.setAttribute('data-size', this.getAttribute('size') ?? '');
        anchor.setAttribute('data-icon', this.getAttribute('icon') ?? '');
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