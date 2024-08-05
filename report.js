function sortReports(reports) {
    let list = [];
    for (let report in reports){
        list.push([report, reports[report]]);
    }
    const listLen = list.length;
    for (let j = listLen - 1; j > 0; j--){
        for (let i = 0; i < j; i++){
            if (list[i][1] < list[i+1][1]){
                [list[i], list[i+1]] = [list[i+1], list[i]];
            }
        }
    }
    return(list);
}

function printReport(pages) {
    console.log('Report is starting...');
    const sortedList = sortReports(pages);
    for (let item of sortedList) {
        console.log(`Found ${item[1]} internal links to ${item[0]}`);
    }
}

export { sortReports, printReport };

