import styles from './imageAndText.scss?inline';
import template from './imageAndText.html?raw';
import { createComponent } from '../CreateComponent';

import img1 from '../../global/images/img1.svg'; 

var html = template.replace('{{img1}}', img1)

createComponent('imageandtext', html, styles);