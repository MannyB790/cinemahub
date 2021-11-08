import classes from '../../../../styles/layout/Movies/Movies.module.css'
import MovieCard from '../Movies/MovieCard'

const LUShows = () => {
	return (
		<div className={classes.MoviesWrapper}>
			<h2>Latest Updates</h2>
			<div className={classes.Movies}>
				<MovieCard href='#' />
				<MovieCard href='#' />
				<MovieCard href='#' />
				<MovieCard href='#' />
				<MovieCard href='#' />
				<MovieCard href='#' />
				<MovieCard href='#' />
				<MovieCard href='#' />
				<MovieCard href='#' />
				<MovieCard href='#' />
				<MovieCard href='#' />
				<MovieCard href='#' />
			</div>
		</div>
	)
}

export default LUShows
