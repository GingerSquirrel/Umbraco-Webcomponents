import styles from './cards.scss?inline';
import template from './cards.html?raw';
import { createComponent } from '../CreateComponent';
import cardImage1 from '../../global/images/lady_on_laptop.jpg';

var html = template.replace('{{cardImage1}}', cardImage1)

createComponent('cards', html, styles);