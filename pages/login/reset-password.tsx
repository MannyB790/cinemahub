import { sendPasswordResetEmail } from '@firebase/auth'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { auth } from '../../firebase/firebase'
import Link from 'next/link'

import classes from '../../styles/layout/Auth/Auth.module.css'

const ResetPassword = () => {
	const router = useRouter()

	const [email, setEmail] = useState('')
	const [error, setError] = useState('')

	const passwordHandler = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault()

		sendPasswordResetEmail(auth, email)
			.then(() => {
				setError('Check your e-mail for a password reset link.')
				setTimeout(() => {
					router.push('/login')
				}, 3000)
			})
			.catch(() => {
				setError('Something went wrong.')
			})
	}

	return (
		<form
			className={[classes['Auth'], classes['AuthForm']].join(' ')}
			onSubmit={passwordHandler}
		>
			<label>E-Mail</label>
			<input type='email' onChange={e => setEmail(e.target.value)} />
			<button type='submit'>Send Reset E-Mail</button>
			<Link href='/login'>or Log in</Link>
			<p className={classes.Error}>{error}</p>
		</form>
	)
}

export default ResetPassword
