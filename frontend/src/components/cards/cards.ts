import styles from './cards.scss?inline';
import template from './cards.html?raw';
import { createComponent } from '../CreateComponent';
import cardImage1 from '../../global/images/lady_on_laptop.jpg';
import cardImage2 from '../../global/images/charts_on_laptop.jpg';
import cardImage3 from '../../global/images/laptop_on_desk.jpg';

var html = template.replace('{{cardImage1}}', cardImage1)
.replace('{{cardImage2}}', cardImage2)
.replace('{{cardImage3}}', cardImage3);

createComponent('cards', html, styles);