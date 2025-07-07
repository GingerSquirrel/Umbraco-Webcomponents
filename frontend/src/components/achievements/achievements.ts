import styles from './achievements.scss?inline';
import template from './achievements.html?raw';
import { createComponent } from '../CreateComponent';

import achievement1 from '../../global/images/icon-green1.svg'; 
import achievement2 from '../../global/images/icon-green2.svg'; 
import achievement3 from '../../global/images/icon-green3.svg'; 
import achievement4 from '../../global/images/icon-green4.svg'; 

var html = template.replace('{{achievement1}}', achievement1)
  .replace('{{achievement2}}', achievement2)
  .replace('{{achievement3}}', achievement3)
  .replace('{{achievement4}}', achievement4);


createComponent('achievements', html, styles);
