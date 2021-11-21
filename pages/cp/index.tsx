import Navigation from '../../src/components/layout/Profile/Navigation'
import ControlPanel from '../../src/components/CP/ControlPanel'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firebase'

import classes from '../../styles/layout/Profile/Profile.module.css'
import { useRouter } from 'next/router'
const CP = () => {
	const router = useRouter()
	const [user] = useAuthState(auth)

	// if (!user) {
	// 	router.replace('/')
	// }

	if (user?.email === 'admin@test.com') {
		return (
			<div className={classes.Profile}>
				<Navigation />
				<ControlPanel />
			</div>
		)
	} else {
		return null
	}
}

export default CP
