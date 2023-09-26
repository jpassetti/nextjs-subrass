import { Fragment } from 'react'
import styles from './musician.module.scss';

import Col from './col'
import Link from 'next/link'
import Heading from './heading';
import MainContent from './maincontent'
import Paragraph from './paragraph';
import ProfileImage from './profileimage';
import Row from './row'
import SEO from './SEO'
import Span from './span'


import { isGraduateOfSyracuseUniversity, truncateGraduationYear, doesEducationIncludeSyracuseUniversity, doesWorkIncludeSyracuseUniversity, displaySyracuseUniversityJobTitles } from '../lib/utilities'

const Musician = ({data, teaser=false}) => {
	const { slug, content, instruments, featuredImage } = data;
	const { prefix, firstName, middleInitial, lastName, suffix, education, work } = data.personInformation;

	const displayInstruments = (instruments) => {
		const instrumentsArr = instruments.edges.map((instrument) => {
			return instrument.node.name;
		})
		//console.log({instrumentsArr});
		const instrumentsString = instrumentsArr.join(', ');
		return instrumentsString;
	}

	const fullName = (teaser) => {
		return teaser ?
			<Fragment>
				<Span fontWeight="normal" fontSize="smaller">{prefix ? prefix : ''} {firstName} {middleInitial ? `${middleInitial}.` : ''} </Span><br />
				<Span fontWeight="bold" textTransform="uppercase">{lastName}{suffix ? `, ${suffix}` : ''} {education?.map((item, index) => {
					return isGraduateOfSyracuseUniversity(item.university) ? `${truncateGraduationYear(item.graduationYear, item.degreeType)} ` : ''
				})}</Span>
			</Fragment>
		: 
		<Fragment>
			<Span fontWeight="400" fontColor="white" fontSize="smaller">{prefix ? prefix : ''} {firstName} {middleInitial ? `${middleInitial}.` : ''} </Span><br />
			<Span fontWeight="bold" textTransform="uppercase">{lastName}{suffix ? `, ${suffix}` : ''} {education?.map((item, index) => {
				return isGraduateOfSyracuseUniversity(item.university) ? `${truncateGraduationYear(item.graduationYear, item.degreeType)} ` : ''
			})}</Span>
		</Fragment>		
	}
	
	return teaser ? <Row alignItems="center" marginBottom="2">
		<Col xs="4" sm="3" md="4" marginBottom="0">
			<Link href={`/about/musicians/${slug}`}>
				<a>
					<ProfileImage
						featuredImage={featuredImage}
						isSUGraduate={education ? doesEducationIncludeSyracuseUniversity(education) : false}
						isSUProfessor={work ? doesWorkIncludeSyracuseUniversity(work) : false}
					/>
				</a>
			</Link>
		</Col>
		<Col xs="8" sm="9" md="8" marginBottom="0">
			<Heading level="3">
				<Link href={`/about/musicians/${slug}`}>
					<a>
				<Span fontWeight="normal" fontSize="smaller">{prefix ? prefix : ''} {firstName} {middleInitial ? `${middleInitial}.` : ''} </Span><br />
				<Span fontWeight="bold" textTransform="uppercase">{lastName}{suffix ? `, ${suffix}` : ''} {education?.map((item, index) => {
					return isGraduateOfSyracuseUniversity(item.university) ? `${truncateGraduationYear(item.graduationYear, item.degreeType)} ` : ''
				})}</Span>
				</a></Link>
			</Heading>
			{work && doesWorkIncludeSyracuseUniversity(work) ? 
				<Heading level="4" fontWeight="500" marginTop="1" fontFamily="secondary">
				{displaySyracuseUniversityJobTitles(work)}
				</Heading>
			: ''}
			
		</Col>
	</Row>

	:
	<Fragment>
		<SEO 
			title={`${prefix ? prefix : ''} ${firstName} ${middleInitial ? `${middleInitial}.` : ''} ${lastName}${suffix ? `, ${suffix}` : ''}`}
			url={`https://subrass.syr.edu/about/musicians/${slug}`}
			/>
		<div className={styles.showcase}>
			<Heading level="4" marginBottom="4" color="white"><Link href="/ensembles/2023-24">
				<a>
					&laquo; Musicians
				</a></Link></Heading>
			<Row alignItems="flex-start">
				<Col xs="6" sm="6" md="2">
					<ProfileImage 
					featuredImage={featuredImage} 
					isSUGraduate={education ? doesEducationIncludeSyracuseUniversity(education) : false} 
					isSUProfessor={work ? doesWorkIncludeSyracuseUniversity(work) : false} 
					/>
				</Col>
				<Col xs="12" sm="12" md="8">
					<Heading level="1" marginBottom="2" color="white" lineHeight="normal">{fullName()}</Heading>
					
					{work && work.map((item, index) => {
						const { jobTitle, companySubdivision, companySubdivisionUrl, companyName, companyUrl } = item;
						return <Heading key={index} level="3" marginBottom="4" color="white" fontWeight="500" lineHeight="normal">
							{jobTitle &&
								<Span display="block" marginBottom="1" fontFamily="secondary" fontWeight="500">
									{jobTitle}
								</Span>
							}
							{companySubdivision &&
								<Span display="block" marginBottom="1">
									{companySubdivisionUrl ?
										<a href={companySubdivisionUrl} target="_blank">
												{companySubdivision}
										</a>
									: 
										companySubdivision
									}	
									</Span>
							}
							{companyName && 
								<Span display="block" fontSize="smaller" textTransform="uppercase" letterSpacing="spaced">
									{companyUrl ?
										<a href={companyUrl} target="_blank">
											{companyName}
										</a>
										:
										companyName
									}	
								</Span>
							}
							</Heading>
					})}
					{instruments &&
						<Fragment>
							<Heading level="4" color="orange" textTransform="uppercase" marginBottom="1" marginTop="4">Instrument{instruments.edges.length > 1 ? 's' : ''}</Heading>
							<Heading level="3" marginBottom="2" color="white" fontWeight="400">{displayInstruments(instruments)}
							</Heading>
						</Fragment>
					}
			</Col>
			</Row>
		</div>
		<Row justifyContent="center">
			<Col xs="12" sm="8" paddingTop="8">
				{content &&
					<MainContent content={content} />
				}
			</Col>
		</Row>	
	</Fragment>
}
export default Musician;
