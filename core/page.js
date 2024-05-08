const { Element } = require("./element");

class Page{
    constructor(page) {
        this.page = page;
    }

    async find(selector, options={timeout: 200}) {
        const elem = await this.page.waitForSelector(selector, options);
        return new Element(elem);
    }

    async goto(url) {
        await this.page.goto(url);
    }

    async waitForSelector(selector, options={timeout: 200}) {
        return await this.page.waitForSelector(selector, options)
    }

    async $$(selector) {
        return await this.page.$$(selector)
    }

    async findByXpath(xpath, options={timeout: 200}) {
        // //*[self::h1 or self::div or self::span or self::a][contains(text(), '@')]
        const elem = await this.waitForSelector(`::-p-xpath(${xpath})`, options);
        return new Element(elem)
    }

    async evaluate(callback) {
        return callback();
    }

    async findAll(selector) {
        /*
            returns all elements on page that match the given css selector
            
            args:
                page: puppeteer page object
                selector: string
            returns: string[]
        */
        const selected = await this.$$(selector);
        let res = []; // array of Element
        for(let elem of selected) {
            res.push(await elem.evaluate(el => el.href));
        }
        return res
    }
}

module.exports = Page;