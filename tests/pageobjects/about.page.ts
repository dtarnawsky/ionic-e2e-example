import { Ionic$, IonicButton, IonicSelect } from '../helpers';
import { IonicCheckBox } from '../helpers/ionic/components/checkbox';

import Page from './page';

class About extends Page {
  get popoverButton() {
    return new IonicButton('ion-buttons > ion-button');
  }
  get headerImage() {
    return Ionic$.$('.about-header');
  }
  get madisonImage() {
    return Ionic$.$('.madison');
  }
  get termsAndConditionsCheckBox() {
    return new IonicCheckBox('ion-checkbox');
  }
  get austinImage() {
    return Ionic$.$('.austin');
  }
  get chicagoImage() {
    return Ionic$.$('.chicago');
  }
  get seattleImage() {
    return Ionic$.$('.seattle');
  }
  get locationSelect() {
    return new IonicSelect('ion-select');
  }
}

export default new About();
