import { ProductCardProps } from '@/lib/types/product'
import Image from 'next/image'
import { calculateFinalPrice } from '@/lib/utils/price/calculateFinalPrice'
import { formatPriceWithSpaces } from '@/lib/utils/price/formatPriceWithSpaces'
import Link from 'next/link'
import FavoriteButton from './FavoriteButton'
import SizeOptions from './SizeOptions'
import { GoSearch } from 'react-icons/go'

const ProductCard = (product: ProductCardProps) => {
	const finalPrice = calculateFinalPrice(
		product.basePrice,
		product.discountPercent
	)

	return (
		<div className='group relative flex flex-col flex-1 justify-between items-center rounded overflow-hidden sm:w-60 p-1 xl:p-5 outline-1 outline-solid outline-transparent hover:outline-gray-300 cursor-pointer'>
			<FavoriteButton />
			<Link
				href={`/products/${product._id}`}
				className='w-8 h-8 absolute z-[20] top-10 right-1 cursor-pointer hidden xl:group-hover:flex'
			>
				<GoSearch className='text-2xl text-gray-400 xl:hover:text-black' />
			</Link>
			<SizeOptions sizes={product.sizes} />

			<Link
				href={`/products/${product._id}`}
				className='flex flex-col w-full items-center justify-between flex-grow relative'
			>
				<div className='relative w-60 h-60'>
					<Image
						src={product.img}
						alt='action'
						fill
						className='object-contain p-2'
						sizes='(max-width: 640px) 140px, 240px'
					/>
				</div>

				<div className='flex flex-col text-center mb-5'>
					<div>{product.title}</div>
					<div className='text-gray-400'>{product.description}</div>
				</div>

				{product.discountPercent > 0 && (
					<div className='flex flex-col xl:group-hover:opacity-0'>
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
					<div className='mb-2 xl:group-hover:opacity-0'>
						{formatPriceWithSpaces(product.basePrice)} ₽
					</div>
				)}
			</Link>
		</div>
	)
}
export default ProductCard
