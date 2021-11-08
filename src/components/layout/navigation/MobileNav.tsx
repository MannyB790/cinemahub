import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../../firebase/firebase'

import classes from '../../../../styles/layout/navigation.module.css'

const MobileNav: React.FC<{ expanded: boolean }> = props => {
	const [user] = useAuthState(auth)

	const styles = [classes.MobileNav, !props.expanded && classes.Hidden].join(
		' '
	)

	return (
		<div className={styles}>
			<ul>
				<li>
					<Link href='/'>Home</Link>
				</li>
				<li>
					<Link href='/movies'>Movies</Link>
				</li>
				<li>
					<Link href='/shows'>Shows</Link>
				</li>
				{user ? (
					<li>
						<Link href='/profile'>Profile</Link>
					</li>
				) : (
					<li>
						<Link href='/login'>Login</Link>
					</li>
				)}
			</ul>
		</div>
	)
}

export default MobileNav
