import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import articles from '../data/articles.json'
import ArticleCard from './ArticleCard'

const Articles = () => {
	return (
		<section>
			<div className='flex flex-col justify-center'>
				<div className='flex flex-row justify-between items-center mb-5 px-2'>
					<h2 className='text-lg sm:text-xl'>Блог</h2>
					<Link
						href='#'
						className='flex flex-row items-center text-left gap-x-2 cursor-pointer'
					>
						<p className='text-sm sm:text-base text-center'>Все статьи</p>
						<IoIosArrowForward className='text-xl' />
					</Link>
				</div>
				<ul className='flex flex-row flex-wrap justify-around gap-4'>
					{articles.slice(0, 3).map((article, index) => (
						<li
							key={article.id}
							className={`
                                block
                                ${index >= 2 ? 'hidden lg:block' : ''}
							`}
						>
							{<ArticleCard {...article} />}
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
export default Articles
