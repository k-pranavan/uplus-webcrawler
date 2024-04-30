# **uplus-webcrawler**

A web crawler/scraping package that can be configured to crawl many websites with different layouts. It is built on the Puppeteer library and most of the documentation for Puppeteer will apply to this package. Visit [upluscrawler](https://www.npmjs.com/package/upluscrawler) npm page.

Install the package

```console
  npm i upluscrawler
```

# **Documentation**

## *class* Crawler

The crawler class can be configured to search for different elements on a webpage.

### *stored*
> a list that holds the data scraped by the crawler

### *selectors*
>key value pairs of the desired value, and the css selector of the element on the webpage

```javascript
const crawler = new Crawler({
    "club": '#react-app > div > div > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > h1',
    "email": '#react-app > div > div > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(4) > div > div:nth-child(2) > div:nth-child(2)' // 'a[href*="@"]'
});
```

### *crawl(page, link)*
Used to scrape the website of the given link. Scraped data is automatically stored in the *stored* variable
  
**Parameters**
> page: Puppeteer page object

> link: string - the url of the page to scrape
    
Hi this is a test to see if something works!!!

