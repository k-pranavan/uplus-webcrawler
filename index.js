const puppeteer = require("puppeteer");
const Crawler = require("./crawler");

(async () => {
    /*
        initializes browser and page, scrapes all urls on the page and iterates over them
    */
    const browser = await puppeteer.launch({ headless : false});
    const page = await browser.newPage();

    // specify the selectors the crawler should look for
    const crawler = new Crawler({
        "club": '#react-app > div > div > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > h1',
        "E": '#react-app > div > div > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(4) > div > div:nth-child(2) > div:nth-child(2)' // 'a[href*="@"]'
    });

    await page.goto('https://connectru.ryerson.ca/organizations'); // starting url, should change to be more dynamic

    // get the links to all the clubs
    const clubs = await page.evaluate(() => Array.from(document.querySelectorAll('#org-search-results > ul > div > div > a'), element => element.href));

    for (let i = 0; i < clubs.length; i++) {
        await crawler.crawl(page, clubs[i]);
    };

    console.log(crawler.getStoredAll)

    await browser.close();
})();