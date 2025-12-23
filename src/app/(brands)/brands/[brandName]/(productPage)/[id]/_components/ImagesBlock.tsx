import FavoriteButton from '@/components/FavoriteButton'
import { ProductCardProps } from '@/lib/types/product'
import Image from 'next/image'

const ImagesBlock = ({ product }: { product: ProductCardProps }) => {
	const { img, title, id } = product
	return (
		<div className='flex flex-col md:flex-row gap-x-5'>
			<div className='group relative flex-1 mx-auto max-w-[504px]'>
				<div className='w-full aspect-[504/496] relative rounded-lg overflow-hidden'>
					<Image
						src={img}
						alt={title}
						width={504}
						height={496}
						className='w-full h-auto object-contain image-loaded'
						sizes='(max-width: 768px) 450px, 500px'
						priority
						loading='eager'
					/>
					<div className='absolute inset-0 bg-gradient-to-r from-gray-200/80 via-gray-100/80 to-gray-200/80 backdrop-blur-sm image-skeleton'></div>
				</div>

				<FavoriteButton productId={id.toString()} />
			</div>
		</div>
	)
}

export default ImagesBlock
