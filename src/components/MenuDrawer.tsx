'use client'

import useClickOutside from '@/hooks/useClickOutside'
import { useState, ReactNode, useEffect, useRef } from 'react'
import { IoMdClose } from 'react-icons/io'

interface FilterDrawerProps {
	children: ReactNode
	handleClose: () => void
	direction?: 'left' | 'right'
}

const ANIMATION_DURATION = 300

const MenuDrawer: React.FC<FilterDrawerProps> = ({
	children,
	handleClose,
	direction,
}) => {
	const menuDrawerRef = useRef<HTMLDivElement | null>(null)
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

	useClickOutside(menuDrawerRef, handleCloseAnimation)

	return (
		<div
			className={`
                fixed inset-0 z-[1000] bg-black/80
                transition-opacity duration-${ANIMATION_DURATION}
                ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
			onClick={handleCloseAnimation}
		>
			<div
				ref={menuDrawerRef}
				className={`
				w-[300px] fixed top-0 bottom-0 py-8 z-[1000] bg-white
				transition-all duration-${ANIMATION_DURATION} ease-out transform overflow-y-auto
				${direction === 'right' ? 'right-0 pr-20 pl-15' : 'left-0 pl-15 pr-20'}
				${
					isVisible
						? 'translate-x-0'
						: `${
								direction === 'right' ? 'translate-x-full' : '-translate-x-full'
							}`
				}
			`}
				onClick={e => e.stopPropagation()}
			>
				<div className='relative flex flex-col'>
					<div className='flex items-center'>
						<button
							onClick={handleCloseAnimation}
							className={`fixed cursor-pointer hover:opacity-75 ${
								direction === 'right' ? 'left-2 top-5' : 'right-2 top-5'
							}`}
						>
							<IoMdClose className='text-3xl hover:text-black' />
						</button>
					</div>
					{children}
				</div>
			</div>
		</div>
	)
}

export default MenuDrawer
