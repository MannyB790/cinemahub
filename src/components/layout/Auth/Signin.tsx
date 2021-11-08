import { signInWithEmailAndPassword } from '@firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../../firebase/firebase'

import classes from '../../../../styles/layout/Auth/Auth.module.css'

const Signin = () => {
	const router = useRouter()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const authHandler = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault()

		if (email?.includes('@')) {
			if (password.length > 5) {
				signInWithEmailAndPassword(auth, email, password)
					.then(() => {
						router.replace('/')
					})
					.catch(e => {
						console.log(e)
					})
			} else {
				setError('Password must be longer than 5 characters.')
			}
		} else {
			setError('The E-Mail is invalid.')
		}
	}

	return (
		<form className={classes.AuthForm} onSubmit={authHandler}>
			<label>E-Mail</label>
			<input type='email' required onChange={e => setEmail(e.target.value)} />
			<label>Password</label>
			<input
				type='password'
				required
				onChange={e => setPassword(e.target.value)}
			/>
			<p>{error}</p>
			<Link href='/login/reset-password'>Forgor your password?</Link>
			<button type='submit'>Log In</button>
			<Link href='/signup'>or Sign Up</Link>
		</form>
	)
}

export default Signin
