'use client'

import { LuStar } from 'react-icons/lu'

const FavoriteButton = () => {
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		console.log('Добавить в избранное!')
	}

	return (
		<button
			onClick={handleClick}
			className='w-8 h-8 absolute z-[15] top-2 right-1 cursor-pointer xl:hidden xl:group-hover:flex'
		>
			<LuStar className='text-2xl text-gray-400 xl:hover:text-black' />
		</button>
	)
}

export default FavoriteButton
