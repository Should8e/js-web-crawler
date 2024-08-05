import { JSDOM } from 'jsdom';
import { URL } from 'url';

function normalizeURL(url) {
    const myURL = new URL(url);
    const normalizedURL = `${myURL.hostname}${myURL.pathname}`;
    return normalizedURL.replace(/\/+$/, "");
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody, {url: baseURL} );
    const urls = dom.window.document.querySelectorAll('a');
    const hrefValues = Array.from(urls)
        .map(url => url.getAttribute('href'))
        .filter(href => href)
        .map(href => new URL(href, baseURL).href);
    return hrefValues;
}

async function getHTML(URL) {
    try {
        const responce = await fetch(URL);
        const contentType = responce.headers.get('Content-Type');
        if (!responce.ok) {
            throw new Error(`HTTP error! Status code: ${responce.status}`);
        }
        if (!contentType.startsWith(`text/html`)){
            throw new Error(`Error: unexpected content type: ${contentType}`);
        }
        const textHTML = await responce.text();
        // console.log('Got HTML');
        return textHTML;
    } catch (error) {
        // console.log('Something went wrong:', error.message);
    }
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}){
    if (!currentURL.includes(baseURL)) {
    //    console.log(`Not a part of base: ${currentURL} dosn't contain ${baseURL}`);
       return pages;
    }
    
    const normURL = normalizeURL(currentURL);
    if (pages[normURL]) {
        pages[normURL]++;
        // console.log(`Found ${normURL} in the pages. Number is ${pages[normURL]}`)
        return pages;
    } else {
        pages[normURL] = 1;
    }

    const HTMLBody = await getHTML(currentURL);
    const URLs = getURLsFromHTML(HTMLBody, baseURL);
    for (let URL of URLs) {
        await crawlPage(baseURL, URL, pages);
    }
    return pages;
}

export { normalizeURL, getURLsFromHTML, crawlPage };

