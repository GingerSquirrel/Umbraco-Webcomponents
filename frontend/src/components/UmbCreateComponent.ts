import { UmbBaseComponent } from './UmbBaseComponent';

export function umbCreateComponent(name: string, styles: string = '') {
    class DynamicComponent extends UmbBaseComponent {
        constructor() {
            super(styles);
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