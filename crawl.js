function normalizeURL(urlString){  // sometimes different different urls point to the same page. so we take urls strings to point one single string url
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0,-1);
    }

    return hostPath;
}

module.exports = {
    normalizeURL
}