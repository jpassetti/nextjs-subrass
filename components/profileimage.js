import Image from 'next/image'

import classNames from 'classnames/bind'

import styles from './profileimage.module.scss'
let cx = classNames.bind(styles);

const ProfileImage = ({ 
	isSUGraduate = false, 
	isSUProfessor = false, 
	isSUStaff = false,
	featuredImage 
}) => {
	let imageClasses = cx({
		profileimage: true,
		[`su_grad`]: isSUGraduate,
		[`su_professor`] : isSUProfessor,
		[`su_staff`] : isSUStaff
	});

	return <div className={imageClasses}>
		{featuredImage ?
			<Image 
				src={featuredImage.node.sourceUrl}
				alt={featuredImage.node.altText}
				width={featuredImage.node.mediaDetails.width}
				height={featuredImage.node.mediaDetails.height}
			/>
		: 
			<Image
				src="/images/blank-profile.jpg"
				alt="Empty profile"
				width="400"
				height="400"
			/>
	}
	</div>
}
export default ProfileImage
