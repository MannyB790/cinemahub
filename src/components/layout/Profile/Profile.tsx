import React, { useEffect, useRef, useState } from 'react'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, storage } from '../../../../firebase/firebase'

import solid from '../../../../public/images/Icons/solid.svg'
import Image from 'next/image'

import classes from '../../../../styles/layout/Profile/Profile.module.css'
import { updateProfile } from '@firebase/auth'
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytes,
} from '@firebase/storage'

const Profile = () => {
	const [user] = useAuthState(auth)
	const [URL, setURL] = useState<any>('')
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [username, setUsername] = useState('')
	const [image, setImage] = useState<any>(null)

	useEffect(() => {
		const getURL = async () => {
			if (user?.photoURL) {
				const imageRef = await ref(storage, `users/${user?.uid}`)
				const URL = await getDownloadURL(imageRef)
				setURL(URL)
			}
		}
		getURL()
	}, [user?.photoURL])

	const pfpHandler = () => {
		inputRef.current?.click()
	}

	const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (image) {
			const imageRef = ref(storage, `users/${user?.uid}`)
			await uploadBytes(imageRef, image)
			updateProfile(auth.currentUser!, {
				photoURL: await getDownloadURL(imageRef),
			}).then(() => {
				user?.reload()
			})
		}

		if (username.length > 5) {
			updateProfile(auth.currentUser!, {
				displayName: username,
			})
		}
	}

	const removePFPHandler = () => {
		updateProfile(auth.currentUser!, {
			photoURL: '',
		}).then(() => {
			const imageRef = ref(storage, `users/${user?.uid}`)
			deleteObject(imageRef)
		})
	}

	return (
		<form className={classes.ProfilePage} onSubmit={updateHandler}>
			<div className={classes.DisplayProfile}>
				<Image
					src={URL ? URL : solid}
					width={100}
					height={100}
					onClick={pfpHandler}
				/>

				{user?.photoURL && (
					<button className={classes.removePFP} onClick={removePFPHandler}>
						Remove profile picture
					</button>
				)}
				<input
					type='file'
					className={classes.ImagePrompt}
					ref={inputRef}
					onChange={e => setImage(e.target.files![0])}
				/>
				{/* <div className={classes.ProfileInfo}> */}
				<label>Username</label>
				<input
					value={user?.displayName!}
					type='text'
					onChange={e => setUsername(e.target.value)}
				/>
				<label>E-Mail</label>
				<input type='text' value={user?.email!} disabled />
				{/* </div> */}
				<button type='submit' className={classes.Update}>
					Update
				</button>
			</div>
		</form>
	)
}

export default Profile
