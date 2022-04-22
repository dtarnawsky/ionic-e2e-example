import { pause } from '../../platform';
import { IonicComponent } from './component';

export class IonicDateTime extends IonicComponent {
    constructor(selector: string) {
        super(selector);
    }

    /**
     * Sets the Date of IonDateTime
     * @param  {number} day 1-31
     * @param  {number} month 1-12
     * @param  {number} year eg 2022
     */
    async setDate(day: number, month: number, year: number) {
        const el = await this.$;
        await el.waitForExist({ timeout: 5000 });

        // Click the Month/Year drop down
        const monthYearDrop = await el.shadow$('div.calendar-month-year');
        await monthYearDrop.click();

        // There is a datetime-year class div that is the month / year
        const monthyear = await el.shadow$('div.datetime-year-body');

        // Which has an web component
        const monthYearPickers = await monthyear.$('ion-picker-internal');

        // Which has a column component for months     
        const eMonths = await monthYearPickers.$('ion-picker-column-internal.month-column');

        // Which has a div with data-index of month starting with 0 or data-value of month number
        const eMonth = await eMonths.shadow$(`div[data-value="${month}"]`);

        // Its not visible so we scroll it into view
        await eMonth.scrollIntoView();

        // Then click the month
        await eMonth.click();

        // There is some animation so wait around
        await pause(1000);

        // Select the internal web component for year
        const eYears = await monthYearPickers.$('ion-picker-column-internal.year-column');

        // Select the year
        const eYear = await eYears.shadow$(`div[data-value="${year}"]`);

        // Its not visible so scroll into view
        await eYear.scrollIntoView();

        // Then click the right year
        await eYear.click();

        // There is some animation so wait around
        await pause(1000);

        // Collapse the month year drop down
        await monthYearDrop.click();

        // There is some animation so wait around
        await pause(500);

        // IonDateTime spits out lots of calendar days as buttons. So find the right one                
        const eDay = await el.shadow$(`button[data-day="${day}"][data-month="${month}"][data-year="${year}"]`);

        // Click the day
        await eDay.click();

        // There is some animation so wait around
        await pause(1000);
    }

    
    /**
     * Sets the time in the IonDateTime
     * @param  {number} hour Number of hours 0-23
     * @param  {number} minute Number of minutes 0-59
     */
    async setTime(hour: number, minute: number) {
        const el = await this.$;
        await el.waitForExist({ timeout: 5000 });        

        const ampm = (hour < 12) ? 'am' : 'pm';

        // Click the Time input
        const timeEdit = await el.shadow$('button.time-body');        

        await timeEdit.click();

        // Animates in with a popover
        await pause(1000);

        // Popover is under the root somewhere
        const popover = await browser.$('ion-popover');        

        // picker for am/pm
        const eAmPmPicker = popover.$$('ion-picker-column-internal')[2];        

        const eAmPm = await eAmPmPicker?.shadow$(`div[data-value="${ampm}"]`);        

        // Scroll into view
        await eAmPm?.scrollIntoView();

        // Animates
        await pause(1000);

        // Click the am or pm
        await eAmPm?.click();

        // first picker is for hours
        const eHrPicker = await popover.$('ion-picker-column-internal');        

        // Select the right hour
        const eHour = await eHrPicker.shadow$(`div[data-value="${hour}"]`);        

        // Scroll into view
        await eHour.scrollIntoView();

        // Animates
        await pause(1000);

        // Click the hour
        await eHour.click();

        // Animates
        await pause(1500);

        // second picker is for minutes
        const eMnPicker = popover.$$('ion-picker-column-internal')[1];        

        // Select the right minute
        const eMinute = await eMnPicker?.shadow$(`div[data-value="${minute}"]`);        

        // Scroll into view
        await eMinute?.scrollIntoView();

        // Animates
        await pause(1000);

        // Click the minute
        await eMinute?.click();

        // Animates
        await pause(1500);
    }

    /**
     * Gets the value of IonDateTime (ISO 8601)
     * @returns Promise
     */
    async getDateTime(): Promise<string> {
        const el = await this.$;
        await el.waitForExist({ timeout: 5000 });
        return await el.getValue();
    }
}