import { collection, getDocs, OrderByDirection } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../../../firebase/firebase'
import classes from '../../../../styles/layout/navigation.module.css'
import Select from '../../UI/Select/Select'

const SearchBar: React.FC<{
	setSortBy?: (e: string) => void
	setSortType?: (e: OrderByDirection) => void
	setGenre?: (e: string) => void
	setYear?: (e: string) => void
}> = () => {
	const [search, setSearch] = useState<string | null>(null)
	const [years, setYears] = useState<string[]>(['All'])
	const [genres, setGenres] = useState<string[]>(['All'])

	useEffect(() => {
		const getData = async () => {
			const genresRef = collection(db, 'genres')
			const genresDocs = await getDocs(genresRef)
			setGenres(['All'])
			genresDocs.docs.forEach(doc => {
				setGenres(prevState => {
					if (prevState) {
						return [...prevState, doc.id]
					} else {
						return [doc.id]
					}
				})
			})

			const yearsRef = collection(db, 'years')
			const yearsDocs = await getDocs(yearsRef)
			setYears(['All'])
			yearsDocs.docs.forEach(doc => {
				setYears(prevState => {
					if (prevState) {
						return [...prevState, doc.id]
					} else {
						return ['All', doc.id]
					}
				})
			})
		}

		getData()
	}, [])

	return (
		<form className={classes.SearchBar}>
			<input
				type='text'
				placeholder='Search Movies and Shows'
				onChange={e => setSearch(e.target.value)}
			/>
			<div className={classes.Options}>
				<Select text='Year:' values={years} />
				<Select text='Genre:' values={genres} />
				<Select text='Sort By:' values={['Title', 'Views', 'Release']} />
				<Select text='Sort Type:' values={['Asc', 'Desc']} />
			</div>
		</form>
	)
}

export default SearchBar
