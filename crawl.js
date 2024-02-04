const {JSDOM} = require('jsdom');


async function crawlPage(currentURL){
    console.log(`Actively Crawling : ${currentURL}`);

    try{
        const resp = await fetch(currentURL);

        if(resp.status > 399){
            console.log(`Error in Fetch with status code : ${resp.status} on page: ${currentURL}`);
            return;
        }
        console.log(await resp.text());

        const contentType = resp.headers.get("content-type")

        if(!contentType.includes("text/html")){
            console.log(`Non Html Response: ${contentType} on page: ${currentURL}`);
            return;
        }
        
    } catch(err){
        console.log(`Error in Fetch: ${err.message}, On page: ${currentURL}`);
    }
    
}
function normalizeURL(urlString){  // sometimes different different urls point to the same page. so we take urls strings to point one single string url
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0,-1);
    }

    return hostPath;
}

function getUrlsFromHTML(htmlBody, baseURL){
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');

    for(const linkElement of linkElements){

        let url = "";
        if(linkElement.href.slice(0,1) === '/'){
            //relative URL
            url = `${baseURL}${linkElement.href}`;
        } else {
            url = linkElement.href; // absolute URL
        }

        try{
            const urlObj = new URL(url);
            urls.push(url);
        } catch(err){
            console.log(`Error with Absolute URL : ${err.message}`);
        }
    }


    return urls;
}

module.exports = {
    normalizeURL,
    getUrlsFromHTML,
    crawlPage
}