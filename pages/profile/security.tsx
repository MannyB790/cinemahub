import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firebase'
import Navigation from '../../src/components/layout/Profile/Navigation'
import SecurityContent from '../../src/components/layout/Profile/Security'

import classes from '../../styles/layout/Profile/Profile.module.css'

const Security = () => {
	const router = useRouter()
	const [user] = useAuthState(auth)

	useEffect(() => {
		if (!user) {
			router.replace('/')
		}
	}, [router, user])

	return (
		<div className={classes.Profile}>
			<Navigation />
			<SecurityContent />
		</div>
	)
}

export default Security
