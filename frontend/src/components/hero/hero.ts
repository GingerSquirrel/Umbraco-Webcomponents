
const UMB = import.meta.env.VITE_UMB === 'true';

import styles from './hero.scss?inline';
import template from './hero.html?raw';
import { createComponent } from '../CreateComponent';
import { umbCreateComponent } from '../UmbCreateComponent';

import heroImgUrl from '../../global/images/illustration.svg'; // Importing the logo image

var html = template.replace('{{heroImgUrl}}', heroImgUrl);

if(!UMB){
    createComponent('hero', html, styles);
}

umbCreateComponent('umb-hero', styles);