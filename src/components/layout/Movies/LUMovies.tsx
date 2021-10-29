import MovieCard from './MovieCard'

import classes from '../../../../styles/layout/Movies/Movies.module.css'

const LUMovies = () => {
	return (
		<div className={classes.MoviesWrapper}>
			<h2>Latest Updates</h2>
			<div className={classes.Movies}>
				<MovieCard />
				<MovieCard />
				<MovieCard />
				<MovieCard />
				<MovieCard />
				<MovieCard />
				<MovieCard />
				<MovieCard />
				<MovieCard />
				<MovieCard />
				<MovieCard />
				<MovieCard />
				<MovieCard />
				<MovieCard />
			</div>
		</div>
	)
}

export default LUMovies
