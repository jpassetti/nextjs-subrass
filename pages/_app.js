import '../styles/global.scss'
import { ScrollContext, ModalContext } from '../lib/context'
import { useState, useEffect } from 'react'

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
	return <ScrollContext.Provider value={[scrollYObj, setScrollYObj]}>
		<ModalContext.Provider value={[isModalOpen, setModalOpen]}>
			<Component {...pageProps} />
		</ModalContext.Provider>
	</ScrollContext.Provider>
}
