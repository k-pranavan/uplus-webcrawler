class Crawler {
    constructor(selectors) {
        /*
            selectors: object<string, string>

            The crawler objects takes in selectors and can scrape given urls with the crawl() method.
            selectors requrie a key value pair, e.x {"Name": <css path>, "Email": <css path>}
        */
        this.stored = []; // not used now, but can be used to save stored values to csv file
        this.selectors = selectors;
    }

    addValue(obj) {
        this.stored.push(obj)
    }

    get getStoredAll() {
        return this.stored
    }

    getStored(key) {
        return this.stored[key]
    }

    async crawl(page, link) {
        /*
            page: page object
            link: string
    
            go to the link provided and scrape the title and email addres of the club
            once data is scraped, return to starting url
        */
        await page.goto(link);

        let data = {} // data will be an object with the keys of the passes selectors
        for (const [key, value] of Object.entries(this.selectors)) {
            try {
                const selector = await page.waitForSelector(value, {timeout: 200});
                if (key == "email") {
                    const content = await selector?.evaluate(el => el.getAttribute("href"));
                    data[key] = content;
                }
                else {
                    const content = await selector?.evaluate(el => el.textContent);
                    data[key] = content;
                }
            } catch {
                data[key] = "n/a";
            }
        };

        this.addValue(data);
        await page.goBack();
    };
}

module.exports = Crawler