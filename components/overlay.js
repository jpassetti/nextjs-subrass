import { usePresence, motion } from "framer-motion"
import { useEffect } from 'react'

import Nav from './nav';
import ButtonUI from './buttonui'
import styles from './overlay.module.scss'

const Overlay = ({closeHandler}) => {
	const [isPresent, safeToRemove] = usePresence()
	const variants = {
		open: {
			x: 0,
			transition: {
				duration: .5,
				type: "linear"
			}
		},
		closed: {
			x: "-100%",
			transition: {
				duration: .3,
				type: "linear"
			}
		},
		exit: {
			x: "-100%",
			transition: {
				duration: .3,
				type: "linear"
			}
		},
	};
	useEffect(() => {
		!isPresent && setTimeout(safeToRemove, 1000)
	}, [isPresent])
	return <motion.div
		className={styles.overlay}
		initial="closed"
		animate={isPresent ? 'open' : 'closed'}
		variants={variants}
		exit="exit"
	>
		<ButtonUI icon="close" clickHandler={closeHandler} />
		<Nav.Mobile />
		<Nav.SocialNav />
		<Nav.Members />
	</motion.div>
}
export default Overlay;
