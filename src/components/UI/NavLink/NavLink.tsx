import Link from 'next/link'
import { useRouter } from 'next/router'

const NavLink: React.FC<{ href: string; class: any }> = props => {
	const router = useRouter()
	const URL = router.pathname

	return (
		<li className={URL == props.href ? props.class : ''}>
			<Link href={props.href}>{props.children}</Link>
		</li>
	)
}

export default NavLink
