const ObjectsToCsv = require('objects-to-csv');
const { findAll } = require("../utils/index");

class Crawler {
    constructor(selectors) {
        /*
            selectors: object<string, string>

            The crawler objects takes in selectors and can scrape given urls with the crawl() method.
            selectors requrie a key value pair, e.x {"Name": <css path>, "Email": <css path>}
        */
        this.stored = []; // not used now, but can be used to save stored values to csv file
        this.selectors = selectors;
        this.visited = [];
        this.hrefs = [];
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

    async parse(page, callback) {
        // get all the hrefs on the page
        const gatheredHrefs = await page.page.evaluate(() => {
            let links = [];
            let elements2 = document.querySelectorAll('a');
            for (let element2 of elements2)
                links.push(element2.href);
            return links.filter(el => el.includes("contact"));
        });
        // add them to queue, the queue holds the links to vist next
        this.hrefs.push(...gatheredHrefs);

        let found = "n/a";
        for (let i = 0; i < this.hrefs.length; i++) {
            if (this.visited.includes(this.hrefs[i])) {
                continue
            }
            this.visited.push(this.hrefs[i]);
            await page.goto(this.hrefs[i]);
            found = await callback(); // return the call back function
        }
        return found;
    }

    async saveAsCsv(path) {
        /*
            saves the stored data in the this.stored attribute to a csv file of the given name

            args:
                path: string
            returns:
                none
        */
        const csv = new ObjectsToCsv(this.stored);

        await csv.toDisk(path);
    }
}

module.exports = Crawler