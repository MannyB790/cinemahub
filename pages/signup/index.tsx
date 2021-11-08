import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firebase'
import Signup from '../../src/components/layout/Auth/Signup'

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
				<Signup />
			</div>
		</Fragment>
	)
}

export default index
