import classNames from 'classnames/bind'

import styles from './profileimage.module.scss'
let cx = classNames.bind(styles);

const ProfileImage = ({ 
	isSUGraduate = false, 
	isSUProfessor = false, 
	isSUStaff = false 
}) => {
	let imageClasses = cx({
		profileimage: true,
		[`su_grad`]: isSUGraduate,
		[`su_professor`] : isSUProfessor,
		[`su_staff`] : isSUStaff
	});

	return <div className={imageClasses}></div>
}
export default ProfileImage
