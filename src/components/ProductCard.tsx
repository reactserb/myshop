import { ProductCardProps } from '@/types/product'
import Image from 'next/image'
import { IoStarOutline } from 'react-icons/io5'
import { calculateFinalPrice } from '@/utils/price/calculateFinalPrice'
import { formatPriceWithSpaces } from '@/utils/price/formatPriceWithSpaces'
import { SiZend } from 'react-icons/si'

const ProductCard = (product: ProductCardProps) => {
	const finalPrice = calculateFinalPrice(
		product.basePrice,
		product.discountPercent
	)

	return (
		<div className='group flex flex-col flex-1 justify-between items-center w-35 rounded overflow-hidden sm:w-60 p-1 xl:p-5 outline-1 outline-solid outline-transparent hover:outline-gray-300'>
			<div className='relative w-35 h-35 sm:w-60 sm:h-60'>
				<Image
					src={product.img}
					alt='action'
					fill
					className='object-contain p-2'
				/>
				<button className='w-8 h-8 absolute top-1 right-1 xl:-top-3 cursor-pointer hidden group-hover:flex'>
					<IoStarOutline className='text-2xl text-gray-400 hover:text-black' />
				</button>
			</div>
			<div className='flex flex-col text-center mb-5'>
				<div>{product.title}</div>
				<div className='text-gray-400'>{product.description}</div>
			</div>
			{product.discountPercent > 0 && (
				<div className='flex flex-col'>
					<div>
						<span className='line-through'>
							{formatPriceWithSpaces(product.basePrice)} ₽
						</span>{' '}
						<span className='bg-yellow-200 p-1 rounded'>
							-{product.discountPercent} %
						</span>
					</div>
					<div className='text-center text-red-500 mb-2'>
						{formatPriceWithSpaces(finalPrice)} ₽
					</div>
				</div>
			)}
			{!product.discountPercent && (
				<div className='mb-2'>{formatPriceWithSpaces(product.basePrice)} ₽</div>
			)}
			<div className='flex flex-wrap gap-2 justify-center items-center hidden group-hover:flex'>
				{product.sizes.map(size => (
					<button
						key={size}
						className='min-w-8 h-8 flex justify-center items-center bg-gray-200 rounded text-sm cursor-pointer hover:bg-gray-400 transition-colors duration-300'
					>
						{size}
					</button>
				))}
			</div>
		</div>
	)
}
export default ProductCard
