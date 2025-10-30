import ArticlesSection from './ArticlesSection'
import getDBArticles from './getDBArticles'

const Articles = async () => {
	try {
		const articles = await getDBArticles()

		return (
			<ArticlesSection
				title='Статьи'
				viewAllButtons={{ btnText: 'Все статьи', href: 'articles' }}
				articles={articles}
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
