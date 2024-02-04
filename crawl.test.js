const {normalizeURL, getUrlsFromHTML} = require('./crawl.js');
const {test, expect } = require('@jest/globals');

test('normalizeURL strip protocol' , ()=> {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);

});

test('normalizeURL strip trailing slash' , ()=> {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);

});

test('normalizeURL Capitals' , ()=> {
    const input = 'https://blog.Boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);

});

test('getURLsFromHTML absolute URL' , ()=> {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/">
            Boot.dev Blog
            </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://blog.boot.dev"; 
    const actual = getUrlsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/"];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative URL' , ()=> {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
            Boot.dev Blog
            </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://blog.boot.dev"; 
    const actual = getUrlsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML multiple URL' , ()=> {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path1/">
            Boot.dev Blog
            </a>

            <a href="https://blog.boot.dev/path2/">
            Boot.dev Blog
            </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://blog.boot.dev"; 
    const actual = getUrlsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"];
    expect(actual).toEqual(expected);
});


test('getURLsFromHTML Invlaid URL' , ()=> {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="Invalid">
            Boot.dev Blog
            </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://blog.boot.dev"; 
    const actual = getUrlsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
});
