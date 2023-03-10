import { getAllMusicians, getAllConcertSlugs, getAllEnsembleSlugs } from '../lib/api';


const EXTERNAL_DATA_URL = 'https://subrass.syr.edu';

function generateSiteMap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${posts.map(({ path }) => {
           return `
         <url>
             <loc>${`${EXTERNAL_DATA_URL}/${path}`}</loc>
         </url>
       `;
         })
         .join('')}
     </urlset>
   `;
  }


  export async function getServerSideProps({ res }) {
    const paths = [];
    paths.push({
        path: ``
    });
    paths.push({
        path: `about`
    });
   
    const musicians = await getAllMusicians();
    musicians.forEach((edge) => {
      paths.push({
        path: `about/musicians/${edge.node.slug}`,
      });
    });

    paths.push({
        path: `concerts`
    });
  
    const concerts = await getAllConcertSlugs();
    concerts.forEach((edge) => {
      paths.push({
        path: `concerts/${edge.node.slug}`,
      });
    });

    const ensembles = await getAllEnsembleSlugs();
    ensembles.forEach((edge) => {
      paths.push({
        path: `ensembles/${edge.node.slug}`,
      });
    });

    paths.push({
        path: `contact`
    });
  
    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(paths);
  
    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();
  
    return {
      props: {},
    };
  }

function Sitemap() {
     // getServerSideProps will do the heavy lifting
  }
  
export default Sitemap;