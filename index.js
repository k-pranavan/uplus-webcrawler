const Crawler = require("./core/crawler");
const puppeteer = require("puppeteer");
const utils = require('./utils');
const Browser = require('./core/browser')


async function launch(options={}) {
    /* 
        returns a puppeteer browser object wrapped in a custom Browser class
    */
    const browser = await puppeteer.launch(options);
    return new Browser(browser);
}

module.exports = {launch, Crawler, utils};