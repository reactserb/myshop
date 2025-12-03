interface PriceFilterHeaderProps {
	isFilterPriceActive: boolean
	resetPriceFilter: () => void
}

const PriceFilterHeader = ({
	isFilterPriceActive,
	resetPriceFilter,
}: PriceFilterHeaderProps) => {
	return (
		<div className='flex justify-between items-center'>
			<p className='text-base'>Цена</p>

			{isFilterPriceActive && (
				<button
					type='button'
					onClick={resetPriceFilter}
					className='text-sm opacity-50 hover:opacity-100 cursor-pointer'
				>
					Сбросить
				</button>
			)}
		</div>
	)
}
export default PriceFilterHeader
