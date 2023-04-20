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
export function displaySyracuseUniversityJobTitles(work) {
	let jobTitles = work.map((item) => {
		return item.jobTitle
	});
	// filter duplicates
	let uniqueJobs = [...new Set(jobTitles)];

	// create string
	let jobTitlesString = uniqueJobs.join(', ');
	return jobTitlesString
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

export function formatMonth(monthNumber) {
	let formattedMonth;
	switch (monthNumber) {
		case 0:
			formattedMonth = 'January';
			break;
		case 1:
			formattedMonth = 'February';
			break;
		case 2:
			formattedMonth = 'March';
			break;
		case 3:
			formattedMonth = 'April';
			break;
		case 4:
			formattedMonth = 'May';
			break;
		case 5:
			formattedMonth = 'June';
			break;
		case 6:
			formattedMonth = 'July';
			break;
		case 7:
			formattedMonth = 'August';
			break;
		case 8:
			formattedMonth = 'September';
			break;
		case 9:
			formattedMonth = 'October';
			break;
		case 10:
			formattedMonth = 'November';
			break;
		case 11:
			formattedMonth = 'December';
			break;
		default:
			formattedMonth = 'n/a';
	}
	return formattedMonth;
}

export function formatDayOfTheWeek(dayNumber) {
	console.log({dayNumber});
	let formattedDay;
	switch (parseInt(dayNumber)) {
		case 0:
			formattedDay = 'Sunday';
			break;
		case 1:
			formattedDay = 'Monday';
			break;
		case 2:
			formattedDay = 'Tuesday';
			break;
		case 3:
			formattedDay = 'Wednesday';
			break;
		case 4:
			formattedDay = 'Thursday';
			break;
		case 5:
			formattedDay = 'Friday';
			break;
		case 6:
			formattedDay = 'Saturday';
			break;
		default:
			formattedDay = 'n/a';
	}
	return formattedDay;
}

export function getAPStyleFormattedMonth(monthNumber) {
	switch (monthNumber) {
		case 1:
			return 'Jan.';
		case 2:
			return 'Feb.';
		case 3:
			return 'March';
		case 4:
			return 'April';
		case 5:
			return 'May';
		case 6:
			return 'June';
		case 7:
			return 'July';
		case 8:
			return 'Aug.';
		case 9:
			return 'Sept.';
		case 10:
			return 'Oct.';
		case 11:
			return 'Nov.';
		case 12:
			return 'Dec.';
		default:
			return 'n/a';
	}
}	
export function getFormattedAMPM(ampm) {
	switch (ampm) {
		case 'am':
			return 'a.m.';
		case 'pm':
			return 'p.m.';
		default:
			return 'n/a';
	}
}
