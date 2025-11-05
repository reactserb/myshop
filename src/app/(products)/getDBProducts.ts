import { ProductCardProps } from '@/lib/types/product'
import { getDB } from '@/lib/utils/api-routes'

const getDBProducts = async (
	category: string,
	options?: {
		randomLimit?: number
		pagination?: { startId: number; perPage: number }
	}
) => {
	try {
		const db = await getDB()
		const collection = db.collection<ProductCardProps>('products')

		let items: ProductCardProps[]
		let totalCount = 0

		if (options?.randomLimit) {
			items = await collection
				.aggregate<ProductCardProps>([
					{ $match: { categories: category } }, // Сначала фильтруем по категории
					{ $sample: { size: options.randomLimit } }, // Затем выбираем случайные N документов
				])
				.toArray()

			totalCount = items.length
		} else if (options?.pagination) {
			const { startId, perPage } = options.pagination
			totalCount = await collection.countDocuments({ categories: category })

			items = await collection
				.find({ categories: category })
				.sort({ _id: 1 })
				.skip(startId)
				.limit(perPage)
				.toArray()
		} else {
			items = await collection.find({ categories: category }).toArray()
			totalCount = items.length
		}

		if (!items) throw new Error('Ошибка получения товаров')

		return { items, totalCount }
	} catch (err) {
		console.log(`Ошибка получения: ${category}`, err)
		throw err
	}
}

export default getDBProducts
