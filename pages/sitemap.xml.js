import { Fragment } from 'react';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { getAllMusicians, getAllConcertSlugs, getAllEnsembleSlugs } from '../lib/api';

export async function getStaticProps() {
    const hostname = 'https://subrass.syr.edu';
    const paths = [];
  
    const musicians = await getAllMusicians();
    musicians.forEach((edge) => {
      paths.push({
        url: `/about/musicians/${edge.node.slug}`,
        changefreq: 'daily',
        priority: 0.7,
      });
    });
  
    const concerts = await getAllConcertSlugs();
    concerts.forEach((edge) => {
      paths.push({
        url: `/concerts/${edge.node.slug}`,
        changefreq: 'daily',
        priority: 0.7,
      });
    });

    const ensembles = await getAllEnsembleSlugs();
    ensembles.forEach((edge) => {
      paths.push({
        url: `/ensembles/${edge.node.slug}`,
        changefreq: 'daily',
        priority: 0.7,
      });
    });
  
    const stream = new SitemapStream({ hostname });

  const xmlString = await streamToPromise(
    Readable.from(paths).pipe(stream)
  ).then((data) => data.toString());

  return {
    props: {
      sitemapXml: xmlString,
    },
    // Regenerate the sitemap every hour
    revalidate: 3600,
  };
  }

function SitemapXml({ sitemapXml }) {
    return (
      <Fragment>
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Sitemap</title>
        </head>
        <body>
            <pre dangerouslySetInnerHTML={{ __html: sitemapXml }} />
        </body>
      </Fragment>
    );
  }
  
  export default SitemapXml;