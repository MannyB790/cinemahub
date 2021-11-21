import { collection, getDocs, QueryDocumentSnapshot } from '@firebase/firestore'
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
				const getEpisodeds = async () => {
					const episodesCollection = collection(
						db,
						`shows/${props.showName}/seasons/${props.season}/episodes`
					)
					const episodesCollectionDocs = await getDocs(episodesCollection)
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
				getEpisodeds()
			}
		}
	}, [props.season, props.showName])

	return (
		<div className={classes.Season}>
			<h1>{props.season}</h1>
			<ul>
				{episodes?.map(ep => {
					return (
						<li>
							<a href='#' onClick={() => props.updateEpisode(ep, props.season)}>
								{ep}
							</a>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Season
