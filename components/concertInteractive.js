import { useState } from 'react';

import ButtonUI from './buttonui';
import ConcertList from './concertList';
import ConcertSlider from './concertSlider';
import Heading from './heading';
import Row from './row';
import Section from './section'

const ConcertInteractive = ({label, concerts}) => {
    const [displayAsList, setDisplayAsList] = useState(false);

    return <Section>
        <Row justifyContent="space-between" alignItems="center" marginTop={2}>
            <Heading level={2} marginLeft={1}>{label}</Heading>
            <div>
                <ButtonUI 
                    icon='gallery' 
                    clickHandler={() => setDisplayAsList(false)}
                    isActive={!displayAsList ? true : false}
                    />
                <ButtonUI 
                    icon='list' 
                    clickHandler={() => setDisplayAsList(true)}
                    isActive={displayAsList ? true : false}
                 />
            </div>
        </Row>
		{displayAsList ? 
            <ConcertList concerts={concerts} />
		: 
		    <ConcertSlider concerts={concerts} />
		}
	</Section>
}
export default ConcertInteractive;