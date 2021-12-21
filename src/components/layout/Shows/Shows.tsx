import classes from '../../../../styles/layout/Movies/Movies.module.css'
import {
	collection,
	DocumentData,
	getDocs,
	limit,
	orderBy,
	OrderByDirection,
	query,
} from '@firebase/firestore'
import { db, storage } from '../../../../firebase/firebase'
import React, { useEffect, useState } from 'react'
import { getDownloadURL, ref } from '@firebase/storage'
import ShowCard from './ShowCard'

const Shows: React.FC<{
	sortBy: string
	sortType: OrderByDirection
	message: string
	limit: number
}> = props => {
	const [shows, setShows] = useState<
		{
			id: string
			src: string
			data: DocumentData
		}[]
	>([])

	useEffect(() => {
		const getMovies = async () => {
			const movieRef = collection(db, 'shows')
			const q = query(
				movieRef,
				orderBy(props.sortBy, props.sortType),
				limit(props.limit)
			)
			const data = await getDocs(q)
			setShows([])

			const URLs = data.docs.map(doc => {
				return getDownloadURL(
					ref(storage, `shows/${doc.id}/${doc.id} Thumbnail`)
				)
			})

			const URLlist = await Promise.all(URLs)
			data.docs.forEach(async (doc, i) => {
				setShows(prevState => {
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
	}, [props.limit, props.sortBy, props.sortType])

	return (
		<div className={classes.MoviesWrapper}>
			<h2>{props.message}</h2>
			<div className={classes.Movies}>
				{shows.map(show => {
					return (
						<ShowCard
							href={show.id}
							year={show.data.release}
							src={show.src}
							key={show.id}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Shows
