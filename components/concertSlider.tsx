// @ts-nocheck
import Image from "next/image";
import Link from "next/link";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
 getAPStyleFormattedDate,
 getAPStyleFormattedTime,
 getConcertDate,
 getConcertPagePath,
} from "../lib/utilities";
import styles from "./concertslider.module.scss";

const ConcertSlider = ({ concerts }) => {
 return (
  <div className={styles.sliderShell}>
   <button className={`${styles.navigationButton} ${styles.previousButton}`} type="button" aria-label="Previous concerts">
    <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
   </button>
   <button className={`${styles.navigationButton} ${styles.nextButton}`} type="button" aria-label="Next concerts">
    <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
   </button>
  <Swiper
   slidesPerView={1.12}
   spaceBetween={16}
   navigation={{
    prevEl: `.${styles.previousButton}`,
    nextEl: `.${styles.nextButton}`,
   }}
   keyboard={{ enabled: true }}
   pagination={{ clickable: true }}
   watchOverflow
   breakpoints={{
    700: { slidesPerView: 2 },
    1100: { slidesPerView: 3 },
   }}
   modules={[A11y, Keyboard, Navigation, Pagination]}
   className={styles.slider}
   aria-label="Upcoming concerts"
  >
   {concerts.map(({ node }, index) => {
    const concertDate = getConcertDate(node);
    const venue = node.concertInformation?.venue;
    const image = node.featuredImage?.node || venue?.featuredImage?.node;

    return (
     <SwiperSlide className={styles.slide} key={node.slug || node.uri || index}>
      <Link
       className={styles.card}
       href={getConcertPagePath(node)}
       aria-label={`View ${node.title} on ${getAPStyleFormattedDate(concertDate, moment)}`}
      >
       <span className={styles.imageFrame}>
        {image?.sourceUrl ? (
         <Image
          src={image.sourceUrl}
          alt={image.altText || ""}
          fill
          sizes="(min-width: 1100px) 24vw, (min-width: 700px) 42vw, 88vw"
          className={styles.image}
         />
        ) : null}
       </span>
       <span className={styles.cardContent}>
        <time dateTime={moment(concertDate).toISOString()}>{getAPStyleFormattedDate(concertDate, moment)}</time>
        <strong>{node.title}</strong>
        <span className={styles.meta}>{getAPStyleFormattedTime(concertDate, moment)} · {venue?.title}</span>
        <span className={styles.cta}>View concert details <span aria-hidden="true">&rarr;</span></span>
       </span>
      </Link>
     </SwiperSlide>
    );
   })}
  </Swiper>
  </div>
 );
};

export default ConcertSlider;
