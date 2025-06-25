import styles from './MyComponent.scss?inline'; // Importing styles here is optional
import template from './MyComponent.html?raw'; // This is the HTML template for the component
import { createComponent } from '../CreateComponent'; 

// This creates a new custom element named 'my-component' using the provided template and styles
createComponent('my', template, styles); 