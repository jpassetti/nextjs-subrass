// @ts-nocheck
import Header from './header'
import Container from './container'
import Main from './main'
import Row from './row'

const Layout = ({children}) => {
	return <Container type="full">
		<Row>
			<Header />
			<Main>
				{children}
			</Main>
		</Row>
	</Container>
}
export default Layout;
