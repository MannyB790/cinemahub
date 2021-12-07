import { Fragment, useEffect, useState } from 'react'

import classes from '../../styles/layout/Movies/Movie/Movie.module.css'
import Player from '../../src/components/layout/Player/Player'
import { useRouter } from 'next/router'
import {
	collection,
	doc,
	DocumentData,
	getDoc,
	getDocs,
	QueryDocumentSnapshot,
} from '@firebase/firestore'
import { db, storage } from '../../firebase/firebase'
import { getDownloadURL, ref } from '@firebase/storage'
import Season from '../../src/components/layout/Shows/Season'

const Name = () => {
	const router = useRouter()

	const [showName, setShowName] = useState('')
	const [data, setData] = useState<DocumentData>()
	const [URL, setURL] = useState('')
	const [seasons, setSeasons] = useState<string[]>([])

	useEffect(() => {
		const getData = async () => {
			if (showName) {
				const showRef = doc(db, 'shows', `${showName}`)
				const showDoc = await getDoc(showRef)
				const showEpisodeRef = collection(
					db,
					`shows/${showName}/seasons/1/episodes`
				)

				const showEpisodeDoc = await getDocs(showEpisodeRef)
				setData(showDoc.data())

				const storageRef = ref(
					storage,
					`shows/${showName}/1/${showEpisodeDoc.docs[0].id} Show`
				)
				const URL = await getDownloadURL(storageRef)
				setURL(URL)

				const seasonsCollection = collection(db, `shows/${showName}/seasons`)
				const seasonsCollectionDocs = await getDocs(seasonsCollection)
				setSeasons([])
				seasonsCollectionDocs.docs.forEach(doc => {
					console.log(doc.id)
					setSeasons((prevState): string[] => {
						if (prevState != []) {
							return [...prevState, doc.id]
						} else {
							return [doc.id]
						}
					})
				})
			}
		}

		if (router.query.name) {
			setShowName(router.query.name!.toString().replaceAll('-', ' ').trim())
			getData()
		}
	}, [router.query.name, showName])

	const updateEpisode = async (name: string, season: string) => {
		const storageRef = ref(storage, `shows/${showName}/${season}/${name} Show`)
		const URL = await getDownloadURL(storageRef)
		setURL(URL)
	}

	return (
		<Fragment>
			<div className={classes.Movie}>
				<Player
					src={URL}
					title={showName}
					description={data?.description}
					director={data?.director}
					genre={data?.genre}
					released={data?.release}
					rating={data?.rating}
					stars={data?.stars}
				/>
				<div className={classes.Seasons}>
					<h1>Seasons</h1>
					{seasons?.map(doc => {
						return (
							<Season
								key={doc}
								season={doc}
								showName={showName}
								updateEpisode={updateEpisode}
							/>
						)
					})}
				</div>
			</div>
		</Fragment>
	)
}

export default Name
