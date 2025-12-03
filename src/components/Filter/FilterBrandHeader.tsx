import {
	FilterProductSize,
	FilterProductSizeArray,
} from '@/lib/types/sizeOptions'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

interface FilterBrandHeaderProps {
	toggleBrand: () => void
	isBrandOpen: boolean
	isFilterBrandActive: boolean
	resetBrandFilter: () => void
	sortedBrands: string[]
	selectedBrands: FilterProductSizeArray
	handleBrandChange: (size: FilterProductSize, isChecked: boolean) => void
}

const FilterBrandHeader = ({
	toggleBrand,
	isBrandOpen,
	isFilterBrandActive,
	resetBrandFilter,
	sortedBrands,
	selectedBrands,
	handleBrandChange,
}: FilterBrandHeaderProps) => {
	return (
		<>
			{' '}
			<div
				className='flex justify-between items-center cursor-pointer'
				onClick={toggleBrand}
			>
				<div className='flex items-center gap-x-1'>
					<p className='text-base'>Бренд</p>

					<span className='transition-transform duration-300'>
						{isBrandOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
					</span>
				</div>

				{isFilterBrandActive && (
					<button
						type='button'
						onClick={e => {
							e.stopPropagation()

							resetBrandFilter()
						}}
						className='text-sm opacity-50 hover:opacity-100 cursor-pointer'
					>
						Сбросить
					</button>
				)}
			</div>
			{isBrandOpen && (
				<div className='max-h-[200px] overflow-y-auto pr-2'>
					<ul className='space-y-3'>
						{sortedBrands.map(brand => (
							<li key={brand}>
								<label className='flex items-center space-x-3 cursor-pointer'>
									<input
										type='checkbox'
										className='h-5 w-5 rounded border-gray-300 accent-black'
										checked={selectedBrands.includes(brand)}
										onChange={e => handleBrandChange(brand, e.target.checked)}
									/>

									<span className='text-gray-700'>{brand}</span>
								</label>
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	)
}
export default FilterBrandHeader
