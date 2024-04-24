const Crawler = require("./crawler");
const puppeteer = require("puppeteer");

async function launch(options) {
    /* 
        returns puppeteer browser object
    */
    return await puppeteer.launch({ headless : false});
}

async function getAllHref(page, selector) {
    /*
        Selects all a tags that match the selector, and stores their href attributes
        
        args:
            page: puppeteer page object
            selector: string
        returns: string[]
    */
    const selected = await page.$$(selector);
    let res = [];
    for(let element of selected) {
        res.push(await element.evaluate(e => e.href));
    }
    return res
}

module.exports = {getAllHref, launch, Crawler};