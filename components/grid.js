import classNames from 'classnames/bind'
import * as styles from './grid.module.scss'

let cx = classNames.bind(styles)

const Grid = ({children}) => {
	let gridClasses = cx({
		grid: true,
	});
	return <ul className={gridClasses}>
		{children}
	</ul>
}
const GridItem = ({children}) => {
	let gridItemClasses = cx({
		[`grid--item`]: true,
	});
	return <li className={gridItemClasses}>
		{children}
	</li>
}
Grid.Item = GridItem;
export default Grid;
