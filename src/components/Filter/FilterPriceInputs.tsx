import { formatPriceWithSpaces } from '@/lib/utils/price/formatPriceWithSpaces'

interface FilterPriceInputsProps {
	inputValues: { from: number | null; to: number | null }
	priceRange: { min: number; max: number }
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FilterPriceInputs = ({
	inputValues,
	priceRange,
	handleInputChange,
}: FilterPriceInputsProps) => {
	return (
		<div className='flex gap-x-2 items-center justify-between'>
			<div className='flex flex-col justify-between'>
				<span className='opacity-50 text-sm'>От</span>

				<div className='flex items-center gap-x-1'>
					<span className='opacity-50 text-base'>₽</span>

					<input
						type='text'
						name='from'
						value={
							inputValues.from !== null
								? formatPriceWithSpaces(inputValues.from)
								: ''
						}
						placeholder={`${formatPriceWithSpaces(priceRange.min)}`}
						onChange={handleInputChange}
						className='h-10 w-[85px] opacity-75 outline-none'
					/>
				</div>
			</div>

			<div className='flex flex-col justify-between'>
				<span className='opacity-50 text-sm'>До</span>

				<div className='flex items-center gap-x-1'>
					<span className='opacity-50 text-base'>₽</span>

					<input
						type='text'
						name='to'
						value={
							inputValues.to !== null
								? formatPriceWithSpaces(inputValues.to)
								: ''
						}
						placeholder={`${formatPriceWithSpaces(priceRange.max)}`}
						onChange={handleInputChange}
						className='h-10 w-[85px] opacity-75 outline-none'
					/>
				</div>
			</div>
		</div>
	)
}
export default FilterPriceInputs
