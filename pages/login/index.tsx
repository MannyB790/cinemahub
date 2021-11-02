import { Fragment } from 'react'
import Login from '../../src/components/layout/Auth/Login'
import Nav from '../../src/components/layout/navigation/Nav'

import classes from '../../styles/layout/Auth/Auth.module.css'

const index = () => {
	return (
		<Fragment>
			<Nav search={false} />
			<div className={classes.Auth}>
				<Login />
			</div>
		</Fragment>
	)
}

export default index
