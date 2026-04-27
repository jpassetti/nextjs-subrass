// @ts-nocheck
import ConcertListItem from "./concertListItem";

const ConcertList = ({ concerts }) => {
    return <section>
       {concerts.map((concert, index) => {
			return <ConcertListItem key={concert.node.slug || index} data={concert.node} teaser />
		})}
    </section>
}
export default ConcertList;