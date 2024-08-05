import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test('Test URL Normaliztion ', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
    expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});

test('Test getURLsFromHTML', () => {
    const expectedResult = ['https://blog.boot.dev/'];
    const baseURL = 'https://blog.boot.dev/';
    const htmlBody = `<html>
            <body>
                <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            </body>
        </html>`;
    expect(getURLsFromHTML(htmlBody, baseURL)).toStrictEqual(expectedResult);
});

