import {useState} from 'react'

import { motion, AnimatePresence } from "framer-motion"
import * as styles from './experiment.module.scss';

const Experiment = () => {

	const [dropdownActive, setDropdownActive] = useState(false)

	

	return <div className={styles.bar}>
		<ul className={styles.nav}>
			<ListItem />
			<ListItem />
			<ListItem />
			<ListItem />
		</ul>
	</div>
}
const ListItem = () => {
	const [dropdownActive, setDropdownActive] = useState(false)

	const variants = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
		},
	}
	return <li>
		<a
			href=""
			//onMouseOver={() => { setDropdownActive(true) }}
			//onMouseOut={() => { setDropdownActive(false) }} 
			//onFocus={() => { setDropdownActive(true) }}
			//onBlur={() => { setDropdownActive(true) }}
		>Products</a>
		<AnimatePresence>
			{
				dropdownActive && <motion.ul
					initial="hidden"
					animate="visible"
					variants={variants}
					exit={{ transition: { delay: .25 } }}
				>
					<motion.li><a href="">Product 1</a></motion.li>
					<motion.li><a href="">Product 2</a></motion.li>
					<motion.li><a href="">Product 3</a></motion.li>
				</motion.ul>
			}
		</AnimatePresence>
	</li>
}
export default Experiment;
