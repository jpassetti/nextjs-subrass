import Head from 'next/head'
import { Fragment } from 'react'

const DOMAIN = 'https://subrass.syr.edu';

const SEO = ({
    title=false,
    description="The Syracuse University Brass Ensemble (SUBE) is a group of 35 professional-level brass and percussion musicians.",
    image=false,
    url=DOMAIN,
    siteName=false
}) => {
    return <Head>
    <title>{`${title ? `${title} | ` : ''}Syracuse University Brass Ensemble`}</title>
    <meta key="og_title" property="og:title" content={`${title ? `${title} | ` : ''}Syracuse University Brass Ensemble`} />
    <meta key="twitter_title" property="twitter:title" content={`${title ? `${title} | ` : ''}Syracuse University Brass Ensemble`} />
    <meta key="viewport" name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta key="charset" charSet="UTF-8" />
    <meta key="og_site_name" property="og:site_name" content="Syracuse University Brass Ensemble" />
    <meta key="og_country_name" property="og:country_name" content="USA" />
    <meta key="og_locale" property="og:locale" content="en_US" />
    <meta key="og_type" property="og:type" content="website" />
    <meta key="og_locality" property='og:locality' content='Syracuse' />
    <meta key="og_region" property='og:region' content='NY' />
    <meta key="og_postal_code" property='og:postal-code' content='13244' />
    <meta key="robots" name='robots' content='index,follow' />
    <meta key="language" name="language" content="EN" />
	<meta key="copyright" name="copyright" content="Syracuse University" />
    <meta key="google_site_verification" name="google-site-verification" content="axCJkiNnnco1_eFCM3DMVXx2-PZEGmZ9ldfmq1E6dVM" />
    <meta key="twitter_card" property="twitter:card" content="summary" />
    <meta key="twitter_site" property="twitter:site" content="@thesubrass" />	
    <meta key="keywords" name="keywords" content="Syracuse, Syracuse University, Syracuse University Brass, Syracuse University Brass Ensemble, Hendricks Chapel, SU Brass, SUBE, CNY Brass, Brass, Classical, Music, James T. Spencer, New York, Concerts" />
    <link key="icon_apple_touch" rel="apple-touch-icon" href="/images/favicons/apple-touch-icon.png" />
	<link key="icon_16" rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16.png" />
	<link key="icon_32" rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32.png" />
	<link key="icon_96" rel="icon" type="image/png" sizes="96x96" href="/images/favicons/favicon-96.png" />
	<link key="icon_144" rel="icon" type="image/png" sizes="144x144" href="/images/favicons/favicon-144.png" />
	<link key="icon_192" rel="icon" type="image/png" sizes="192x192" href="/images/favicons/favicon-192.png" />
    {description &&
        <Fragment>
            <meta key="description" name="description" content={description} />
            <meta key="og_description" property="og:description" content={description} />
            <meta key="twitter_description" property="twitter:description" content={description} />
        </Fragment>
    }
    {image &&
        <Fragment>
            <meta
                key="og_image"
                property="og:image"
                content={image.src}
            />
            <meta key="og_image_width" property="og:image:width" content={image.width} />
            <meta key="og_image_height" property="og:image:height" content={image.height} />
            <meta key="og_image_alt" property="og:image:alt" content={image.alt} />
            <meta key="twitter_image" name="twitter:image" content={image.src} />
            <meta key="twitter_image_alt" property="twitter:image:alt" content={image.alt} />
        </Fragment>
    }
    {url &&
        <Fragment>
            <meta key="url" name="url" content={url ? url : DOMAIN} />
            <meta key="og_url" property="og:url" content={url ? url : DOMAIN} />
            <meta key="twitter_url" property="twitter:url" content={url ? url : DOMAIN} />
        </Fragment>
    }
</Head>
}
export default SEO; 