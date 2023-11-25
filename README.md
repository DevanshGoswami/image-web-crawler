## Web Crawler CLI
This command-line tool, developed in Node.js/Python/TypeScript, serves as a web crawler, capable of scanning webpages for images and exploring linked pages up to a specified depth.

# Usage
`node crawler.js <start_url: string> <depth: number>`

The crawler starts at the given URL (start_url) and navigates through the webpage, extracting images. It continues to explore linked pages within the depth specified. For instance, with depth=3, the crawler explores pages up to 3 levels deep from the source URL. Setting depth=0 limits exploration to only the initial page.

# Output:
The crawler saves results in results.json, following this structure:
``` json
{
  "results": [
    {
      "imageUrl": "string",
      "sourceUrl": "string", // the page URL where this image was found
      "depth": "number" // the depth of the source page where this image was found
    }
  ]
}
