import classes from '../../../../styles/layout/Movies/Movies.module.css'
import {
	collection,
	DocumentData,
	FieldPath,
	getDocs,
	limit,
	orderBy,
	OrderByDirection,
	query,
	where
} from '@firebase/firestore'
import { db, storage } from '../../../../firebase/firebase'
import React, { useEffect, useState } from 'react'
import { getDownloadURL, ref } from '@firebase/storage'
import MovieCard from './MovieCard'

const Movies: React.FC<{
	sortBy: string | FieldPath
	sortType: OrderByDirection
	message: string
	limit: number
	search?: string
}> = props => {
	const [movies, setMovies] = useState<
		{
			id: string
			src: string
			data: DocumentData
		}[]
	>([])

	useEffect(() => {
		const getMovies = async () => {
			const movieRef = collection(db, 'movies')
			let q, data

			if (props.search) {
				q = query(
					movieRef,
					where("title", "==", props.search),
					orderBy(props.sortBy, props.sortType),
					limit(props.limit),
				)
				data = await getDocs(q)
			} else {
				q = query(
					movieRef,
					orderBy(props.sortBy, props.sortType),
					limit(props.limit)
				)
				data = await getDocs(q)
			}
			setMovies([])

			const URLs = data.docs.map(doc => {
				return getDownloadURL(
					ref(storage, `movies/${doc.id}/${doc.id} Thumbnail`)
				)
			})

			const URLlist = await Promise.all(URLs)
			data.docs.forEach(async (doc, i) => {
				setMovies(prevState => {
					if (prevState) {
						return [
							...prevState,
							{
								id: doc.id,
								src: URLlist[i],
								data: doc.data(),
							},
						]
					} else {
						return [
							{
								id: doc.id,
								src: URLlist[i],
								data: doc.data(),
							},
						]
					}
				})
			})
		}
		getMovies()
	}, [props.limit, props.sortBy, props.sortType, props.search])

	return (
		<div className={classes.MoviesWrapper}>
			<h2>{props.message}</h2>
			<div className={classes.Movies}>
				{movies.map(movie => {
					return (
						<MovieCard
							href={movie.id}
							year={movie.data.release}
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
