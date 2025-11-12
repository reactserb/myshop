import { ArticleCardProps } from '@/lib/types/article'
import { getDB } from '@/lib/utils/api-routes'

const getDBArticles = async (options?: {
	articlesLimit?: number
	pagination?: { startId: number; perPage: number }
}) => {
	try {
		const db = await getDB()
		const collection = db.collection<ArticleCardProps>('articles')

		let items: ArticleCardProps[]
		let totalCount = 0

		if (options?.articlesLimit) {
			items = await collection
				.find()
				.sort({ createdAt: -1 })
				.limit(options.articlesLimit)
				.toArray()

			totalCount = items.length
		} else if (options?.pagination) {
			const { startId, perPage } = options.pagination
			totalCount = await collection.countDocuments()

			items = await collection
				.find()
				.sort({ createdAt: -1 })
				.skip(startId)
				.limit(perPage)
				.toArray()
		} else {
			items = await collection.find().toArray()
			totalCount = items.length
		}

		return { items, totalCount }
	} catch (err) {
		throw err
	}
}

export default getDBArticles
