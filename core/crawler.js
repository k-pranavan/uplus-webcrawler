class Crawler {
    constructor() {
        this.visited = [];
        this.hrefs = [];
    }

    async parse(page, callback, depth=3, default_val=undefined) {
        // call the callback
        // read all the hrefs on the page and visited each one

        // if depth is reached and nothing is found return default_val to prevent crawler from wandering to far
        if (depth == 0) {
            return default_val;
        }

        const result = callback();
        if (result != default_val) {
            return result;
        }

        const gatheredHrefs = await page.findAll("a"); // all elements are of tpye Element

        this.hrefs.push(...gatheredHrefs);

        let found = default_val; // the default val is what is retured if nothing is found, set to undefined recommended to be "n/a"
        for (let i = 0; i < this.hrefs.length; i++) {
            let current_href = await this.hrefs[i].href
            if (this.visited.includes(current_href)) {
                continue
            }
            this.visited.push(current_href);
            await page.goto(current_href);
            found = await this.parse2(page, callback, depth - 1); // return the call back function
        }
        return found;
    }
}

module.exports = Crawler