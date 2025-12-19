import { CartItemProps } from '@/lib/types/cart'
import { calculateFinalPrice } from '@/lib/utils/price/calculateFinalPrice'
import Link from 'next/link'
import CartSkeletons from './CartSekeletons'
import SelectionCheckbox from './SelectionCheckbox'
import { formatPriceWithSpaces } from '@/lib/utils/price/formatPriceWithSpaces'
import DiscountBadge from './DiscountBadge'
import Image from 'next/image'

export default function CartItem({
	item,
	productData,
	isSelected,
	onSelectionChange,
}: CartItemProps) {
	if (!productData) {
		return <CartSkeletons />
	}

	const totalFinalPrice = calculateFinalPrice(
		productData?.basePrice || 0,
		productData?.discountPercent || 0
	)

	const hasDiscount = productData.discountPercent > 0

	return (
		<div className='flex items-center lg:gap-4 w-full'>
			<div className='flex items-center justify-center w-12 h-20 flex-shrink-0'>
				<SelectionCheckbox
					isSelected={isSelected}
					onSelectionChange={onSelectionChange}
					productId={item.productId}
					size={item.size}
				/>
			</div>

			<Link
				href={`/brands/${productData.title}/${item.productId}?desc=${encodeURIComponent(productData.description)} ${productData.title}`}
				className='group/card flex-1 flex items-center md:min-w-100 gap-4 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:shadow-gray-400 transition-all duration-300 hover:-translate-y-1'
			>
				<div className='flex-1 min-w-0'>
					<h3 className='text-lg font-medium text-gray-900 hover:text-gray-700 mb-1 break-words whitespace-pre-wrap xl:whitespace-nowrap'>
						{productData.description} {productData.title}
					</h3>
					<div className='flex items-center gap-2 mb-2 text-sm'>
						<span className='px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium'>
							{item.size.toUpperCase()}
						</span>
					</div>
					<div className='flex flex-col xs:flex-row xs:items-center gap-2 text-sm'>
						{hasDiscount && (
							<span className='text-gray-500 line-through'>
								{formatPriceWithSpaces(productData.basePrice)} ₽
							</span>
						)}

						<span className='text-xl font-bold text-gray-900'>
							{formatPriceWithSpaces(totalFinalPrice)} ₽
						</span>
						{hasDiscount && (
							<DiscountBadge discountPercent={productData.discountPercent} />
						)}
					</div>
				</div>

				<div className='w-25 h-25 sm:w-30 sm:h-30 p-1 rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center group relative cursor-pointer transition-all duration-400 hover:scale-200 hover:z-30 flex-shrink-0'>
					<Image
						src={productData.img}
						alt={productData.title}
						width={180}
						height={180}
						className='object-contain group-hover:scale-100 transition-transform duration-400'
					/>
				</div>
			</Link>
		</div>
	)
}
