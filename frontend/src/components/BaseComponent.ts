export class BaseComponent extends HTMLElement {
    constructor(template: string = '', styles: string = '') {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = (styles ? `<style>${styles}</style>` : '') + template;
        while (this.childNodes.length > 0) {
            shadow.appendChild(this.childNodes[0]);
        }
    }
}