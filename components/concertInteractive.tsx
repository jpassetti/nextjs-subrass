// @ts-nocheck
"use client";

import { useState } from 'react';

import ButtonUI from './buttonui';
import ConcertList from './concertList';
import ConcertSlider from './concertSlider';
import Heading from './heading';
import Row from './row';
import Section from './section'
import styles from './concertInteractive.module.scss';

const ConcertInteractive = ({ sectionTitle = "", label, concerts, listOnly = false }) => {
    const [displayAsList, setDisplayAsList] = useState(listOnly);

    return <Section>
        <Row justifyContent="space-between" alignItems="center" marginTop={2}>
            <Heading level={2} className={sectionTitle ? styles.sectionHeading : ""} marginLeft={1}>
                {sectionTitle ? <>
                    <span className={styles.sectionTitle}>{sectionTitle}</span>
                    <span className={styles.year}>{label}</span>
                </> : label}
            </Heading>
            {!listOnly ? (
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
            ) : null}
        </Row>
        {concerts.length === 0 ? null : displayAsList ?
            <ConcertList concerts={concerts} />
		: 
		    <ConcertSlider concerts={concerts} />
		}
	</Section>
}
export default ConcertInteractive;
