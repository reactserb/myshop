import { ProductCardProps } from '@/lib/types/product'
import Image from 'next/image'
import { calculateFinalPrice } from '@/lib/utils/price/calculateFinalPrice'
import { formatPriceWithSpaces } from '@/lib/utils/price/formatPriceWithSpaces'
import Link from 'next/link'
import FavoriteButton from './FavoriteButton'
import SizeOptions from './SizeOptions'
import { LuSearch } from 'react-icons/lu'

const ProductCard = (product: ProductCardProps) => {
	const { id, description, title, discountPercent, basePrice, img, sizes } =
		product

	const finalPrice = calculateFinalPrice(basePrice, discountPercent)

	return (
		<div className='group relative flex flex-col flex-1 justify-between items-center rounded overflow-hidden sm:w-60 p-1 xl:p-5 outline-1 outline-solid outline-transparent hover:outline-gray-300 cursor-pointer'>
			<FavoriteButton />
			<Link
				href={`/brands/${title}/${id}?desc=${encodeURIComponent(description)} ${title}`}
				className='w-8 h-8 absolute z-20 top-10 right-1 cursor-pointer hidden xl:group-hover:flex'
			>
				<LuSearch className='text-2xl text-gray-400 xl:hover:text-black' />
			</Link>
			<SizeOptions sizes={sizes} />

			<Link
				href={`/brands/${title}/${id}?desc=${encodeURIComponent(description)} ${title}`}
				className='flex flex-col w-full items-center justify-between flex-grow relative'
			>
				<div className='relative w-60 h-60'>
					<Image
						src={img}
						alt='action'
						fill
						className='object-contain p-2'
						sizes='(max-width: 640px) 140px, 240px'
					/>
				</div>

				<div className='flex flex-col text-center mb-5'>
					<div>{title}</div>
					<div className='text-gray-400'>{description}</div>
				</div>

				{discountPercent > 0 && (
					<div className='flex flex-col text-center xl:group-hover:opacity-0'>
						<div>
							<span className='line-through'>
								{formatPriceWithSpaces(basePrice)} ₽
							</span>{' '}
							<span className='bg-yellow-200 p-1 rounded'>
								-{discountPercent} %
							</span>
						</div>
						<div className='text-red-500 mb-2'>
							{formatPriceWithSpaces(finalPrice)} ₽
						</div>
					</div>
				)}
				{!discountPercent && (
					<div className='mb-2 xl:group-hover:opacity-0'>
						{formatPriceWithSpaces(basePrice)} ₽
					</div>
				)}
			</Link>
		</div>
	)
}
export default ProductCard
