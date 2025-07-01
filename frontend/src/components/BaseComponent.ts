export class BaseComponent extends HTMLElement {
    constructor(template: string, styles: string = '') {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
            while (this.childNodes.length > 0) {
                shadow.appendChild(this.childNodes[0]);
            }

        if (styles) {
            const style = document.createElement('style');
            style.textContent = styles;
            shadow.appendChild(style);
        }

        const container = document.createElement('div');
        container.innerHTML = template;
        shadow.appendChild(container);
    }
}