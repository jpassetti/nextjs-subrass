export function getConcertsData() {
	const concertsArr = [
		{
			title: "Utica Concert",
			slug: "grace-chuch",
			location: {
				name: "Grace Church",
				street: "6 Elizabeth St",
				city: "Utica",
				state: "NY",
				zip: 13501
			},
			date: {
				day: "Sunday",
				month: "Nov",
				numeral: 14,
				year: 2022
			},
			time: "3 p.m.",
			academicYear: "2022-23"
		},
		{
			title: "Auburn Concert",
			slug: "st-peter-and-john-church",
			location: {
				name: "Sts. Peter & John Episcopal Church",
				street: "169 Genesee St #3403",
				city: "Auburn",
				state: "NY",
				zip: 13021
			},
			date: {
				day: "Sunday",
				month: "Dec",
				numeral: 5,
				year: 2022
			},
			time: "3 p.m.",
			academicYear: "2022-23"
		},
		{
			title: "Rome Concert",
			slug: "st-john-the-baptist-church-concert",
			location: {
				name: "Catholic Church of St. John the Baptist",
				street: "210 E Dominick St",
				city: "Rome",
				state: "NY",
				zip: 13440
			},
			date: {
				day: "Saturday",
				month: "Dec",
				numeral: 11,
				year: 2022
			},
			time: "3 p.m.",
			academicYear: "2022-23"
		},
		{
			title: "St. Nicholaus Festival",
			slug: "st-nicholaus-festival",
			location: {
				name: "United Church of Fayetteville",
				street: "310 E Genesee St",
				city: "Fayetteville",
				state: "NY",
				zip: 13066
			},
			date: {
				day: "Sunday",
				month: "Dec",
				numeral: 12,
				year: 2022
			},
			time: "3 p.m.",
			academicYear: "2022-23"
		},
		{
			title: "Horns and Harmonies",
			slug: "horns-and-harmonies",
			location: {
				name: "Hendricks Chapel",
				street: "Syracuse University",
				city: "Syracuse",
				state: "NY",
				zip: 13244
			},
			date: {
				day: "Saturday",
				month: "Dec",
				numeral: 17,
				year: 2022
			},
			time: "3 p.m.",
			academicYear: "2022-23"
		},
		{
			title: "Brass Bash",
			slug: "brass-bash",
			location: {
				name: "Hendricks Chapel",
				street: "Syracuse University",
				city: "Syracuse",
				state: "NY",
				zip: 13244
			},
			date: {
				day: "Monday",
				month: "Mar",
				numeral: "13",
				year: 2023
			},
			time: "7 p.m.",
			academicYear: "2022-23"
		},
		{
			title: "Syracuse IC Cathedral Concert",
			slug: "cathedral-immaculate-conception",
			location: {
				name: "Cathedral of the Immaculate Conception",
				street: "259 E Onondaga St",
				city: "Syracuse",
				state: "NY",
				zip: 13202
			},
			date: {
				day: "Sunday",
				month: "Apr",
				numeral: "13",
				year: 2023
			},
			time: "8 p.m.",
			academicYear: "2022-23"
		},
	];
	// Combine the data with the id
	return concertsArr
}
export function getConcertsDataByYear(year) {
	const concertsData = getConcertsData();
	return concertsData.filter(concert => concert.academicYear === year)
}
export function getAllConcertSlugs() {
	console.log("getting all concert slugs")
	const concertsData = getConcertsData();

	return concertsData.map(concert => {
		return {
			params: {
				slug: concert.slug
			}
		}
	})
}

export function getConcertData(slug) {
	const concerts = getConcertsData();
	const match = concerts.find(concert => concert.slug === slug);
	return {
		slug,
		...match
	}
}
