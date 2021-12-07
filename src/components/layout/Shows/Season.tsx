import {
	collection,
	getDocs,
	orderBy,
	query,
	QueryDocumentSnapshot,
} from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../../../firebase/firebase'
import classes from '../../../../styles/layout/Show/Season.module.css'

const Season: React.FC<{
	season: string
	showName: string
	updateEpisode: (name: string, season: string) => void
}> = props => {
	const [episodes, setEpisodes] = useState<string[]>()

	useEffect(() => {
		if (props.season) {
			if (props.showName) {
				const getEpisodes = async () => {
					const episodesCollection = collection(
						db,
						`shows/${props.showName}/seasons/${props.season}/episodes`
					)
					const episodesQuery = query(
						episodesCollection,
						orderBy('upload', 'asc')
					)
					const episodesCollectionDocs = await getDocs(episodesQuery)
					setEpisodes([])
					episodesCollectionDocs.docs.forEach(doc => {
						setEpisodes(prevState => {
							if (prevState) {
								return [...prevState, doc.id]
							} else {
								return [doc.id]
							}
						})
					})
				}
				getEpisodes()
			}
		}
	}, [props.season, props.showName])

	return (
		<div className={classes.Season}>
			<h1>{props.season}</h1>
			<ol>
				{episodes?.map(ep => {
					return (
						<li>
							<a href='#' onClick={() => props.updateEpisode(ep, props.season)}>
								{ep}
							</a>
						</li>
					)
				})}
			</ol>
		</div>
	)
}

export default Season
