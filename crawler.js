const ImageCrawler = require("./src");

async function main([_, __, startUrl, definedDepth]){
    const crawler = new ImageCrawler({
        fileName: 'results.json',
        startUrl, 
        definedDepth
    });

    await crawler.init();
}

main(process.argv);