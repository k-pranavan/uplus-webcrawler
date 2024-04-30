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

    async close() {
        await this.browser.close();
    }
}

module.exports = Browser;