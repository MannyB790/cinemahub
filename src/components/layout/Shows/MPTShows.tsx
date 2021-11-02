import classes from '../../../../styles/layout/Movies/Movies.module.css'
import MovieCard from '../Movies/MovieCard'

const MPTMovies = () => {
	return (
		<div className={classes.MoviesWrapper}>
			<h2>Most Popular Today</h2>
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

export default MPTMovies
