import { ArticleCardProps } from '@/lib/types/article'
import { CONFIG } from '../../../config/config'
import ArticlesSection from './ArticlesSection'
import getDBArticles from './getDBArticles'
import ErrorComponent from '@/components/ErrorComponent'

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
	} catch (error) {
		return (
			<ErrorComponent
				error={error instanceof Error ? error : new Error(String(error))}
				userMessage='Ошибка: не удалось загрузить статьи'
			/>
		)
	}
}
export default Articles
