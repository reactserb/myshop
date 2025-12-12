import { ProductCardProps } from '@/lib/types/product'
import Link from 'next/link'
import Image from 'next/image'
import { formatPriceWithSpaces } from '@/lib/utils/price/formatPriceWithSpaces'
import { getDB } from '@/lib/utils/api-routes'

interface SimilarProductsProps {
	currentProduct: ProductCardProps
	finalPrice: number
}

const SimilarProducts = async ({
	currentProduct,
	finalPrice,
}: SimilarProductsProps) => {
	try {
		const category = currentProduct.description

		if (!category) return null

		const db = await getDB()

		const similarProducts = await db
			.collection('products')
			.aggregate([
				{
					$match: {
						description: category,
						id: { $ne: currentProduct.id },
					},
				},
				{ $sample: { size: 10 } },
			])
			.toArray()

		if (!similarProducts || similarProducts.length === 0) {
			return null
		}

		return (
			<div className='flex flex-col relative'>
				<h3 className='xl:text-lg mb-2 text-gray-700 text-center xl:text-left px-3'>
					Вам может понравиться
				</h3>

				<div className='flex flex-row gap-x-2 xl:gap-x-6 overflow-x-auto pb-4 scrollbar-hide'>
					<div className='block absolute right-0 top-0 bottom-0 w-30 bg-gradient-to-l from-white to-transparent pointer-events-none z-10'></div>
					{similarProducts.map(
						({ id, description, basePrice, img, title, discountPercent }) => (
							<Link
								key={id}
								href={`/brands/${title}/${id}?desc=${encodeURIComponent(description)} ${title}`}
								className='text-main-text text-sm xl:text-lg flex flex-col min-w-[200px] w-[200px] xl:min-w-[300px] xl:w-[300px] rounded bg-white duration-300 p-2'
							>
								<div className='relative w-full h-[200px] xl:h-[250px] flex-shrink-0'>
									<Image
										src={img}
										alt={title}
										fill
										className='object-contain'
										sizes='(max-width: 768px) 200px, (max-width: 1280px) 250px, 300px'
									/>
								</div>
								<div>
									{discountPercent > 0 && (
										<div className='flex flex-col mb-2 text-center'>
											<div>
												<div className='text-black xl:text-red-500 mb-2 text-sm xl:text-lg'>
													{formatPriceWithSpaces(finalPrice)} ₽
												</div>
												<span className='hidden xl:block line-through text-xs xl:text-sm'>
													{formatPriceWithSpaces(basePrice)} ₽
												</span>{' '}
												<span className='hidden xl:block bg-yellow-200 p-1 rounded'>
													-{discountPercent} %
												</span>
											</div>
										</div>
									)}
									{!discountPercent && (
										<div className='mb-2 text-sm xl:text-lg text-center'>
											{formatPriceWithSpaces(basePrice)} ₽
										</div>
									)}
								</div>
							</Link>
						)
					)}
				</div>
			</div>
		)
	} catch (error) {
		console.error('Error fetching similar products:', error)
		return null
	}
}

export default SimilarProducts
