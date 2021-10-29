import { useEffect, useState } from 'react'
import classes from '../../../../styles/layout/navigation.module.css'
import Burger from './Burger'
import DesktopNav from './DesktopNav'
import Logo from './Logo'
import MobileNav from './MobileNav'

const Nav = () => {
	const [expanded, setExpanded] = useState(false)

	useEffect(() => {
		if (expanded) {
			document.body.style.overflowY = 'hidden'
		} else {
			document.body.style.overflowY = 'scroll'
		}
	}, [expanded])

	return (
		<nav className={classes.Nav}>
			<Logo />
			<DesktopNav />
			<MobileNav expanded={expanded} />
			<Burger expanded={expanded} setExpanded={setExpanded} />
		</nav>
	)
}

export default Nav
