import Image from 'next/image'

import IMDB from '../../../../public/images/Logos/IMDB.svg'
import classes from '../../../../styles/layout/Player/Player.module.css'

const Player: React.FC<{
	src: string
	title: string
	description: string
	director: string
	released: number
	rating: number
	stars: string[]
	genre: string[]
}> = props => {
	return (
		<div className={classes.VideoWrapper}>
			<h1>{props.title}</h1>
			<video src={props.src} controls></video>
			<div className={classes.Description}>
				<h1>Overview</h1>
				<p>{props.description}</p>
			</div>
			<div className={classes.Info}>
				<ul className={classes.InfoPanel}>
					<li>Director: {props.director}</li>
					<li>Released: {props.released}</li>
					<li>Genre: {props.genre?.join(', ')}</li>
					<li>Stars: {props.stars?.join(', ')}</li>
				</ul>
				<div className={classes.InfoRating}>
					<h1>{props.rating}</h1>
					<Image src={IMDB} width='100' height='50' alt='player' />
				</div>
			</div>
		</div>
	)
}

export default Player
