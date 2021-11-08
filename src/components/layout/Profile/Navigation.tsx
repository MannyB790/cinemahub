import { signOut } from '@firebase/auth'
import { useRouter } from 'next/router'
import { auth } from '../../../../firebase/firebase'
import classes from '../../../../styles/layout/Profile/Navigation.module.css'
import NavLink from '../../UI/NavLink/NavLink'

const Navigation = () => {
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
			<NavLink href='/cp' class={classes.Active}>
				Control Panel
			</NavLink>
			<NavLink href='/cp/users' class={classes.Active}>
				Users
			</NavLink>
			<NavLink href='/cp/requests' class={classes.Active}>
				Requests
			</NavLink>
			<button onClick={singOutHandler}>Log Out</button>
		</ul>
	)
}

export default Navigation
