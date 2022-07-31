export function getSections() {
	const sectionsArr = [
		"Trumpet", "Trombone", "Horn", "Tuba", "Euphonium/Baritone", "Percussion"
	];
	return sectionsArr;
}

export function getMusiciansData() {
	const musiciansArr = [
		{
			name: {
				first: "Bert",
				last: "Bookhout"
			},
			slug: "bert-bookhout",
			image: null,
			instrument: "Trumpet",
			part: "2",
			graduate: null,
			jobs: null
		},
		{
			name: {
				first: "David",
				last: "Driesen"
			},
			slug: "david-driesen",
			image: null,
			instrument: "Trumpet",
			part: "Eb",
			graduate: null,
			jobs: [
				{
					title: "University Professor",
					college: ["College of Law"]
				}
			]
		},
		{
			name: {
				first: "Ralph",
				last: "Dudgeon"
			},
			slug: "ralph-dudgeon",
			image: null,
			instrument: "Trumpet",
			part: "1",
			graduate: null,
			jobs: null
		},
		{
			name: {
				first: "Craig",
				last: "Elwood"
			},
			slug: "craig-elwood",
			image: null,
			instrument: "Trumpet",
			part: "1",
			graduate: [
				{
					type: "graduate",
					year: "1989"
				}
			],
			jobs: null
		},
		//Gary La Point ’79, G’87, G’17
		{
			name: {
				first: "Gary",
				last: "La Point"
			},
			slug: "gary-la-point",
			image: null,
			instrument: "Trumpet",
			part: "2",
			graduate: [
				{
					type: "undergraduate",
					year: "1979"
				},
				{
					type: "graduate",
					year: "1987"
				},
				{
					type: "graduate",
					year: "2017"
				}
			],
			jobs: [
				{
					title: "Professor of Practice",
					college: ["Whitman School of Management"]
				},
			]
		},
		//Jennifer Linney ’83
		{
			name: {
				first: "Jennifer",
				last: "Linney"
			},
			slug: "jennifer-linney",
			image: null,
			instrument: "Trumpet",
			part: "3",
			graduate: [
				{
					type: "undergraduate",
					year: "1983"
				}
			],
			jobs: null
		},
		{
			name: {
				first: "Jeff",
				last: "Passetti"
			},
			slug: "jeff-passetti",
			image: "jeff-passetti.jpg",
			instrument: "Trumpet",
			part: "3",
			graduate: [
				{
					type: "undergraduate",
					year: "2004"
				}
			],
			jobs: [
				{
					title: "Adjunct Professor",
					college: [
						"School of Information Studies",
						"S.I. Newhouse School of Public Communications"
					]
				},
				{
					title: "Lead Artistic Designer",
					college: ["S.I. Newhouse School of Public Communications"]
				}
			]
		},
		//Lee Turner (Eb soprano)
		{
			name: {
				first: "Lee",
				last: "Turner"
			},
			slug: "lee-turner",
			image: null,
			instrument: "Trumpet",
			part: "1",
			graduate: null,
			jobs: null
		},
		{
			name: {
				first: "Mary",
				last: "Kasprzyk"
			},
			slug: "mary-kaprzyk",
			image: "mary-kaprzyk.jpg",
			instrument: "Percussion",
			graduate: false,
			jobs: [
				{
					title: "Video Editor",
					dept: "Division of Marketing and Communications",
					college: []
				}
			]
		},
	];
	// Combine the data with the id
	return musiciansArr
}
export function getAllMusicianSlugs() {
	console.log("getting all member slugs")
	const musiciansData = getMusiciansData();

	return musiciansData.map(musician => {
		return {
			params: {
				slug: musician.slug
			}
		}
	})
}

export function getMusicianData(slug) {
	const musicians = getMusiciansData();
	const match = musicians.find(musician => musician.slug === slug);
	return {
		slug,
		...match
	}
}

/*
Director
Dr. James T. Spencer *
Meredith Professor of Chemistry, College of Arts & Sciences

Associate Director
Mr. Craig Elwood G'89 *

Assistant Director
Mr. Corey Riley

 Trumpet
Bert Bookhout *
Kaitlyn DeHority
David Driesen (Eb) †*  University Professor, College of Law
Ralph Dudgeon †
Craig Elwood G’89 (flugelhorn) †
Gary La Point ’79, G’87, G’17  Professor of Practice, Whitman School of Management
Jennifer Linney ’83
Bryon Pagot
Jeffrey Passetti ’04  Adjunct Professor, iSchool/Newhouse School of Public Communications
Scott Rutledge
Ron Stewart
Lee Turner (Eb soprano)

Horn
Brad Foil
​Ben Johns '10
Holly McCoy
Kristen Mulcahy
Mike Sponsler *  Professor of Chemistry, College of Arts & Sciences
Audrey Turner
Pat Votra †
Karen Wickert

Euphonium/Baritone
Bill Abdallah G’73 *
Corey Riley †
​Anthony Veiga ’15

Trombone
Clifford Crain, Jr.
Jim D'Addario ’80
Ginger Dudgeon
Rob Enslin  Communications Manager, Syracuse University Office of the Board of Trustees
Jim Greenwald †*  Professor of Family Medicine, SUNY Upstate
Doug Reicher G’78
Phil Rice  Professor Emeritus of Biomedical and Chemical Engineering, College of Arts and Sciences
Jon Rossi G'05

Tuba
Loyal Mitchell
Matthew Murchison
Matthew Patterson
Matt Rossi G’04
​Ray Sturge ’80, G’87

Percussion
TJ James*  Adjunct Professor, College of Visual and Performing Arts
Mary Kasprzyk ’03 †*  Video Editor, Division of Marketing and Communications
Mike Tyszko L’15 *  Adjunct Professor, College of Visual and Performing Arts
*/
