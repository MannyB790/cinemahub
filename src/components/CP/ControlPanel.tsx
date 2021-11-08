import { doc, serverTimestamp, setDoc } from '@firebase/firestore'
import { ref, uploadBytes } from '@firebase/storage'
import { ChangeEvent, FormEvent, useState } from 'react'
import { db, storage } from '../../../firebase/firebase'
import classes from '../../../styles/CP/ControlPanel.module.css'
import CPForms from '../../../styles/layout/Profile/Profile.module.css'

const ControlPanel = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [country, setCountry] = useState('')
	const [director, setDirector] = useState('')
	const [release, setRelease] = useState('')
	const [rating, setRating] = useState<number>()
	const [genre, setGenre] = useState<string[]>([])
	const [stars, setStars] = useState<string[]>([])
	const [thumbnail, setThumbnail] = useState<any>()
	const [file, setFile] = useState<any>()

	const [season, setSeason] = useState<number>()

	const genreHandler = (e: ChangeEvent<HTMLInputElement>): void => {
		const genreArr = e.target.value.split(',')
		setGenre(genreArr)
	}

	const starsHandler = (e: ChangeEvent<HTMLInputElement>): void => {
		const starsArr = e.target.value.split(',')
		setStars(starsArr)
	}

	const uploadHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const now = new Date()

		console.log()

		if (season) {
			const showRef = doc(db, 'shows', `${title}`)

			await setDoc(showRef, {})
		} else {
			const movieRef = doc(db, 'movies', `${title}`)
			const movieStorageRef = ref(storage, `movies/${title} Movie`)
			const movieThumbnailStorageRef = ref(storage, `movies/${title} Thumbnail`)

			await setDoc(movieRef, {
				country,
				description,
				director,
				rating,
				release,
				genre,
				stars,
				views: 0,
				uploadTime: serverTimestamp(),
			})

			await uploadBytes(movieStorageRef, file)
			await uploadBytes(movieThumbnailStorageRef, thumbnail)
		}
	}

	const styles = [classes['CP'], CPForms['ProfilePage']].join(' ')

	return (
		<form className={styles} onSubmit={uploadHandler}>
			<label>Title</label>
			<input type='text' onChange={e => setTitle(e.target.value)} />
			<label>Description</label>
			<textarea onChange={e => setDescription(e.target.value)}></textarea>
			<label>Country</label>
			<input type='text' onChange={e => setCountry(e.target.value)} />
			<label>Director</label>
			<input type='text' onChange={e => setDirector(e.target.value)} />
			<label>Release Date</label>
			<input type='text' onChange={e => setRelease(e.target.value)} />
			<label>Rating</label>
			<input
				type='text'
				onChange={e => setRating(parseFloat(e.target.value))}
			/>
			<label>Season (Leave empty if uploading a movie)</label>
			<input type='text' onChange={e => setSeason(parseInt(e.target.value))} />
			<label>Genre (Seperate by coma)</label>
			<input type='text' onChange={genreHandler} />
			<label>Stars (Separate by coma)</label>
			<input type='text' onChange={starsHandler} />
			<label>Thumbnail</label>
			<input type='file' onChange={e => setThumbnail(e.target.files![0])} />
			<label>Movie File</label>
			<input type='file' onChange={e => setFile(e.target.files![0])} />
			<button type='submit' className={CPForms.Upload}>
				Upload
			</button>
		</form>
	)
}

export default ControlPanel
