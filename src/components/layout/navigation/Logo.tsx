import Link from 'next/link'

import classes from '../../../../styles/layout/navigation.module.css'

const Logo = () => {
	return (
		<Link href='/'>
			<a className={classes.Logo}>Cinema Hub</a>
		</Link>
	)
}

export default Logo
