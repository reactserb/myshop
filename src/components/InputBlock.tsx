'use client'

import useClickOutside from '@/hooks/useClickOutside'
import useEscapeKey from '@/hooks/useEscapeKey'
import { useEffect, useRef, useState } from 'react'
import { GoSearch } from 'react-icons/go'

const InputBlock = ({ handleClose }: { handleClose: () => void }) => {
	const inputBlockRef = useRef<HTMLDivElement | null>(null)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		setIsVisible(true)
	}, [])

	const handleCloseAnimation = () => {
		setIsVisible(false)
		setTimeout(() => {
			handleClose() //
		}, 300) // Длительность должна соответствовать или быть меньше transition-duration
	}

	useClickOutside(inputBlockRef, handleCloseAnimation)

	useEscapeKey(handleCloseAnimation)

	return (
		<div
			ref={inputBlockRef}
			className={`
				border-b-1 border-gray-200 shadow-[var(--shadow-thick)] fixed top-0 right-0 left-0 z-10000 bg-white
				mt-20 pt-10 pb-20 sm:pb-30 md:pb-40 px-5
				transition-all duration-300 ease-out transform
				${isVisible ? 'translate-y-0' : '-translate-y-full'}
			`}
		>
			<div className='relative max-w-[1408px] m-auto'>
				<input
					placeholder='Найти товар'
					className='w-full bg-gray-100 h-10 rounded p-4 pr-10 focus:outline-none focus:text-black hover:bg-gray-200 leading-[150%]'
				/>
				<button className='absolute top-2 right-7 cursor-pointer'>
					<GoSearch className='text-xl' />
				</button>
			</div>
		</div>
	)
}
export default InputBlock
