const Crawler = require("./core/crawler");
const puppeteer = require("puppeteer");
const utils = require('./utils');
const Browser = require('./core/browser')


async function launch(options) {
    /* 
        returns puppeteer browser object
    */
    const browser = await puppeteer.launch({ headless : false});
    return new Browser(browser);
}

async function getAllHref(page, selector) {
    /*
        TODO: should be removed
        first it waits for the selector to be visible on the page then selects all a tags that 
        match the selector, and stores their href attributes
        
        args:
            page: puppeteer page object
            selector: string
        returns: string[]
    */
    const hrefs = await page.waitForSelector(selector).then(async () => 
        {
            const selected = await page.$$(selector);
            let res = [];
            for(let element of selected) {
                res.push(await element.evaluate(e => e.href));
            }
            return res
        }
    );
    return hrefs
}

module.exports = {getAllHref, launch, Crawler, utils};