'use client'

import { ReactElement, ReactNode, useState } from 'react'
import { IoFilter } from 'react-icons/io5'
import React from 'react'
import MenuDrawer from '../MenuDrawer'

const FilterDrawerButton = ({ children }: { children: ReactNode }) => {
	const [isFilterOpen, setIsFilterOpen] = useState(false)

	const handleFilterOpen = () => {
		setIsFilterOpen(true)
	}

	const handleFilterClose = () => {
		setIsFilterOpen(false)
	}

	return (
		<>
			<button onClick={handleFilterOpen} className='lg:hidden p-5'>
				<div className='flex items-center gap-x-2 text-md'>
					<IoFilter className='text-xl' />
					<span>Фильтр</span>
				</div>
			</button>

			{isFilterOpen && (
				<MenuDrawer handleClose={handleFilterClose} direction='right'>
					{React.cloneElement(
						children as ReactElement<{ onCloseMenu: () => void }>,
						{
							onCloseMenu: handleFilterClose,
						}
					)}
				</MenuDrawer>
			)}
		</>
	)
}
export default FilterDrawerButton
