import { ProductCardProps } from '@/types/product'
import Image from 'next/image'
import { IoStarOutline } from 'react-icons/io5'
import { calculateFinalPrice } from '@/utils/price/calculateFinalPrice'
import { formatPriceWithSpaces } from '@/utils/price/formatPriceWithSpaces'

const ProductCard = (product: ProductCardProps) => {
	const finalPrice = calculateFinalPrice(
		product.basePrice,
		product.discountPercent
	)

	return (
		<div className='group relative flex flex-col flex-1 justify-between items-center rounded overflow-hidden sm:w-60 p-1 xl:p-5 outline-1 outline-solid outline-transparent hover:outline-gray-300'>
			<div className='relative w-60 h-60'>
				<Image
					src={product.img}
					alt='action'
					fill
					className='object-contain p-2'
					sizes='(max-width: 640px) 140px, 240px'
				/>
				<button className='w-8 h-8 absolute z-20 top-1 right-1 xl:-top-3 cursor-pointer xl:hidden xl:group-hover:flex'>
					<IoStarOutline className='text-2xl text-gray-400 xl:hover:text-black' />
				</button>
			</div>
			<div className='flex flex-col text-center mb-5'>
				<div>{product.title}</div>
				<div className='text-gray-400'>{product.description}</div>
			</div>
			{product.discountPercent > 0 && (
				<div className='flex flex-col group-hover:opacity-0'>
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
				<div className='mb-2 group-hover:opacity-0'>
					{formatPriceWithSpaces(product.basePrice)} ₽
				</div>
			)}
			<div className='absolute inset-y-0 w-full z-10 flex flex-wrap justify-center content-end pb-5 gap-2 bg-white opacity-75 hidden group-hover:flex'>
				{product.sizes.map(size => (
					<button
						key={size}
						className='min-w-8 h-8 flex justify-center items-center bg-gray-300 rounded text-sm cursor-pointer hover:bg-gray-500 transition-colors duration-300'
					>
						{size}
					</button>
				))}
			</div>
		</div>
	)
}
export default ProductCard
