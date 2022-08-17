// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Card from '../components/card'
import Concert from '../components/concert'
import Heading from '../components/heading'
import Section from '../components/section'

import styles from './concertslider.module.scss'

const ConcertSlider = ({concerts}) => {
	return <Section>
		<Swiper
			slidesPerView={1.5}
			spaceBetween={16}
			navigation={false}
			pagination={{
				clickable: true,
				bulletActiveClass: styles.bulletActive
			}}
			breakpoints={{
				700: {
					slidesPerView: 2,
					//spaceBetween: 20,
				},
				980: {
					slidesPerView: 3,
					// spaceBetween: 40,
				},
				1140: {
					slidesPerView: 4,
					// spaceBetween: 50,
				},
			}}
			modules={[Pagination]}
			className={styles.mySwiper}
		>
			{concerts.map((concert, index) => {
				return <SwiperSlide key={index}>
					<Card>
						<Concert data={concert.node} teaser />
					</Card>
				</SwiperSlide>
			})}
		</Swiper>

	</Section>
}
export default ConcertSlider;
