import { Fragment } from 'react'
import LUMovies from '../src/components/layout/Movies/LUMovies'
import MPTMovies from '../src/components/layout/Movies/MPTMovies'
import Nav from '../src/components/layout/navigation/Nav'

const Home = () => {
	return (
		<Fragment>
			<Nav />
			<MPTMovies />
			<LUMovies />
		</Fragment>
	)
}

export default Home
