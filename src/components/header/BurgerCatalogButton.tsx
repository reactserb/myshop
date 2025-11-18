'use client'

import { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import MenuDrawer from '../MenuDrawer'
import React from 'react'
import CatalogBlock from './CatalogBlock'

const BurgerCatalogButton = () => {
	const [isOpenCatalogBlock, setIsOpenCatalogBlock] = useState(false)

	const handleOpenCatalogBlock = () => {
		setIsOpenCatalogBlock(true)
	}

	const handleCloseCatalogBlock = () => {
		setIsOpenCatalogBlock(false)
	}

	return (
		<>
			<button onClick={handleOpenCatalogBlock} className='cursor-pointer'>
				<FiMenu className='text-xl md:hidden' />
			</button>
			{isOpenCatalogBlock && (
				<MenuDrawer handleClose={handleCloseCatalogBlock}>
					<CatalogBlock handleClose={handleCloseCatalogBlock} />
				</MenuDrawer>
			)}
		</>
	)
}
export default BurgerCatalogButton
