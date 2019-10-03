import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const puppeteer = require('puppeteer');

const TEST_OPTIONS = {
  Headless: false,
};

describe('Table', () => {
  
  test('app loads correctly', async () => {
    const browser = await puppeteer.launch({ headless: TEST_OPTIONS.Headless, slowMo: 50 });
    const page = await browser.newPage();

    page.setViewport({ width: 1200, height: 800 });

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('table.editable');

    const th = await page.$$('table.editable th');
    await th[1].click();

    //await page.click('table.editable tr');
    await page.mouse.down({clickCount: 1});
    await page.mouse.down({clickCount: 2});
    await page.mouse.down({clickCount: 3});
    await page.type('table.editable tr', "Hello!");
    //await page.screenshot({ path: 'main.png'});

    const innerHTML = await page.evaluate(el => el.firstChild.innerHTML, th[1]);
    expect(innerHTML.toString()).toBe('Hello!');

    browser.close();
  }, 16000);

});
