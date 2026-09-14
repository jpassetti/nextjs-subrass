const defaultUrls = [
 "https://subrass.syr.edu/",
 "https://subrass.syr.edu/concerts",
 "https://subrass.syr.edu/ensembles",
 "https://subrass.syr.edu/about",
 "https://subrass.syr.edu/contact",
];

const inputUrls = process.argv.slice(2);
const urls = inputUrls.length ? inputUrls : defaultUrls;

function encode(url) {
 return encodeURIComponent(url);
}

urls.forEach((url) => {
 console.log(`Page: ${url}`);
 console.log(`- Rich Results Test: https://search.google.com/test/rich-results?url=${encode(url)}`);
 console.log(`- Schema Markup Validator: https://validator.schema.org/#url=${encode(url)}`);
 console.log(`- Open Graph Debugger: https://www.opengraph.xyz/url/${encode(url)}`);
 console.log("");
});

console.log("Tip: pass event/member/venue URLs to validate specific detail pages.");
