const cheerio = require('cheerio');
const fs = require('fs');

class ImageCrawler {
	constructor(props) {
		this.imageCount = 0;
		this.fileName = props.fileName;
		this.startUrl = props.startUrl;
		this.definedDepth = props.definedDepth;

		this.stream = fs.createWriteStream(this.fileName);
		this.stream.write('{"results": [\n');
	}

	async init() {
		try {
			await this.crawlPage(this.startUrl, this.definedDepth, true);
		} catch (error) {
			console.error('Error during initialization:', error);
		} finally {
			this.closeStream();
		}
	}

	async crawlPage(url, depth, isFirst) {
		try {
			const response = await fetch(url);
			const html = await response.text();
			const $ = cheerio.load(html);

			$('img').each((_, element) => {
				const imageUrl = $(element).attr('src');
				if (imageUrl) {
					if (!isFirst) {
						this.stream.write(',\n');
					}
					const image = { imageUrl, sourceUrl: url, depth };
					this.stream.write(JSON.stringify(image));
					isFirst = false;
					this.imageCount++;
				}
			});

			if (depth > 0) {
				const links = $('a[href^="http"]').toArray();
				await Promise.all(
					links.map(async (element) => {
						const link = $(element).attr('href');
						await this.crawlPage(link, depth - 1, isFirst);
					})
				);
			}
		} catch (error) {
			console.error(`Error while crawling URL: ${url}`);
			console.error(error.message);
		}
	}

	closeStream() {
		try {
			this.stream.write('\n]}');
			this.stream.end();
			console.log(`Total images written: ${this.imageCount}`);
		} catch (error) {
			console.error('Error while closing stream:', error);
		}
	}
}

module.exports = ImageCrawler;