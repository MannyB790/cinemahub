import { createUserWithEmailAndPassword } from '@firebase/auth'
import { doc, setDoc } from '@firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { auth, db } from '../../../../firebase/firebase'

import classes from '../../../../styles/layout/Auth/Auth.module.css'

const Signup = () => {
	const router = useRouter()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const authHandler = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault()

		if (email?.includes('@')) {
			if (password.length > 5) {
				createUserWithEmailAndPassword(auth, email, password)
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
			<input type='email' onChange={e => setEmail(e.target.value)} />
			<label>Password</label>
			<input type='password' onChange={e => setPassword(e.target.value)} />
			<p>{error}</p>
			<button type='submit'>Sign Up</button>
			<Link href='/login'>or Log In</Link>
		</form>
	)
}

export default Signup
