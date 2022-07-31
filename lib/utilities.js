export function isGraduateOfSyracuseUniversity(university) {
	if (university === "Syracuse University") {
		return true;
	} else {
		return false;
	}
}
export function doesEducationIncludeSyracuseUniversity(education) {
	return education.some(item => item['university'] === 'Syracuse University')
}
export function doesWorkIncludeSyracuseUniversity(work) {
	return work.some(item => item['companyName'] === 'Syracuse University')
}
export function truncateGraduationYear(year, degreeType) {
	let formattedYear;
	switch (degreeType) {
		case 'honorary':
			formattedYear = `H'${year.slice(-2)}`;
			break;
		case 'doctoral':
			formattedYear = `G'${year.slice(-2)}`;
			break;
		case 'law':
			formattedYear = `L'${year.slice(-2)}`;
			break;
		case 'graduate':
			formattedYear = `G'${year.slice(-2)}`;
			break;
		case 'undergraduate':
			formattedYear = `'${year.slice(-2)}`;
			break;
		default:
			formattedYear = year;
	}
	return formattedYear;
}
