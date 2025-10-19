'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { GoSearch } from 'react-icons/go'
import { IoMdClose } from 'react-icons/io'

const SearchButton = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const isSearchVisible = searchParams.get('showSearch') === 'true'

	const handleToggleSearch = () => {
		const newSearchParams = new URLSearchParams(searchParams.toString())
		if (isSearchVisible) {
			newSearchParams.delete('showSearch')
		} else {
			newSearchParams.set('showSearch', 'true')
		}
		// Обновление URL без перезагрузки страницы
		router.replace(`?${newSearchParams.toString()}`, { scroll: false })
	}

	return (
		<li onClick={handleToggleSearch} className='cursor-pointer'>
			{isSearchVisible ? (
				<IoMdClose className='text-2xl lg:hover:text-black' />
			) : (
				<GoSearch className='text-2xl lg:hover:text-black' />
			)}
		</li>
	)
}

export default SearchButton
