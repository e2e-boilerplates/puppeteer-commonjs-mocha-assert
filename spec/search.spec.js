const puppeteer = require("puppeteer");
const assert = require("assert");

let page;
let browser;

describe("Sandbox", () => {
  before(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();

    await page
      .goto("https://xgirma.github.io/sandbox/", { waitUntil: "networkidle0" })
      .catch(() => {});
  });

  after(() => {
    if (!page.isClosed()) {
      browser.close();
    }
  });

  it("should be on google search page", async () => {
    await page.waitFor("h1");
    const title = await page.$eval("h1", el => el.textContent);

    assert.strictEqual(await page.title(), "Sandbox");
    assert.strictEqual(title, "Sandbox");
  });
});
