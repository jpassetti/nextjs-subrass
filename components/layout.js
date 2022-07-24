import Header from './header'
import Container from './container'
import Footer from './footer'
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
		<Row>
			<Footer />
		</Row>
	</Container>
}
export default Layout;
