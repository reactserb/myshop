import { ArticleCardProps } from '@/lib/types/article'
import { CONFIG } from '../../../config/config'
import ArticlesSection from './ArticlesSection'
import getDBArticles from './getDBArticles'

const Articles = async () => {
	try {
		const { items } = await getDBArticles({
			articlesLimit: CONFIG.ITEMS_PER_PAGE_MAIN_ARTICLES,
		})

		return (
			<ArticlesSection
				title='Статьи'
				viewAllButtons={{ btnText: 'Все статьи', href: '/articles' }}
				articles={items as ArticleCardProps[]}
				compact
			/>
		)
	} catch {
		return (
			<div className='text-red-500 p-3'>
				Ошибка: не удалось загрузить статьи
			</div>
		)
	}
}
export default Articles
