import MovieCard from './MovieCard'

import classes from '../../../../styles/layout/Movies/Movies.module.css'
import { collection, getDocs, limit, orderBy, query } from '@firebase/firestore'
import { db, storage } from '../../../../firebase/firebase'
import React, { useEffect, useState } from 'react'
import { getDownloadURL, ref } from '@firebase/storage'

const Movies: React.FC<{ sortBy: string }> = props => {
	const [movies, setMovies] = useState<{ id: string; src: string }[]>([])

	useEffect(() => {
		const getMovies = async () => {
			const movieRef = collection(db, 'movies')
			const q = query(movieRef, orderBy(props.sortBy, 'desc'), limit(20))
			const data = await getDocs(q)
			setMovies([])
			data.docs.forEach(doc => {
				const movieRef = ref(storage, `movies/${doc.id} Thumbnail`)
				getDownloadURL(movieRef).then(URL => {
					setMovies(prevState => {
						if (prevState) {
							return [
								...prevState,
								{
									id: doc.id,
									src: URL,
									data: doc.data(),
								},
							]
						} else {
							return [
								{
									id: doc.id,
									src: URL,
									data: doc.data(),
								},
							]
						}
					})
				})
			})
		}
		getMovies()
	}, [])

	return (
		<div className={classes.MoviesWrapper}>
			<h2>Most Popular Today</h2>
			<div className={classes.Movies}>
				{movies.map(movie => {
					return (
						<MovieCard
							href={movie.id}
							year={2021}
							src={movie.src}
							key={movie.id}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Movies
