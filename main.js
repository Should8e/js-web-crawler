import { argv } from 'node:process';
import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main() {
    if (argv.length !== 3) {
        throw new Error('You need to pass one parameter BASE_URL');
    }
    const URL = argv[2];
    console.log('Collecting data...');
    const crawlResaults = await crawlPage(URL);
    printReport(crawlResaults);
}

main()

