import { useEffect, useState } from 'react'
import classes from '../../../../styles/layout/navigation.module.css'
import Select from '../../UI/Select/Select'

const SearchBar = () => {
	const [search, setSearch] = useState<string | null>(null)
	const [year, setYear] = useState<number>()
	const [genre, setGenre] = useState<string>()

	useEffect(() => {
		const DATE = new Date()
		const currentYear = DATE.getFullYear()
		setYear(currentYear)
	}, [])

	return (
		<form className={classes.SearchBar}>
			<input
				type='text'
				placeholder='Search Movies and Shows'
				onChange={e => setSearch(e.target.value)}
			/>
			<div className={classes.Options}>
				<Select text='Year:' values={[2021, 2020, 2019, 2018, 2017, 2016]} />
				<Select
					text='Genre:'
					values={['Action', 'Comedy', 'Horror', 'Triller']}
				/>
			</div>
		</form>
	)
}

export default SearchBar
