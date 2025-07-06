export class UmbBaseComponent extends HTMLElement {
    constructor(styles: string = '') {
        super();
        const shadow = this.attachShadow({ mode: 'open' });


        if (styles) {
            const style = document.createElement('style');
            style.textContent = styles;
            shadow.appendChild(style);
        }


        while (this.childNodes.length > 0) {
            shadow.appendChild(this.childNodes[0]);
        }




    }
}