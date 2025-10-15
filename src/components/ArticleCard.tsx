import { ArticleCardProps } from '@/types/article'
import Image from 'next/image'
import Link from 'next/link'

const ArticleCard = (article: ArticleCardProps) => {
	return (
		<div className='flex flex-col flex-1 justify-between items-center w-35 rounded overflow-hidden sm:w-70 lg:80 align-top p-1 '>
			<div className='relative w-35 h-35 sm:w-70 sm:h-70 lg:w-80 lg:h-80'>
				<Image
					src={article.img}
					alt='action'
					fill
					className='object-contain p-2 hover:opacity-75'
				/>
			</div>
			<div className='flex flex-col gap-y-2 text-left mb-5'>
				<div className='text-gray-400'>
					{new Date(article.createdAt).toLocaleDateString('ru-RU')}
				</div>
				<div className='line-clamp-2'>{article.title}</div>
				<Link href='#' className='flex uppercase opacity-75'>
					<div className='relative group'>
						<span className='after:block after:absolute after:bottom-0 after:w-0 after:h-px after:bg-black after:content-[""] after:left-0 after:transition-all after:duration-300 group-hover:after:w-full '>
							Подробнее
						</span>
					</div>
				</Link>
			</div>
		</div>
	)
}
export default ArticleCard
