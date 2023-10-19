import { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';

import classNames from 'classnames/bind';
import Paragraph from './paragraph';
import PasswordModal from './passwordmodal';
import * as styles from './nav.module.scss';

let cx = classNames.bind(styles);

const navLinks = [
	{
		title: "Home",
		path: "/"
	},
	{
		title: "About",
		path: "/about"
	},
	{
		title: "Concerts",
		path: "/concerts"
	},
	{
		title: "Musicians",
		path: "/ensembles/2023-24"
	},
	{
		title: "Contact",
		path: "/contact"
	},
];


const Nav = () => {
	const router = useRouter();
	let navClasses = cx({
		nav: true
	});
	return (
		<nav className={navClasses}>
			<ul>
				{navLinks.map((navLink, index) => {
					const {path, title} = navLink;
					return <li key={index}>
						<Link href={path}>
							<a className={router.pathname == path ? styles.active : ""}>
								{title}
							</a>
						</Link>
					</li>
				})}
			</ul>
		</nav>
	)
}
const SocialNav = () => {
	let socialNavClasses = cx({
		socialnav: true
	});
	return <nav className={socialNavClasses}><ul>
		<li>
			<a href="http://facebook.com/subrass" target="_blank">Facebook</a>
		</li>
		<li>
			<a href="http://soundcloud.com/thesubrass" target="_blank">Soundcloud</a>
		</li>
		<li>
			<a href="http://youtube.com/thesubrass" target="_blank">YouTube</a>
		</li>
		</ul>
	</nav>
}
Nav.SocialNav = SocialNav;
const Members = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLinkClick = () => {
    setIsModalOpen(true);
  };
  	const handlePasswordSubmit = () => {
		// If the password is correct, navigate to the Google Drive folder
		window.open('https://drive.google.com/drive/folders/1C6xiwHqxHxAEhfVABVyv9LBVYNQAt-MJ');

		setIsModalOpen(false); // Close the modal
	};


	return <nav className={styles.socialnav}>
		<ul>
			<li onClick={handleLinkClick}>
				Members login
			</li>
		</ul>
		{isModalOpen && (
        <PasswordModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onPasswordSubmit={handlePasswordSubmit}
        />
      )}
	</nav>
}
Nav.Members = Members;
const Mobile = () => {
	const router = useRouter();
	let mobileNavClasses = cx({
		mobileNav: true
	});
	return <nav className={mobileNavClasses}>
		<ul>
			{navLinks.map((navLink, index) => {
				const { path, title } = navLink;
				return <li key={index}>
					<Link href={path}>
						<a className={router.pathname == path ? styles.active : ""}>
							{title}
						</a>
					</Link>
				</li>
			})}
		</ul>
	</nav>
}
Nav.Mobile = Mobile;
export default Nav;
