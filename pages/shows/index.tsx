import { Fragment } from 'react'
import MPTShows from '../../src/components/layout/Movies/MPTMovies'
import Nav from '../../src/components/layout/navigation/Nav'
import LUShows from '../../src/components/layout/Shows/LUShows'

const Shows = () => {
	return (
		<Fragment>
			<Nav search={true} />
			<MPTShows />
			<LUShows />
		</Fragment>
	)
}

export default Shows
