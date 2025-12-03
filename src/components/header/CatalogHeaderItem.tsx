'use client'

import { CatalogItemProps } from '@/lib/types/catalog'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import DropdownMenu from './DropdownMenu'
import { useSearchOverlay } from './context/SearchOverlayContext'

interface Props {
	link: CatalogItemProps
}

const CatalogHeaderItem: React.FC<Props> = ({ link }) => {
	const [shouldShowMenu, setShouldShowMenu] = useState(false)

	const [hasBeenClicked, setHasBeenClicked] = useState(false)

	const { isSearchOpen } = useSearchOverlay()

	const handleMouseEnter = () => {
		if (isSearchOpen || hasBeenClicked) return

		setShouldShowMenu(true)
	}
	const handleMouseLeave = () => {
		setShouldShowMenu(false)

		setHasBeenClicked(false)
	}

	const closeMenu = useCallback(() => {
		setShouldShowMenu(false)
		setHasBeenClicked(true)
	}, [])
	const handleLinkClick = () => {
		setHasBeenClicked(true)
		setShouldShowMenu(false)
	}

	return (
		<div
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={`relative group ${isSearchOpen ? 'pointer-events-none' : ''}`}
		>
			<Link
				href={link.href}
				className='hover:opacity-75'
				onClick={handleLinkClick}
			>
				{link.name}
			</Link>

			<div
				className={`
                fixed left-0 right-0 z-10 transition-opacity duration-200
                ${
									shouldShowMenu ? 'opacity-100 visible' : 'opacity-0 invisible'
								}
                hidden md:block 
            `}
			>
				{shouldShowMenu && <DropdownMenu item={link} onClose={closeMenu} />}
			</div>
		</div>
	)
}

export default CatalogHeaderItem
