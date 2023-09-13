import '../styles/global.scss'
import { ScrollContext, ModalContext } from '../lib/context'
import { useState, useEffect } from 'react'
import Script from 'next/script'
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";

export default function App({ Component, pageProps }) {
	const [isModalOpen, setModalOpen] = useState(false);
	const [scrollPosition, setScrollPosition] = useState();
	const [scrollYObj, setScrollYObj] = useState({});

	useEffect(() => {
		const body = document.querySelector("body");

		if (isModalOpen === true) {
			setScrollPosition(window.pageYOffset); // When the Modal gets opened, the 
			body.style.top = `-${window.pageYOffset}px`;
			body.style.position = 'fixed';
			body.style.overflow = 'hidden';
		}
		if (isModalOpen === false) {
			body.style.position = '';
			body.style.overflow = 'auto';
			body.style.top = '';
			window.scrollTo(0, scrollPosition);
		}
	}, [isModalOpen]);

	const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);


	return <>
	{/* Global Site Tag (gtag.js) - Google Analytics */}
	<Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

	<ScrollContext.Provider value={[scrollYObj, setScrollYObj]}>
		<ModalContext.Provider value={[isModalOpen, setModalOpen]}>
			<Component {...pageProps} />
		</ModalContext.Provider>
	</ScrollContext.Provider>
	</>
}
