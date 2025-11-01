'use client'

import { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import CatalogBlock from './CatalogBlock'

const BurgerCatalogButton = () => {
	const [isOpenCatalogBlock, setisOpenCatalogBlock] = useState(false)

	const handleOpenCatalogBlock = () => {
		setisOpenCatalogBlock(true)
	}

	const handleCloseCatalogBlock = () => {
		setisOpenCatalogBlock(false)
	}

	return (
		<>
			<button onClick={handleOpenCatalogBlock} className='cursor-pointer'>
				<FiMenu className='text-xl md:hidden' />
			</button>
			{isOpenCatalogBlock && (
				<CatalogBlock handleClose={handleCloseCatalogBlock} />
			)}
		</>
	)
}
export default BurgerCatalogButton
