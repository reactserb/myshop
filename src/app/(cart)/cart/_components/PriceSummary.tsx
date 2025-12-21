import { CartItem } from '@/lib/types/cart'
import { getFullEnding } from '@/lib/utils/getWordEnding'
import { formatPriceWithSpaces } from '@/lib/utils/price/formatPriceWithSpaces'

interface PriceSummaryProps {
	visibleCartItems: CartItem[]
	totalMaxPrice: number
	totalDiscount: number
	totalPrice: number
}

const PriceSummary = ({
	visibleCartItems,
	totalMaxPrice,
	totalDiscount,
	totalPrice,
}: PriceSummaryProps) => {
	return (
		<>
			<div className='flex flex-col gap-y-2.5 pb-6 border-b-2 border-gray-300'>
				<div className='flex flex-row justify-between'>
					<p className='text-gray-500'>
						{visibleCartItems.length}{' '}
						{`товар${getFullEnding(visibleCartItems.length)}`}
					</p>
					<p>{formatPriceWithSpaces(totalMaxPrice)} ₽</p>
				</div>
				{!!totalDiscount && (
					<div className='flex flex-row justify-between'>
						<p className='text-gray-500'>Скидка</p>
						<p className='text-teal-500 font-bold'>
							-{formatPriceWithSpaces(totalDiscount)} ₽
						</p>
					</div>
				)}
				<div className='flex flex-row justify-between'>
					<p className='text-gray-500'>Доставка</p>
					<p>500 ₽</p>
				</div>
			</div>
			<div className='flex flex-col items-end justify-between gap-y-6'>
				<div className='text-gray-500 font-semibold flex flex-row justify-between items-center w-full'>
					<span>Итог :</span>
					<span className='text-2xl text-main-text'>
						{formatPriceWithSpaces(totalPrice + 500)} ₽
					</span>
				</div>
			</div>
		</>
	)
}

export default PriceSummary
