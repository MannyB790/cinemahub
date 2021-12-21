import { Fragment, useState } from 'react'
import SearchBar from '../src/components/layout/navigation/SearchBar'
import Shows from '../src/components/layout/Shows/Shows'
import Movies from '../src/components/layout/Movies/Movies'

const Home = () => {
	const [title, setTitle] = useState<string>()

	return (
		<Fragment>
			<SearchBar setTitle={setTitle} />
			<Movies
				message='Most Popular Movies'
				sortBy='views'
				sortType='desc'
				limit={50}
				search={title}
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
