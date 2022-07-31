import classNames from 'classnames/bind';
import * as styles from './musician.module.scss';

let cx = classNames.bind(styles);

import Col from './col'
import Link from 'next/link'
import Heading from './heading';
import Paragraph from './paragraph';
import ProfileImage from './profileimage';
import Row from './row'
import Span from './span'


import { isGraduateOfSyracuseUniversity, truncateGraduationYear, doesEducationIncludeSyracuseUniversity, doesWorkIncludeSyracuseUniversity } from '../lib/utilities'

const Musician = ({data, teaser=false}) => {
	const {prefix, firstName, middleInitial, lastName, suffix, education, work} = data.personInformation;

	let musicianClasses = cx({
		musician: true,
	});

	const fullName = `${prefix ? prefix: ''} ${firstName} ${middleInitial ? middleInitial : ''} `;
	
	if (teaser) return <Row alignItems="center" marginBottom="2">
		<Col xs="4" sm="3" md="4" marginBottom="0">
			<ProfileImage isSUGraduate={education ? doesEducationIncludeSyracuseUniversity(education) : false} isSUProfessor={work ? doesWorkIncludeSyracuseUniversity(work) : false} />
		</Col>
		<Col xs="8" sm="9" md="8" marginBottom="0">
			<Heading level="3">
				<Span fontWeight="normal" fontSize="smaller">{prefix ? prefix : ''} {firstName} {middleInitial ? `${middleInitial}.` : ''} </Span><br />
				<Span fontWeight="bold" textTransform="uppercase">{lastName}{suffix ? `, ${suffix}` : ''} {education?.map((item, index) => {
					return isGraduateOfSyracuseUniversity(item.university) ? `${truncateGraduationYear(item.graduationYear, item.degreeType)} ` : ''
				})}</Span>
			</Heading>
		</Col>
		{/*jobs && jobs.map((job, index) => {
			return <Paragraph key={index} className="mb-1">
				<em>{job.title}</em><br />
				{job.dept && (
					<>
						{job.dept}<br />
					</>
				)}
				{job.college.map((coll, index) => {
					return <span style={{ display: "block"}} dangerouslySetInnerHTML={{__html:coll}}></span>
				})}
				<span>Syracuse University</span>
			</Paragraph>
		})*/}
	</Row>;
	return (
	<>
			<Heading level="4" marginBottom="4"><Link href="/musicians">
				<a>
					Musicians
				</a></Link></Heading>
			<Heading level="1" marginBottom="2">{fullName}</Heading>
	</>
	)
}
export default Musician;
