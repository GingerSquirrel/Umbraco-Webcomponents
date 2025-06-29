import styles from './imageandtext.scss?inline';
import template from './imageandtext.html?raw';
import { createComponent } from '../CreateComponent';

import img1 from '../../global/images/img1.svg'; 

var html = template.replace('{{img1}}', img1)

createComponent('imageandtext', html, styles);