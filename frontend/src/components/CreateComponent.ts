import { BaseComponent } from './BaseComponent';

export function createComponent(name: string, template: string, styles: string = '') {
    class DynamicComponent extends BaseComponent {
        constructor() {
            super(template, styles);
        }

        connectedCallback() {
            console.log(`${name} added to the page.`);
        }

        disconnectedCallback() {
            console.log(`${name} removed from the page.`);
        }
    }

    customElements.define(`${name}-component`, DynamicComponent);
}