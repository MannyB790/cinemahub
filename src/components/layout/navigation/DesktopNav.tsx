import Link from 'next/link'

import classes from '../../../../styles/layout/navigation.module.css'

const DesktopNav = () => {
	return (
		<ul className={classes.DesktopNav}>
			<li>
				<Link href='/'>Home</Link>
			</li>
			<li>
				<Link href='/movies'>Movies</Link>
			</li>
			<li>
				<Link href='/shows'>Shows</Link>
			</li>
			<li>
				<Link href='/login'>Login</Link>
			</li>
		</ul>
	)
}

export default DesktopNav
