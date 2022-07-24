import classNames from 'classnames/bind'
import * as styles from './grid.module.scss'

let cx = classNames.bind(styles)

const Grid = ({children}) => {
	let gridClasses = cx({
		grid: true,
	});
	return <section className={gridClasses}>
		{children}
	</section>
}
const GridItem = ({children}) => {
	let gridItemClasses = cx({
		[`grid--item`]: true,
	});
	return <article className={gridItemClasses}>
		{children}
	</article>
}
Grid.Item = GridItem;
export default Grid;
