import FavoriteButton from '@/components/FavoriteButton'
import { ProductCardProps } from '@/lib/types/product'
import Image from 'next/image'

const ImagesBlock = ({ product }: { product: ProductCardProps }) => {
	const { img, title, id } = product
	return (
		<div className='flex flex-col md:flex-row md:gap-x-8 h-[248px] xl:h-[496px]'>
			<div className='hidden md:flex md:flex-col md:justify-between md:h-full md:shrink-0'>
				{[...Array(5)].map((_, index) => (
					<div
						key={index}
						className='relative bg-white w-20 h-[80px] flex items-center justify-center overflow-hidden shrink-0'
					>
						<Image
							src={img}
							alt={`${title} - миниатюра ${index + 1}`}
							fill
							className='object-cover'
							sizes='80px'
							loading='lazy'
						/>
					</div>
				))}
			</div>
			<div className='group relative flex-1 max-w-[504px] max-h-[496px] mx-auto md:max-w-none md:max-h-none'>
				<Image
					src={img}
					alt={title}
					width={504}
					height={496}
					className='w-full h-full object-contain'
					style={{ width: 'auto', height: 'auto' }}
					sizes='(max-width: 768px) 350px, 500px'
					priority
					quality={85}
				/>
				<FavoriteButton productId={id.toString()} />
			</div>
			<div className='md:hidden flex flex-row justify-center h-full shrink-0'>
				{[...Array(5)].map((_, index) => (
					<div
						key={index}
						className='relative bg-white w-15 h-[60px] flex items-center justify-center overflow-hidden shrink-0'
					>
						<Image
							src={img}
							alt={`${title} - миниатюра ${index + 1}`}
							fill
							className='object-cover'
							sizes='60px'
							loading='lazy'
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default ImagesBlock
