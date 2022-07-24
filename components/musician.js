import classNames from 'classnames/bind';
import * as styles from './musician.module.scss';

let cx = classNames.bind(styles);

import Link from 'next/link'
import Heading from './heading';
import Paragraph from './paragraph';

const displayGraduation = (graduate) => {
	let graduateArr = [];
	const apostrophe = "&rsquo;";
	graduate.map((graduateItem, index) => {
		const gradYearTrimmed = graduateItem.year.substring(2);
		if (graduateItem.type === "undergraduate") {
			graduateArr.push(`${apostrophe}${gradYearTrimmed}`);
		} else if (graduateItem.type === "graduate") {
			graduateArr.push(`G${apostrophe}${gradYearTrimmed}`);
		} else if (graduateItem.type === "law") {
			graduateArr.push(`L${apostrophe}${gradYearTrimmed}`);
		}
	})
	const graduateStr = graduateArr.join(', ');
	return { __html: graduateStr };
	//return <span>&deg;F</span>
}

const Musician = ({data, teaser=false}) => {
	const {name, graduate, jobs} = data;

	let musicianClasses = cx({
		musician: true,
	});
	
	if (teaser) return <div className={musicianClasses}>
		<Heading level="3" className="mb-1">
			{data.name.first} {data.name.last} {graduate && 
				<span dangerouslySetInnerHTML={ 
					displayGraduation(graduate)
				}></span>
			}	
		</Heading>
		{jobs && jobs.map((job, index) => {
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
		})}
	</div>;
	return (
	<>
			<Heading level="4" className="mb-4"><Link href="/musicians">
				<a>
					Musicians
				</a></Link></Heading>
			<Heading level="1" className="mb-2">{data.name.first} {data.name.last}</Heading>
	</>
	)
}
export default Musician;
