import ViewAllButton from '@/components/ViewAllButton'
import { ArticlesSectionProps } from '@/types/articlesSection'
import ArticleCard from './ArticleCard'

const ArticlesSection = ({
	title,
	viewAllButtons,
	articles,
	compact = false,
}: ArticlesSectionProps) => {
	return (
		<section>
			<div className={`flex flex-col ${compact ? 'justify-center' : ''}`}>
				<div className='flex flex-row justify-between items-center mb-5 px-5'>
					<h2 className='text-md sm:text-xl'>{title}</h2>
					<ViewAllButton
						btnText={viewAllButtons.btnText}
						href={viewAllButtons.href}
					/>
				</div>
				{compact ? (
					<ul className='flex flex-row flex-wrap justify-around gap-4'>
						{articles.slice(0, 3).map((article, index) => (
							<li
								key={article._id}
								className={`
                                flex
                                ${index >= 2 ? 'hidden xl:flex' : ''}
							`}
							>
								{<ArticleCard {...article} />}
							</li>
						))}
					</ul>
				) : (
					<ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center'>
						{articles.map(article => (
							<li key={article._id}>{<ArticleCard {...article} />}</li>
						))}
					</ul>
				)}
			</div>
		</section>
	)
}
export default ArticlesSection
