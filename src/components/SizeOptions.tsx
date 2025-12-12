'use client'

import { SizeOptionsProps } from '@/lib/types/sizeOptions'

const SizeOptions = ({ sizes }: SizeOptionsProps) => {
	const handleClick = (e: React.MouseEvent, size: string) => {
		e.preventDefault()
		e.stopPropagation()
	}

	return (
		<div className='absolute inset-y-0 w-full z-10 flex flex-wrap justify-center content-end pb-5 gap-2 bg-white opacity-50 hidden xl:group-hover:flex'>
			{sizes.map(size => (
				<button
					key={size}
					onClick={e => handleClick(e, size)}
					className='min-w-8 h-8 flex justify-center items-center bg-gray-300 rounded text-sm cursor-pointer hover:bg-gray-500 transition-colors duration-300'
				>
					{size === size.toString() ? size.toUpperCase() : size}
				</button>
			))}
		</div>
	)
}

export default SizeOptions
