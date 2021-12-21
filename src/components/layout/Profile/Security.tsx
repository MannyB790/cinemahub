import {
	EmailAuthProvider,
	reauthenticateWithCredential,
	signOut,
	updatePassword,
} from '@firebase/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { auth } from '../../../../firebase/firebase'
import classes from '../../../../styles/layout/Profile/Profile.module.css'

const SecurityContent = () => {
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassowrd, setNewPassowrd] = useState('')
	const [reNewPassowrd, setReNewPassowrd] = useState('')
	const [error, setError] = useState('')

	const router = useRouter()

	const changePasswordHandler = () => {
		reauthenticateWithCredential(
			auth.currentUser!,
			EmailAuthProvider.credential(auth.currentUser?.email!, currentPassword)
		)
			.then(() => {
				if (
					newPassowrd.length > 5 &&
					reNewPassowrd.length > 5 &&
					newPassowrd === reNewPassowrd
				) {
					updatePassword(auth.currentUser!, newPassowrd)
						.then(() => {
							signOut(auth).then(() => {
								router.replace('/')
							})
						})
						.catch(e => {
							console.log(e)
							setError('Something went wrong')
						})
				}
			})
			.catch(e => {
				console.log(e)
				setError('Wrong Password')
			})
	}

	return (
		<div className={classes.ProfilePage}>
			{/* <h1>Change your password</h1> */}
			<label>Current Password</label>
			<input
				type='password'
				required
				onChange={e => setCurrentPassword(e.target.value)}
			/>
			<label>New Password</label>
			<input
				type='password'
				required
				onChange={e => setNewPassowrd(e.target.value)}
			/>
			<label>Repeat New Passoword</label>
			<input
				type='password'
				required
				onChange={e => setReNewPassowrd(e.target.value)}
			/>
			<p>{error}</p>
			<button className={classes.Update} onClick={changePasswordHandler}>
				Change
			</button>
		</div>
	)
}

export default SecurityContent
