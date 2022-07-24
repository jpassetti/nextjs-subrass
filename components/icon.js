import React from 'react'
import * as styles from './icon.module.scss';
import TwitterIcon from "../assets/twitter.inline.svg";
import InstagramIcon from "../assets/instagram.inline.svg";

const Icon = () => {
	return <p>Icon</p>
}
const Instagram = () => {
	return <InstagramIcon className={styles.icon} />
}
Icon.Instagram = Instagram;

const Twitter = () => {
	return <TwitterIcon className={styles.icon} />
}
Icon.Twitter = Twitter;

export default Icon
