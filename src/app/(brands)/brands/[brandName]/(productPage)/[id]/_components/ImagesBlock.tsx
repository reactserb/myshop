import FavoriteButton from '@/components/FavoriteButton'
import { ProductCardProps } from '@/lib/types/product'
import Image from 'next/image'

const ImagesBlock = ({ product }: { product: ProductCardProps }) => {
	const { img, title, id } = product
	return (
		<div className='flex flex-col md:flex-row items-center justify-center gap-x-5'>
			<div className='group relative'>
				<Image
					src={img}
					alt={title}
					width={504}
					height={496}
					className='w-full h-full object-contain xl:-mt-10'
					style={{ width: 'auto', height: 'auto' }}
					sizes='(max-width: 768px) 400px, 500px'
					priority
				/>
				<FavoriteButton productId={id.toString()} />
			</div>
		</div>
	)
}

export default ImagesBlock
