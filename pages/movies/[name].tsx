import { Fragment, useEffect, useRef, useState } from 'react'
import Nav from '../../src/components/layout/navigation/Nav'

import classes from '../../styles/layout/Movies/Movie/Movie.module.css'
import { getDownloadURL, ref } from '@firebase/storage'
import { storage } from '../../firebase/firebase'
import Player from '../../src/components/layout/Player/Player'

const Name = () => {
	const [URL, setURL] = useState('')
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		const videoRef = ref(storage, 'movies/vid.mp4')
		getDownloadURL(videoRef).then(e => {
			setURL(e)
		})
	}, [])

	return (
		<Fragment>
			<Nav search={false} />
			<div className={classes.Movie}>
				<Player
					src={URL}
					title='Coco - Maika ti e gei'
					description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque iusto
				hic at reprehenderit voluptatum, ipsum laborum alias ipsa voluptatibus
				et tempora quisquam rem inventore totam nam, ratione minima eum, tempore
				repellendus laudantium. Atque cum quasi nobis blanditiis, molestiae
				vitae eius! Reiciendis, eaque labore debitis magnam expedita laudantium
				nemo consequuntur nostrum!'
					director='Baba ti'
					genre={['Action', 'Sex', 'Drama']}
					released={23 / 23 / 23}
					stars={['Ivan', 'Georgi', 'Preslava']}
				/>
			</div>
		</Fragment>
	)
}

export default Name
