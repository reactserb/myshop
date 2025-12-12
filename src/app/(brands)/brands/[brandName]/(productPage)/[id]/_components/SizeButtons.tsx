'use client'

const SizeButtons = ({ sizes }: { sizes: string[] }) => {
	const handleClick = (e: React.MouseEvent, size: string) => {
		e.preventDefault()
		e.stopPropagation()
	}
	return (
		<div className='flex flex-col gap-y-3'>
			<span className='text-sm'>Доступные размеры</span>
			<div className='flex items-center justify-center gap-2'>
				{sizes.map(size => (
					<button
						key={size}
						onClick={e => handleClick(e, size)}
						className='min-w-8 h-8 flex justify-center items-center bg-gray-300 rounded text-sm cursor-pointer hover:bg-gray-500 hover:text-white transition-colors duration-300'
					>
						{size === size.toString() ? size.toUpperCase() : size}
					</button>
				))}
			</div>
		</div>
	)
}
export default SizeButtons
