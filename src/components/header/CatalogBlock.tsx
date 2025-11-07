'use client'

import useClickOutside from '@/hooks/useClickOutside'
import useEscapeKey from '@/hooks/useEscapeKey'
import { CATALOG } from '@/lib/catalog'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'

const ANIMATION_DURATION = 300

const CatalogBlock = ({ handleClose }: { handleClose: () => void }) => {
	const catalogBlockRef = useRef<HTMLDivElement | null>(null)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		setIsVisible(true)
		document.body.style.overflow = 'hidden'

		return () => {
			document.body.style.overflow = ''
		}
	}, [])

	const handleCloseAnimation = () => {
		setIsVisible(false)
		setTimeout(() => {
			handleClose()
		}, ANIMATION_DURATION)
	}

	useClickOutside(catalogBlockRef, handleCloseAnimation)

	useEscapeKey(handleCloseAnimation)

	return (
		<div
			className={`
                fixed inset-0 z-[9999] bg-black/80
                transition-opacity duration-${ANIMATION_DURATION}
                ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
			onClick={handleCloseAnimation}
		>
			<div
				ref={catalogBlockRef}
				className={`
				border-r-1 border-gray-200 fixed top-0 left-0 bottom-0 pl-15 pr-20 py-8 z-[10000] bg-white
				transition-all duration-${ANIMATION_DURATION} ease-out transform
				${isVisible ? 'translate-x-0' : '-translate-x-full'}
			`}
				onClick={e => e.stopPropagation()}
			>
				<div className='relative flex flex-col'>
					<div className='flex items-center mb-15'>
						<div className='text-sm uppercase text-gray-400'>Каталог</div>
						<div>
							<button
								onClick={handleCloseAnimation}
								className='fixed right-2 top-5 cursor-pointer hover:opacity-75'
							>
								<IoMdClose className='text-3xl hover:text-black' />
							</button>
						</div>
					</div>
					<div className='flex flex-col gap-5'>
						{CATALOG.map(link => (
							<Link
								key={link.id}
								href={link.href}
								className='hover:opacity-75'
								onClick={handleCloseAnimation}
							>
								{link.name}
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
export default CatalogBlock
