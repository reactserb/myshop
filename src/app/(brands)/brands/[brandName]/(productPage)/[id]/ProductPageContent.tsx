import { ProductCardProps } from '@/lib/types/product'
import CartButton from './_components/CartButton'
import ProductOffer from './_components/ProductOffer'
import { LuStar } from 'react-icons/lu'
import ImagesBlock from './_components/ImagesBlock'
import ShareButton from './_components/ShareButton'
import { calculateFinalPrice } from '@/lib/utils/price/calculateFinalPrice'
import SizeButtons from './_components/SizeButtons'
import SimilarProducts from './_components/SimilarProducts'
import RecentlyViewed from './_components/RecentlyViewed'
import { ViewHistoryLogger } from './_components/ViewHistoryLogger'

interface ProductPageContentProps {
	product: ProductCardProps
	productId: string
}

const ProductPageContent = ({
	product,
	productId,
}: ProductPageContentProps) => {
	const { discountPercent, basePrice, description, title, article, sizes } =
		product

	const finalPrice = calculateFinalPrice(basePrice, discountPercent)

	return (
		<div className='flex flex-col gap-y-25 md:gap-y-20 xl:gap-y-30'>
			<ViewHistoryLogger productId={productId} />
			<div className='flex flex-col md:flex-row md:flex-wrap gap-10 w-full text-center justify-center'>
				<ImagesBlock product={product} />
				<div className='md:w-[344px] lg:w-[376px] flex flex-col gap-y-5'>
					<div>
						<h1 className='text-2xl'>{title}</h1>
						<h2 className='text-md text-gray-400'>{description}</h2>
					</div>
					<SizeButtons sizes={sizes} />
					<ProductOffer
						finalPrice={finalPrice}
						basePrice={basePrice}
						discountPercent={discountPercent}
					/>
					<CartButton />
					<div className='text-sm'>арт. {article}</div>

					<ShareButton title={title} />
					<button className='flex flex-row ml-2 flex-wrap gap-2 items-center justify-center group cursor-pointer'>
						<LuStar className='w-6 h-6 cursor-pointer select-none text-gray-400 group-hover:text-gray-700' />
						<p className='text-sm group-hover:opacity-50'>В избранное</p>
					</button>
				</div>
			</div>
			<SimilarProducts currentProduct={product} finalPrice={finalPrice} />
			<RecentlyViewed finalPrice={finalPrice} />
		</div>
	)
}

export default ProductPageContent
