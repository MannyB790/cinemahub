import { Fragment, useState } from 'react'
import SearchBar from '../../src/components/layout/navigation/SearchBar'
import MovieList from '../../src/components/layout/Movies/Movies'
import { OrderByDirection } from '@firebase/firestore'

const Movies = () => {
	const [sortBy, setSortBy] = useState('title')
	const [sortType, setSortType] = useState<OrderByDirection>('asc')
	const [genre, setGenre] = useState('All')
	const [year, setYear] = useState('All')

	return (
		<Fragment>
			<SearchBar
				setSortBy={setSortBy}
				setSortType={setSortType}
				setGenre={setGenre}
				setYear={setYear}
			/>
			<MovieList
				sortBy={sortBy}
				message='Movies'
				sortType={sortType}
				limit={50}
			/>
		</Fragment>
	)
}

export default Movies
