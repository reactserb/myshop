import { buttonStyles } from '@/app/(auth)/styles'
import { CartSummaryProps } from '@/lib/types/cart'
import { getFullEnding } from '@/lib/utils/getWordEnding'
import { formatPriceWithSpaces } from '@/lib/utils/price/formatPriceWithSpaces'

const CartSummary = ({
	visibleCartItems,
	totalPrice,
	totalDiscount,
	totalMaxPrice,
}: CartSummaryProps) => {
	return (
		<>
			<div className='flex flex-col gap-y-2.5 pb-6 border-b-2 border-gray-300'>
				<div className='flex flex-row justify-between'>
					<p className='text-gray-500'>
						{visibleCartItems.length}{' '}
						{`товар${getFullEnding(visibleCartItems.length)}`}
					</p>
					<p className=''>{formatPriceWithSpaces(totalMaxPrice)} ₽</p>
				</div>
				{!!totalDiscount && (
					<div className='flex flex-row justify-between'>
						<p className='text-[#8f8f8f]'>Скидка</p>
						<p className='text-[#ff6633] font-bold'>
							-{formatPriceWithSpaces(totalDiscount)} ₽
						</p>
					</div>
				)}
			</div>

			<div className='flex flex-col items-end justify-between gap-y-6'>
				<div className='text-gray-500 font-semibold flex flex-row justify-between items-center w-full'>
					<span>Итог :</span>
					<span className='text-2xl text-main-text'>
						{formatPriceWithSpaces(totalPrice)} ₽
					</span>
				</div>
				<div className='w-full'>
					<button
						disabled={visibleCartItems.length === 0}
						className={`p-3 rounded mx-auto w-full text-2xl cursor-pointer hover:bg-teal-500 ${
							visibleCartItems.length > 0
								? buttonStyles.active
								: buttonStyles.inactive
						}`}
					>
						Оформить заказ
					</button>
				</div>
			</div>
		</>
	)
}

export default CartSummary
