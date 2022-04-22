import { IonicButton, IonicSlides } from '../helpers';
import { IonicDateTime } from '../helpers/ionic/components/datetime';
import Page from './page';

class Tutorial extends Page {
  get slides() {
    return new IonicSlides('swiper');
  }
  get skipButton() {
    return IonicButton.withTitle('Skip');
  }
  get continueButton() {
    return IonicButton.withTitle('Continue');
  }

  get dateTime() {
    return new IonicDateTime('ion-datetime');
  }

  async swipeLeft() {
    return this.slides.swipeLeft();
  }

  async swipeRight() {
    return this.slides.swipeRight();
  }

  async skip() {
    return this.skipButton.tap();
  }

  async continue() {
    return this.continueButton.tap();
  }
}

export default new Tutorial();
