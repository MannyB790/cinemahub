import classes from '../../../../styles/layout/navigation.module.css'

const Burger: React.FC<{
	expanded: boolean
	setExpanded: (e: boolean) => void
}> = props => {
	const styles = [classes.Burger, props.expanded && classes.Expanded].join(' ')

	return (
		<div onClick={() => props.setExpanded(!props.expanded)} className={styles}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

export default Burger
