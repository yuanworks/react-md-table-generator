
const puppeteer = require('puppeteer');

const TEST_OPTIONS = {
  SHOW_BROWSER : false,
  SLOW_MO      : 50,
};

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: !TEST_OPTIONS.SHOW_BROWSER, slowMo: TEST_OPTIONS.SHOW_BROWSER && TEST_OPTIONS.SLOW_MO });
  page = await browser.newPage();
});

describe('Main Editor', () => {
  
  test("User can set the first row (table head) to 'Hello!'", async () => {

    page.setViewport({ width: 1200, height: 800 });

    await page.goto('http://localhost:3003/');
    await page.waitForSelector('table.editable td.table-head');

    const tr = await page.$$('table.editable td.table-head');
    await tr[0].click();

    //await page.click('table.editable tr');
    await page.mouse.down({clickCount: 1});
    await page.mouse.down({clickCount: 2});
    await page.mouse.down({clickCount: 3});
    await page.type('table.editable tr', "Hello!");
    //await page.screenshot({ path: 'main.png'});

    const innerHTML = await page.evaluate(el => el.firstChild.innerHTML, tr[0]);
    expect(innerHTML.toString()).toBe('Hello!');

  }, 16000);
});

afterAll(() => {
  browser.close();
});
