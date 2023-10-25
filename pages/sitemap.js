import { getAllMusicians, getAllConcertSlugs, getAllEnsembleSlugs } from '../lib/api';
import fs from 'fs';
import path from 'path';

const EXTERNAL_DATA_URL = 'https://subrass.syr.edu';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${posts.map(({ path, lastmod, changefreq }) => {
        // Extract the date part (YYYY-MM-DD) from lastmod
        const datePart = lastmod ? lastmod.split('T')[0] : '';
        return `
        <url>
            <loc>${`${EXTERNAL_DATA_URL}${path}`}</loc>
            ${lastmod ? `<lastmod>${datePart}</lastmod>` : ''}
            ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}
        </url>
        `;
    }).join('')}
  </urlset>
  `;
}


  export async function getStaticProps() {
    let paths = [
      { path: "" },
      { path: "/about" },
      { path: "/concerts" },
      { path: "/contact" }
    ];

    // Fetching and adding musician paths
    const musicians = await getAllMusicians();
    const musicianPaths = musicians.map(musician => ({ 
      path: `/about/musicians/${musician.node.slug}` ,
      lastmod: musician.node.modifiedGmt, // example
      changefreq: 'monthly' // example value
    }));
    paths = [...paths, ...musicianPaths];

    // Fetching and adding concert paths
    const concerts = await getAllConcertSlugs();
    const concertPaths = concerts.map(concert => ({ 
      path: `${concert.node.uri}`,
      lastmod: concert.node.modifiedGmt, // example
      changefreq: 'monthly' // example value
    }));
    paths = [...paths, ...concertPaths];

    // Fetching and adding ensemble paths
    const ensembles = await getAllEnsembleSlugs();
    const ensemblePaths = ensembles.map(ensemble => ({ 
      path: `${ensemble.node.uri}`,
      lastmod: ensemble.node.modifiedGmt, // example
      changefreq: 'monthly' // example value 
    }));
    paths = [...paths, ...ensemblePaths];

    // Generate the XML sitemap with the accumulated paths
    const sitemap = generateSiteMap(paths);

    //const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    //console.log(`Writing sitemap to: ${sitemapPath}`);

    // Write to public directory
    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);

  return {
    props: {}, // No need to pass sitemap as a prop
    revalidate: 3600,
  };
  }

  function Sitemap() {
    return null;
  }
export default Sitemap;