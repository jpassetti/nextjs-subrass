import Header from './header'
import Container from './container'
import Footer from './footer'
import Main from './main'
import Row from './row'
import SEO from './SEO'

const Layout = ({children}) => {
	return <Container type="full">
		<SEO 
			title={null}
			url="https://subrass.syr.edu"
			description="The Syracuse University Brass Ensemble (SUBE) is a group of 35 professional-level brass and percussion musicians."			
			/>
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
