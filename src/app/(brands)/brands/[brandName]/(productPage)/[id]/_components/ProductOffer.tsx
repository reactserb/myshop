import { formatPriceWithSpaces } from '@/lib/utils/price/formatPriceWithSpaces'

interface ProductOfferProps {
	finalPrice: number
	basePrice: number
	discountPercent: number
}

const ProductOffer = ({
	finalPrice,
	basePrice,
	discountPercent,
}: ProductOfferProps) => {
	return (
		<div>
			{discountPercent > 0 && (
				<div className='flex flex-col mb-2 text-center'>
					<div>
						<div className='text-red-500 mb-2 text-xl'>
							{formatPriceWithSpaces(finalPrice)} ₽
						</div>
						<span className='line-through'>
							{formatPriceWithSpaces(basePrice)} ₽
						</span>{' '}
						<span className='bg-yellow-200 p-1 rounded'>
							-{discountPercent} %
						</span>
					</div>
				</div>
			)}
			{!discountPercent && (
				<div className='mb-2 text-xl'>{formatPriceWithSpaces(basePrice)} ₽</div>
			)}
		</div>
	)
}

export default ProductOffer
