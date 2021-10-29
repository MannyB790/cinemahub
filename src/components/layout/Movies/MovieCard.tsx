import Image from 'next/image'
import Link from 'next/link'

import classes from '../../../../styles/layout/Movies/MovieCard.module.css'

import tmb from '../../../../public/images/thumbnails/thumbnail.jpg'

const MovieCard = () => {
	return (
		<div className={classes.MovieCard}>
			<p>2021</p>
			<Image src={tmb} width='200px' height='300px' />
			<Link href='#'>Dune</Link>
		</div>
	)
}

export default MovieCard
