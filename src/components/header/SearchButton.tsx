'use client'

import { useState } from 'react'
import { GoSearch } from 'react-icons/go'
import { IoMdClose } from 'react-icons/io'
import InputSearchBlock from './InputSearchBlock'

const SearchButton = () => {
	const [isOpenSearch, setIsOpenSearch] = useState(false)

	const handleToggleSearch = () => {
		setIsOpenSearch(!isOpenSearch)
	}

	const handleCloseSearch = () => {
		setIsOpenSearch(false)
	}

	return (
		<li className='cursor-pointer'>
			<div onClick={handleToggleSearch}>
				{isOpenSearch ? (
					<IoMdClose className='text-2xl lg:hover:text-black' />
				) : (
					<GoSearch className='text-2xl lg:hover:text-black' />
				)}
			</div>
			{isOpenSearch && <InputSearchBlock handleClose={handleCloseSearch} />}
		</li>
	)
}

export default SearchButton
