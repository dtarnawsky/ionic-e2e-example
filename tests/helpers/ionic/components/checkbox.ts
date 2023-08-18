import { IonicComponent } from './component';
import { Ionic$ } from '..';
import { ElementActionOptions } from '../..';

export class IonicCheckBox extends IonicComponent {
  constructor(selector: string) {
    super(selector);
  }

  async setValue(
    value: boolean,
    { visibilityTimeout = 5000 }: ElementActionOptions = {}
  ) {
    const el = await Ionic$.$(this.selector as string);
    await el.waitForDisplayed({ timeout: visibilityTimeout });
    const currentValue = await el.getProperty('checked');
    if (currentValue != value) {
      await el.click();
    }
  }

  async getValue({ visibilityTimeout = 5000 }: ElementActionOptions = {}) {
    const el = await Ionic$.$(this.selector as string);
    await el.waitForDisplayed({ timeout: visibilityTimeout });
    return await el.getProperty('checked');
    const ionTags = ['ion-checkbox'];
    if (ionTags.indexOf(await el.getTagName()) >= 0) {
      const input = await el.$('input.aux-input');
      return input.getValue();
    } else {
      return el.getValue();
    }
  }
}
