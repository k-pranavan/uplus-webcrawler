# **uplus-webcrawler**

A web crawler/scraping script that can be configured to crawl many websites with different layouts.

Install the dependancies

```console
  npm install
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
    


