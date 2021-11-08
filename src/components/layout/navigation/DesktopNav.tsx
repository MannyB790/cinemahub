import Link from 'next/link'
import Image from 'next/image'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, storage } from '../../../../firebase/firebase'

import classes from '../../../../styles/layout/navigation.module.css'

import solid from '../../../../public/images/Icons/solid.svg'
import { useEffect, useState } from 'react'
import { getDownloadURL, ref } from '@firebase/storage'

const DesktopNav = () => {
	const [user] = useAuthState(auth)
	const [URL, setURL] = useState<any>('')

	useEffect(() => {
		const getURL = async () => {
			if (user?.photoURL) {
				const imageRef = await ref(storage, `users/${user?.uid}`)
				const URL = await getDownloadURL(imageRef)
				setURL(URL)
			}
		}
		getURL()
	}, [user?.photoURL])

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
			{user ? (
				<li>
					<Link href='/profile'>
						<Image src={URL ? URL : solid} width={50} height={50} priority />
					</Link>
				</li>
			) : (
				<li>
					<Link href='/login'>Login</Link>
				</li>
			)}
		</ul>
	)
}

export default DesktopNav
