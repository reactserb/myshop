'use client'

import { useState } from 'react'
import { GoSearch } from 'react-icons/go'
import { IoMdClose } from 'react-icons/io'
import InputSearchBlock from './InputSearchBlock'
import { AnimatePresence } from 'framer-motion'
import { useSearchOverlay } from './context/SearchOverlayContext'

const SearchButton = () => {
	const [isOpenSearch, setIsOpenSearch] = useState(false)
	const { setIsSearchOpen } = useSearchOverlay()

	const handleToggleSearch = () => {
		const newState = !isOpenSearch
		setIsOpenSearch(newState)
		setIsSearchOpen(newState)
	}

	const handleCloseSearch = () => {
		setIsOpenSearch(false)
		setIsSearchOpen(false)
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
			<AnimatePresence>
				{isOpenSearch && <InputSearchBlock handleClose={handleCloseSearch} />}
			</AnimatePresence>
		</li>
	)
}

export default SearchButton
