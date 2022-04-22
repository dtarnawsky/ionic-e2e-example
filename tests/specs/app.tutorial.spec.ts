import { clearIndexedDB, pause, getUrl, restartApp, url } from '../helpers';

import Tutorial from '../pageobjects/tutorial.page';

function randomInt(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

describe('Tutorial', () => {
  beforeEach(async () => {
    await restartApp('/tutorial');
    await clearIndexedDB('_ionicstorage');
    await url('/tutorial');
  });

  it('Should select time', async () => {
    const e = Tutorial.dateTime;
    expect(await e.$).toBeDisplayed();
    
    const hr = randomInt(1,23);
    const mn = randomInt(1,59);

    console.log(`Set time ${hr}:${mn}`);
    // Set the time
    await e.setTime(hr,mn);

    // Get the time
    const value = await e.getDateTime();    

    const d: Date = new Date(value);
    expect(d.getHours()).toEqual(hr);
    expect(d.getMinutes()).toEqual(mn);
  });  

  it('Should select date', async () => {
    const e = Tutorial.dateTime;
    expect(await e.$).toBeDisplayed();

    // Set the date
    const dy = randomInt(1,28);
    const mn = randomInt(1,12);
    const yr = randomInt(2015,2022);
    await e.setDate(dy, mn, yr);

    // Get the date
    const value = await e.getDateTime();

    // Make sure it is the date we set
    const d: Date = new Date(value);    
    expect(d.getFullYear()).toEqual(yr);
    expect(d.getDate()).toEqual(dy);
    expect(d.getMonth() + 1).toEqual(mn);
  
  });


  // it('Should load swiper', async () => {
  //   await expect(await Tutorial.slides.$).toBeDisplayed();
  // });

  // it('Should get to schedule', async () => {
  //   await Tutorial.slides.swipeLeft();
  //   await Tutorial.slides.swipeLeft();
  //   await Tutorial.slides.swipeLeft();

  //   await Tutorial.continue();

  //   await pause(1000);

  //   await expect((await getUrl()).pathname).toBe('/app/tabs/schedule');
  // });

  // it('Should skip to schedule', async () => {
  //   await Tutorial.skip();

  //   await pause(1000);

  //   await expect((await getUrl()).pathname).toBe('/app/tabs/schedule');
  // });
});
