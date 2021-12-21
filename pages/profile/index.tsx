import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firebase'
import Navigation from '../../src/components/layout/Profile/Navigation'
import Profile from '../../src/components/layout/Profile/Profile'

import classes from '../../styles/layout/Profile/Profile.module.css'

const Index = () => {
	const router = useRouter()
	const [user] = useAuthState(auth)

	useEffect(() => {
		if (!user) {
			router.replace('/')
		}
	}, [router, user])

	return (
		<Fragment>
			<div className={classes.Profile}>
				<Navigation />
				<Profile />
			</div>
		</Fragment>
	)
}

export default Index
