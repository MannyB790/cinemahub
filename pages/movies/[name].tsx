import { Fragment, useEffect, useState } from 'react'

import classes from '../../styles/layout/Movies/Movie/Movie.module.css'
import Player from '../../src/components/layout/Player/Player'
import { useRouter } from 'next/router'
import { doc, DocumentData, getDoc } from '@firebase/firestore'
import { db, storage } from '../../firebase/firebase'
import { getDownloadURL, ref } from '@firebase/storage'

const Name = () => {
	const router = useRouter()

	const [movieName, setMovieName] = useState('')
	const [data, setData] = useState<DocumentData>()
	const [title, setTitle] = useState('')
	const [URL, setURL] = useState('')

	useEffect(() => {
		const getData = async () => {
			if (movieName) {
				const movieRef = doc(db, 'movies', `${movieName}`)
				const movieDoc = await getDoc(movieRef)
				setData(movieDoc.data())
				setTitle(movieDoc.id)

				const storageRef = ref(
					storage,
					`movies/${movieName}/${movieName} Movie`
				)
				const URL = await getDownloadURL(storageRef)
				setURL(URL)
			}
		}

		if (router.query.name) {
			setMovieName(router.query.name!.toString().replaceAll('-', ' ').trim())
			getData()
		}
	}, [router.query.name, movieName])

	return (
		<Fragment>
			<div className={classes.Movie}>
				<Player
					src={URL}
					title={title}
					description={data?.description}
					director={data?.director}
					genre={data?.genre}
					released={data?.release}
					rating={data?.rating}
					stars={data?.stars}
				/>
			</div>
		</Fragment>
	)
}

export default Name
