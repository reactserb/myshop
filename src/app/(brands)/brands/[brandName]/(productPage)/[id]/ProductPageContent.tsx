import { ProductCardProps } from '@/lib/types/product'
import ImagesBlock from './_components/ImagesBlock'
import ShareButton from './_components/ShareButton'
import { calculateFinalPrice } from '@/lib/utils/price/calculateFinalPrice'
import SimilarProducts from './_components/SimilarProducts'
import RecentlyViewed from './_components/RecentlyViewed'
import { ViewHistoryLogger } from './_components/ViewHistoryLogger'
import ClientInfo from './_components/ClientInfo'

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
		<div className='flex flex-col gap-y-10 xl:gap-y-15'>
			<ViewHistoryLogger productId={productId} />
			<div className='flex flex-col md:flex-row md:flex-wrap gap-y-10 gap-x-3 w-full text-center justify-center'>
				<ImagesBlock product={product} />
				<div className='md:w-[344px] lg:w-[376px] flex flex-col gap-y-5'>
					<div>
						<h1 className='text-2xl'>{title}</h1>
						<h2 className='text-md text-gray-400'>{description}</h2>
					</div>
					<ClientInfo
						sizes={sizes}
						finalPrice={finalPrice}
						basePrice={basePrice}
						discountPercent={discountPercent}
						productId={productId}
					/>
					<div className='text-sm'>арт. {article}</div>
					<ShareButton title={title} />
				</div>
			</div>
			<SimilarProducts currentProduct={product} finalPrice={finalPrice} />
			<RecentlyViewed finalPrice={finalPrice} />
		</div>
	)
}

export default ProductPageContent
