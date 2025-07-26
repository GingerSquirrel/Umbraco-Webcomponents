import styles from './footer.scss?inline';
import template from './footer.html?raw';
import { createComponent } from '../CreateComponent';

import logo from '../../global/images/logo_dark.svg'; 
import insta from '../../global/images/insta.svg';
import twitter from '../../global/images/twitter.svg';
import dribble from '../../global/images/dribble.svg';
import youtube from '../../global/images/youtube.svg';
import send from '../../global/images/send.svg';



var html = template.replace('{{logo}}', logo)
.replace('{{insta}}', insta)
.replace('{{twitter}}', twitter)
.replace('{{dribble}}', dribble)
.replace('{{youtube}}', youtube)
.replace('{{send}}', send);

createComponent('footer', html, styles);
