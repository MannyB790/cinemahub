import { Fragment } from 'react'
import SearchBar from '../src/components/layout/navigation/SearchBar'
import Shows from '../src/components/layout/Shows/Shows'
import Movies from '../src/components/layout/Movies/Movies'

const Home = () => {
	return (
		<Fragment>
			<SearchBar />
			<Movies
				message='Most Popular Movies'
				sortBy='views'
				sortType='desc'
				limit={20}
			/>
			<Shows
				message='Most Popular Shows'
				sortBy='views'
				sortType='desc'
				limit={20}
			/>
		</Fragment>
	)
}

export default Home
