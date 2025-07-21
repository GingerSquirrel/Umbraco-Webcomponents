import styles from './image-and-text.scss?inline';
import template from './image-and-text.html?raw';
import { createComponent } from '../CreateComponent';

import img1 from '../../global/images/img1.svg'; 

var html = template.replace('{{img1}}', img1)

createComponent('image-and-text', html, styles);
