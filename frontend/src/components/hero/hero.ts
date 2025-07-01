import styles from './hero.scss?inline';
import template from './hero.html?raw';
import { createComponent } from '../CreateComponent';

import heroImgUrl from '../../global/images/illustration.svg'; // Importing the logo image

var html = template.replace('{{heroImgUrl}}', heroImgUrl);

createComponent('hero', html, styles);