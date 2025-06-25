import styles from './community.scss?inline';
import template from './community.html?raw';
import { createComponent } from '../CreateComponent';

import icon1 from '../../global/images/Icon1.svg'; 
import icon2 from '../../global/images/Icon2.svg'; 
import icon3 from '../../global/images/Icon3.svg'; 

var html = template.replace('{{Icon1}}', icon1)
  .replace('{{Icon2}}', icon2)
  .replace('{{Icon3}}', icon3)



createComponent('community', html, styles);