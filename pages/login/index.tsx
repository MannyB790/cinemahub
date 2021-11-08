import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firebase'
import Login from '../../src/components/layout/Auth/Signin'

import classes from '../../styles/layout/Auth/Auth.module.css'

const index = () => {
	const router = useRouter()
	const [user] = useAuthState(auth)

	useEffect(() => {
		if (user) {
			router.push('/')
		}
	}, [])

	return (
		<Fragment>
			<div className={classes.Auth}>
				<Login />
			</div>
		</Fragment>
	)
}

export default index
