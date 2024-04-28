const puppeteer = require("puppeteer");
const Page = require("./page");

class Browser {
    constructor(browser) {
        this.browser = browser;
    }

    async newPage() {
        const page = new Page(await this.browser.newPage());
        return page
    }
}

module.exports = Browser;