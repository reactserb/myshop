import { ArticleCardProps } from '@/types/article'
import { getDB } from '@/utils/api-routes'

const getDBArticles = async () => {
	try {
		const db = await getDB()
		const articles = await db
			.collection<ArticleCardProps>('articles')
			.find()
			.toArray()

		if (!articles) throw new Error('Ошибка получения статей')

		return articles
	} catch (err) {
		console.log('Ошибка получения статей', err)
		throw err
	}
}

export default getDBArticles
