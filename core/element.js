class Element {
    constructor(node) {
        this.node = node;
    }

    get text() {
        return (async () => {
            return await this.node?.evaluate(el => el.textContent);
        })();
    }

    get href() {
        return (async () => {
            return await this.node?.evaluate(el => el.href);
        })();
    }
}

module.exports = {Element}