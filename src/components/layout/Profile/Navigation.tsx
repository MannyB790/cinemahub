import { signOut } from '@firebase/auth'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../../firebase/firebase'
import classes from '../../../../styles/layout/Profile/Navigation.module.css'
import NavLink from '../../UI/NavLink/NavLink'

const Navigation = () => {
	const [user] = useAuthState(auth)

	const router = useRouter()

	const singOutHandler = () => {
		signOut(auth).then(() => {
			router.replace('/')
		})
	}

	return (
		<ul className={classes.Navigation}>
			<NavLink href='/profile' class={classes.Active}>
				Profile
			</NavLink>
			{/* <NavLink href='/profile/account' class={classes.Active}>
				Account
			</NavLink> */}
			<NavLink href='/profile/security' class={classes.Active}>
				Security
			</NavLink>
			{user?.email === 'admin@test.com' && (
				<NavLink href='/cp' class={classes.Active}>
					Control Panel
				</NavLink>
			)}
			{user?.email === 'admin@test.com' && (
				<NavLink href='/cp/users' class={classes.Active}>
					Users
				</NavLink>
			)}
			{user?.email === 'admin@test.com' && (
				<NavLink href='/cp/requests' class={classes.Active}>
					Requests
				</NavLink>
			)}

			<button onClick={singOutHandler}>Log Out</button>
		</ul>
	)
}

export default Navigation
