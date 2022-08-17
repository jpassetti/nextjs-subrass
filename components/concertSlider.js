// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination } from "swiper";

// Import Swiper styles
import 'swiper/css';

import Card from '../components/card'
import Concert from '../components/concert'
import Heading from '../components/heading'
import Section from '../components/section'

const ConcertSlider = ({concerts}) => {
	return <Section>
		<Swiper
			slidesPerView={1.5}
			spaceBetween={16}
			pagination={{
				clickable: true,
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
			className="mySwiper"
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
