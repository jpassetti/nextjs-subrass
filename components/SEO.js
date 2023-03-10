import Head from 'next/head'
import { Fragment } from 'react'

const SEO = ({
    title,
    description,
    image,
    url,
    siteName
}) => {
    return <Head>
    
    <title>{`${title ? `${title} | ` : ''}Syracuse University Brass Ensemble`}</title>
    <meta property="og:title" content={`${title ? `${title} | ` : ''}Syracuse University Brass Ensemble`} key="title" />
    <meta name="twitter:title" content={`${title ? `${title} | ` : ''}Syracuse University Brass Ensemble`} />
     
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta charSet="UTF-8" />
    <meta property="og:country_name" content="USA" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta name='og:locality' content='Syracuse' />
    <meta name='og:region' content='NY' />
    <meta name='og:postal-code' content='13244' />
    <meta name='og:country-name' content='USA' />
    <meta name='robots' content='index,follow' />
    <meta name="language" content="EN" />
	<meta name="copyright" content="Syracuse University" />
    <meta name="google-site-verification" content="axCJkiNnnco1_eFCM3DMVXx2-PZEGmZ9ldfmq1E6dVM" />
    {siteName && 
        <meta property="og:site_name" content={siteName} />
    }
    {description &&
        <Fragment>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta name="twitter:description" content={description} />
        </Fragment>
    }
    <meta name="keywords" content="Syracuse, Syracuse University, Syracuse University Brass, Syracuse University Brass Ensemble, Hendricks Chapel, SU Brass, Brass, Classical, Music, James T. Spencer, New York, Concerts" />
    {image &&
        <Fragment>
             <meta
                property="og:image"
                content={image.src}
            />
            <meta property="og:image:width" content={image.width} />
            <meta property="og:image:height" content={image.height} />
            <meta name="og:image:alt" content={image.alt} />
            <meta name="twitter:image:alt" content={image.alt} />
        </Fragment>
    }
    {url &&
        <Fragment>
            <meta name="url" content={url} />
            <meta name="og:url" content={url} />
            <meta name="twitter:url" content={url} />
        </Fragment>
    }
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@thesubrass" />	

    <link rel="apple-touch-icon" href="images/favicons/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32.png" />
	<link rel="icon" type="image/png" sizes="96x96" href="/images/favicons/favicon-96.png" />
	<link rel="icon" type="image/png" sizes="144x144" href="/images/favicons/favicon-144.png" />
	<link rel="icon" type="image/png" sizes="192x192" href="/images/favicons/favicon-192.png" />
</Head>
}
export default SEO; 