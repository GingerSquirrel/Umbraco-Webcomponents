import styles from './menu.scss?inline';
import template from './menu.html?raw';
import { createComponent } from '../CreateComponent';
import { umbCreateComponent } from '../UmbCreateComponent';

import logoUrl from '../../global/images/logo.svg'; // Importing the logo image

var html = template.replace('{{logo}}', logoUrl);

createComponent('menu', html, styles);
umbCreateComponent('umb-menu', styles);