import classes from '../../../../styles/layout/Player/Player.module.css'

const Player: React.FC<{
	src: string
	title: string
	description: string
	director: string
	released: number
	stars: string[]
	genre: string[]
}> = props => {
	return (
		<div className={classes.VideoWrapper}>
			<h1>{props.title}</h1>
			<video src={props.src} controls></video>
			<p>{props.description}</p>
			<div className={classes.Info}>
				<h2>
					Stars:{' '}
					{props.stars.map(star => {
						return star
					})}
				</h2>
				<h2>Director: {props.director}</h2>
				<h2>
					Genre:{' '}
					{props.genre.map(genre => {
						return genre
					})}
				</h2>
				<h2>Released: {props.released}</h2>
			</div>
		</div>
	)
}

export default Player
