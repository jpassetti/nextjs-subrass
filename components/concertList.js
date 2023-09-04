import ConcertListItem from "./concertListItem";

const ConcertList = ({ concerts }) => {
    return <section>
       {concerts.map((concert, index) => {
			return <ConcertListItem data={concert.node} teaser />
		})}
    </section>
}
export default ConcertList;