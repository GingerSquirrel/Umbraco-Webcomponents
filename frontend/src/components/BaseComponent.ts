export const UMB = import.meta.env.VITE_UMB === 'true';
export class BaseComponent extends HTMLElement {
    constructor(template: string = '', styles: string = '') {
        console.log('BaseComponent constructor called');
        console.log('UMB:', UMB);

        super();
        const shadow = this.attachShadow({ mode: 'open' });
        if (UMB) {
            console.warn('UMB is enabled.');
            template = '';
        }else{
            console.log('UMB is disabled. Removing any existing content from the component.');
            this.innerHTML = "";
        }

        if(styles !== '' && template !== '') {
            console.log('Both template and styles are provided. The template will be rendered first, followed by the styles.');
            shadow.innerHTML = (styles ? `<style>${styles}</style>` : '') + template;
        }else if (styles !== '') {
            console.log('Only styles are provided. The styles will be applied to the shadow DOM.');
            shadow.innerHTML = `<style>${styles}</style>`;
        }
        else if (template !== '') {
            console.log('Only template is provided. The template will be rendered in the shadow DOM.');
            shadow.innerHTML = template;
        }
        
        while (this.childNodes.length > 0) {
            shadow.appendChild(this.childNodes[0]);
        }
    }
}

