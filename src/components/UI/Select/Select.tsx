import classes from '../../../../styles/UI/Select.module.css'

const Select: React.FC<{ text: string; values: number[] | string[] }> =
	props => {
		return (
			<div className={classes.CustomSelect}>
				<p>{props.text}</p>
				<select>
					{props.values.map(value => {
						return (
							<option key={value} value={value}>
								{value}
							</option>
						)
					})}
				</select>
			</div>
		)
	}

export default Select
