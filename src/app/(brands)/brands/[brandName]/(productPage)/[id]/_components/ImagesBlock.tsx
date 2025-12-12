import { ProductCardProps } from '@/lib/types/product'
import Image from 'next/image'

const ImagesBlock = ({ product }: { product: ProductCardProps }) => {
	const { img, title } = product
	return (
		<div className='flex flex-col mb-10 md:flex-row md:gap-x-8 md:gap-x-12 h-[248px] xl:h-[496px]'>
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
							sizes='64px'
						/>
					</div>
				))}
			</div>
			<Image
				src={img}
				alt={title}
				width={504}
				height={496}
				className='w-full h-full object-contain'
				sizes='(max-width: 768px) 248px, (max-width: 1032px) 272px, 504px'
				priority
			/>
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
							sizes='64px'
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default ImagesBlock
