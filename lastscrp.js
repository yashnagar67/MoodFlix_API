const puppeteer = require("puppeteer");

const lastscrp = async (Url) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    await page.goto(Url, { waitUntil: "domcontentloaded" });

    await page.waitForSelector("#download-button", { timeout: 5000 });
    await page.click("#download-button");

    await page.waitForSelector("a#vd", { timeout: 10000 });
    const finalLink = await page.$eval("a#vd", (el) => el.href);

    console.log("🎯 Final Download Link:", finalLink);
    return finalLink;
  } catch (err) {
    console.log("❌ Error in lastscrp:", err.message);
    return null;
  } finally {
    await browser.close();
  }
};

module.exports = { lastscrp };
