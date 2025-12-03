import {
	FilterProductSize,
	FilterProductSizeArray,
} from '@/lib/types/sizeOptions'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

interface FilterSizeHeaderProps {
	toggleSize: () => void
	isSizeOpen: boolean
	isFilterSizeActive: boolean
	resetSizeFilter: () => void
	sortedSizes: string[]
	selectedSizes: FilterProductSizeArray
	handleSizeChange: (size: FilterProductSize, isChecked: boolean) => void
}

const FilterSizeHeader = ({
	toggleSize,
	isSizeOpen,
	isFilterSizeActive,
	resetSizeFilter,
	sortedSizes,
	selectedSizes,
	handleSizeChange,
}: FilterSizeHeaderProps) => {
	return (
		<>
			<div
				className='flex justify-between items-center cursor-pointer'
				onClick={toggleSize}
			>
				<div className='flex items-center gap-x-1'>
					<p className='text-base'>Размер</p>

					<span className='transition-transform duration-300'>
						{isSizeOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
					</span>
				</div>

				{isFilterSizeActive && (
					<button
						type='button'
						onClick={e => {
							e.stopPropagation()

							resetSizeFilter()
						}}
						className='text-sm opacity-50 hover:opacity-100 cursor-pointer'
					>
						Сбросить
					</button>
				)}
			</div>
			{isSizeOpen && (
				<div className='max-h-[200px] overflow-y-auto pr-2'>
					<ul className='space-y-3'>
						{sortedSizes.map(size => (
							<li key={size}>
								<label className='flex items-center space-x-3 cursor-pointer'>
									<input
										type='checkbox'
										className='h-5 w-5 rounded border-gray-300 accent-black'
										checked={selectedSizes.includes(size)}
										onChange={e => handleSizeChange(size, e.target.checked)}
									/>

									<span className='text-gray-700'>
										{typeof size === 'string' ? size.toUpperCase() : size}
									</span>
								</label>
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	)
}
export default FilterSizeHeader
