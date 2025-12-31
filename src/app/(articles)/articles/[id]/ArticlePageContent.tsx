import { ArticleCardProps } from '@/lib/types/article'
import Image from 'next/image'

const ProductPageContent = ({ article }: { article: ArticleCardProps }) => {
	const { img, title, text, createdAt, extratext } = article

	return (
		<section className='mx-auto max-w-3xl px-4 py-8 bg-white rounded-lg shadow-sm border border-gray-100'>
			<div className='flex flex-col gap-y-6'>
				<h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 leading-tight'>
					{title}
				</h1>
				<time
					dateTime={typeof createdAt === 'string' ? createdAt : ''}
					className='text-sm text-gray-500'
				>
					{new Date(createdAt).toLocaleDateString('ru-RU', {
						day: '2-digit',
						month: 'long',
						year: 'numeric',
					})}
				</time>

				<div className='text-gray-800 text-base leading-relaxed'>{text}</div>

				<div className='flex justify-center'>
					<Image
						src={img}
						alt={title}
						width={504}
						height={496}
						className='w-full h-full object-contain rounded-md border border-gray-200'
						style={{ width: '100%', height: 'auto' }}
						sizes='(max-width: 768px) 400px, 500px'
						priority
					/>
				</div>

				{extratext && (
					<div className='text-gray-700 text-base leading-relaxed'>
						{extratext}
					</div>
				)}
			</div>
		</section>
	)
}

export default ProductPageContent
