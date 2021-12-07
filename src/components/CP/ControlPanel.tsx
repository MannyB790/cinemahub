import {
	collection,
	doc,
	getDocs,
	serverTimestamp,
	setDoc,
	updateDoc,
} from '@firebase/firestore'
import {
	ref,
	uploadBytesResumable,
	UploadTaskSnapshot,
} from '@firebase/storage'
import { ChangeEvent, FormEvent, useState } from 'react'
import { db, storage } from '../../../firebase/firebase'
import classes from '../../../styles/CP/ControlPanel.module.css'
import CPForms from '../../../styles/layout/Profile/Profile.module.css'

const ControlPanel = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [country, setCountry] = useState('')
	const [director, setDirector] = useState('')
	const [release, setRelease] = useState<string>()
	const [rating, setRating] = useState<number>()
	const [genre, setGenre] = useState<string[]>([])
	const [stars, setStars] = useState<string[]>([])
	const [thumbnail, setThumbnail] = useState<Blob | Uint8Array | ArrayBuffer>()
	const [file, setFile] = useState<Blob | Uint8Array | ArrayBuffer>()

	const [season, setSeason] = useState<number>()
	const [episode, setEpisode] = useState('')

	const [movieTask, setMovieTask] =
		useState<{ current: number; total: number }>()
	const [thumbnailTask, setThumbnailTask] =
		useState<{ current: number; total: number }>()

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

		if (season) {
			const showRef = doc(db, 'shows', `${title.replaceAll('-', ' ')}`)
			const seasonRef = doc(
				db,
				'shows',
				`${title.trim().replaceAll('-', ' ')}`,
				'seasons',
				`${season}`
			)
			const showEpisodesRef = doc(
				db,
				'shows',
				`${title.trim().replaceAll('-', ' ')}`,
				'seasons',
				`${season}`,
				`episodes`,
				`${episode}`
			)
			const showStorageRef = ref(
				storage,
				`shows/${title.replaceAll('-', ' ')}/${season}/${episode} Show`
			)
			const showThumbnailStorageRef = ref(
				storage,
				`shows/${title.replaceAll('-', ' ')}/${title.replaceAll(
					'-',
					' '
				)} Thumbnail`
			)

			await setDoc(showRef, {
				country,
				description,
				director,
				rating,
				release,
				genre,
				stars,
				views: 0,
			})

			await setDoc(seasonRef, {
				season: season,
			})

			await setDoc(showEpisodesRef, {
				upload: serverTimestamp(),
			})

			await uploadBytesResumable(showStorageRef, file!).on(
				'state_changed',
				e => {
					switch (e.state) {
						case 'error':
							alert('Something went wrong!')

						case 'success':
							alert('Movie Uploaded Succesfully!')

						case 'running':
							setMovieTask({
								current: e.bytesTransferred,
								total: e.totalBytes,
							})
					}
				}
			)
			await uploadBytesResumable(showThumbnailStorageRef, thumbnail!).on(
				'state_changed',
				e => {
					switch (e.state) {
						case 'error':
							alert('Something went wrong!')
							break
						case 'success':
							alert('Thumbnail Uploaded Succesfully!')
							break
						case 'running':
							setThumbnailTask({
								current: e.bytesTransferred,
								total: e.totalBytes,
							})
							break
					}
				}
			)
		} else {
			const movieRef = doc(db, 'movies', `${title.trim().replaceAll('-', ' ')}`)
			const movieStorageRef = ref(
				storage,
				`movies/${title.replaceAll('-', ' ')}/${title.replaceAll(
					'-',
					' '
				)} Movie`
			)
			const movieThumbnailStorageRef = ref(
				storage,
				`movies/${title.replaceAll('-', ' ')}/${title.replaceAll(
					'-',
					' '
				)} Thumbnail`
			)

			await setDoc(movieRef, {
				title,
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

			await uploadBytesResumable(movieStorageRef, file!).on(
				'state_changed',
				e => {
					switch (e.state) {
						case 'error':
							alert('Something went wrong!')

						case 'success':
							alert('Movie Uploaded Succesfully!')

						case 'running':
							setMovieTask({
								current: e.bytesTransferred,
								total: e.totalBytes,
							})
					}
				}
			)
			await uploadBytesResumable(movieThumbnailStorageRef, thumbnail!).on(
				'state_changed',
				e => {
					switch (e.state) {
						case 'error':
							alert('Something went wrong!')
							break
						case 'success':
							alert('Thumbnail Uploaded Succesfully!')
							break
						case 'running':
							setThumbnailTask({
								current: e.bytesTransferred,
								total: e.totalBytes,
							})
							break
					}
				}
			)
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
			<input
				type='number'
				onChange={e => setSeason(parseInt(e.target.value))}
			/>
			{season ? <label>Episode</label> : null}
			{season ? (
				<input type='text' onChange={e => setEpisode(e.target.value)} />
			) : null}
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
			{thumbnailTask && (
				<>
					<label htmlFor='thumbnailTask'>Thumbnail Uploading</label>
					<progress
						id='thumbnailTask'
						value={thumbnailTask?.current}
						max={thumbnailTask?.total}
					></progress>
				</>
			)}

			{movieTask && (
				<>
					<label htmlFor='movieTask'>Content Uploading...</label>
					<progress
						id='movieTask'
						value={movieTask?.current}
						max={movieTask?.total}
					>
						{movieTask.current}/{movieTask.total}
					</progress>
				</>
			)}
		</form>
	)
}

export default ControlPanel
