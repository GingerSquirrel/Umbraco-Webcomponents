export const UMB = import.meta.env.VITE_UMB;

export class BaseComponent extends HTMLElement {
    constructor(template: string = '', styles: string = '') {
        //console.log('BaseComponent constructor called');
        //console.log('UMB:', UMB);

        super();
        
        // Add delegatesFocus: true to enable automatic focus delegation
        const shadow = this.attachShadow({ 
            mode: 'open',
            delegatesFocus: true  // This enables focus delegation to focusable elements in shadow DOM
        });
        
        if (UMB) {
            //console.warn('UMB is enabled.');
            template = '';
        } else {
            //console.log('UMB is disabled. Removing any existing content from the component.');
            this.innerHTML = "";
        }

        if(styles !== '' && template !== '') {
            //console.log('Both template and styles are provided. The template will be rendered first, followed by the styles.');
            shadow.innerHTML = (styles ? `<style>${styles}</style>` : '') + template;
        } else if (styles !== '') {
            //console.log('Only styles are provided. The styles will be applied to the shadow DOM.');
            shadow.innerHTML = `<style>${styles}</style>`;
        } else if (template !== '') {
            //console.log('Only template is provided. The template will be rendered in the shadow DOM.');
            shadow.innerHTML = template;
        }
        
        // Move child nodes to shadow DOM
        while (this.childNodes.length > 0) {
            shadow.appendChild(this.childNodes[0]);
        }
        
        // Optional: Add additional focus handling after DOM is ready
        this.setupFocusHandling();
    }
    
    // Optional: Additional focus setup method for complex scenarios
    private setupFocusHandling() {
        // This runs after the shadow DOM is set up
        // Use requestAnimationFrame to ensure DOM is fully rendered
        requestAnimationFrame(() => {
            this.ensureFocusableElements();
        });
    }
    
    // Optional: Ensure there's always a focusable element
    private ensureFocusableElements() {
        const shadow = this.shadowRoot;
        if (!shadow) return;
        
        // Check if there are any focusable elements
        const focusableElements = shadow.querySelectorAll(
            'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        // // If no focusable elements exist, make the first element focusable
        // if (focusableElements.length === 0) {
        //     const firstElement = shadow.querySelector('*:not(style)');
        //     if (firstElement && firstElement.tagName !== 'STYLE') {
        //         (firstElement as HTMLElement).tabIndex = 0;
        //         console.log('Added tabIndex=0 to first element for focus delegation');
        //     }
        // }
    }
}

