import Image from 'next/image'
import Link from 'next/link'

import classes from '../../../../styles/layout/Movies/MovieCard.module.css'

import tmb from '../../../../public/images/Icons/solid.svg'
import { StorageReference } from '@firebase/storage'

const MovieCard: React.FC<{
	year: number
	href: string
	src?: string
}> = props => {
	return (
		<div className={classes.MovieCard}>
			<p>{props.year}</p>
			<Image src={props.src ? props.src : tmb} width='200px' height='300px' alt='thumbnail' />
			<Link href={`movies/${props.href.replaceAll(' ', '-')}`}>
				{props.href}
			</Link>
		</div>
	)
}

export default MovieCard
