import puppeteer from "puppeteer";

export const lastscrp = async (Url) => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  try {
    await page.goto(Url, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#download-button", { timeout: 5000 });
    await page.click("#download-button");

    await page.waitForSelector("a#vd", { timeout: 10000 });
    const finalLink = await page.$eval("a#vd", (el) => el.href);

    return finalLink;
  } catch (err) {
    console.error("❌ Error in lastscrp:", err.message);
    return null;
  } finally {
    await browser.close();
  }
};
