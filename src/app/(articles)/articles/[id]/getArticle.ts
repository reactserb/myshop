import { ArticleCardProps } from '@/lib/types/article'
import { getDB } from '@/lib/utils/api-routes'

export async function getArticle(id: string): Promise<ArticleCardProps> {
	try {
		const db = await getDB()

		const article = await db
			.collection<ArticleCardProps>('articles')
			.findOne({ id: parseInt(id) })

		if (!article) {
			throw new Error(`Статья с ID ${id} не найдена`)
		}

		return article as ArticleCardProps
	} catch (error) {
		console.error('Failed to fetch article:', error)
		throw error
	}
}
