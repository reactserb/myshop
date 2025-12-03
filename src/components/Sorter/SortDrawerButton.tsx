'use client'

import { ReactElement, ReactNode, useState } from 'react'
import { BiSort, BiSortDown, BiSortUp } from 'react-icons/bi'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import MenuDrawer from '../MenuDrawer'
import { sortOptions } from './Sorter'

const SortDrawerButton = ({ children }: { children: ReactNode }) => {
	const searchParams = useSearchParams()
	const currentSortValue = searchParams.get('sort') || 'default'

	const [isSortOpen, setIsSortOpen] = useState(false)

	const activeSortOption = sortOptions.find(
		opt => opt.value === currentSortValue
	)

	let buttonText = 'Сортировка'

	if (activeSortOption && activeSortOption.value !== 'default') {
		buttonText = activeSortOption.label
	}

	let SortIconComponent = null
	if (currentSortValue === 'price_asc') {
		SortIconComponent = <BiSortUp className='text-3xl' />
	} else if (currentSortValue === 'price_desc') {
		SortIconComponent = <BiSortDown className='text-3xl' />
	}

	const handleSortOpen = () => {
		setIsSortOpen(true)
	}

	const handleSortClose = () => {
		setIsSortOpen(false)
	}
	return (
		<>
			<button onClick={handleSortOpen} className='lg:hidden p-5'>
				<div className='flex items-center gap-x-1 text-md'>
					{SortIconComponent ? (
						SortIconComponent
					) : (
						<BiSort className='text-xl' />
					)}
					<span>{buttonText}</span>
				</div>
			</button>

			{isSortOpen && (
				<MenuDrawer handleClose={handleSortClose} direction='right'>
					{React.cloneElement(
						children as ReactElement<{ onCloseMenu: () => void }>,
						{
							onCloseMenu: handleSortClose,
						}
					)}
				</MenuDrawer>
			)}
		</>
	)
}
export default SortDrawerButton
