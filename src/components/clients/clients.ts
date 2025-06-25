import styles from './clients.scss?inline';
import template from './clients.html?raw';
import { createComponent } from '../CreateComponent';

import client1 from '../../global/images/logo1.svg'; // Importing the logo image
import client2 from '../../global/images/logo2.svg'; // Importing the logo image
import client3 from '../../global/images/logo3.svg'; // Importing the logo image
import client4 from '../../global/images/logo4.svg'; // Importing the logo image
import client5 from '../../global/images/logo5.svg'; // Importing the logo image
import client6 from '../../global/images/logo6.svg'; // Importing the logo image
import client7 from '../../global/images/logo7.svg'; // Importing the logo image

var html = template.replace('{{client1}}', client1)
  .replace('{{client2}}', client2)
  .replace('{{client3}}', client3)
  .replace('{{client4}}', client4)
  .replace('{{client5}}', client5)
  .replace('{{client6}}', client6)
  .replace('{{client7}}', client7);

createComponent('clients', html, styles);