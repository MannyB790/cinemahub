import { Fragment, useEffect, useState } from 'react'
import classes from '../../../../styles/layout/navigation.module.css'
import Burger from './Burger'
import DesktopNav from './DesktopNav'
import Logo from './Logo'
import MobileNav from './MobileNav'
import SearchBar from './SearchBar'

const Nav: React.FC<{ search: boolean }> = props => {
	const [expanded, setExpanded] = useState(false)

	useEffect(() => {
		if (expanded) {
			document.body.style.overflowY = 'hidden'
		} else {
			document.body.style.overflowY = 'scroll'
		}
	}, [expanded])

	return (
		<Fragment>
			<nav className={classes.Nav}>
				<Logo />
				<DesktopNav />
				<MobileNav expanded={expanded} />
				<Burger expanded={expanded} setExpanded={setExpanded} />
			</nav>
			{props.search && <SearchBar />}
		</Fragment>
	)
}

export default Nav
