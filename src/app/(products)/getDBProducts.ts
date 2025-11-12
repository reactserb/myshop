import { ProductCardProps } from '@/lib/types/product'
import { getDB } from '@/lib/utils/api-routes'
import { Filter } from 'mongodb'

const getDBProducts = async (
	category?: string,
	options?: {
		randomLimit?: number
		pagination?: { startId: number; perPage: number }
		brand?: string
	}
) => {
	try {
		const db = await getDB()
		const collection = db.collection<ProductCardProps>('products')

		let items: ProductCardProps[]
		let totalCount = 0

		const filter: Filter<ProductCardProps> = {}

		if (category) {
			filter.categories = category
		}

		if (options?.brand) {
			filter.title = options.brand
		}

		if (options?.randomLimit) {
			items = await collection
				.aggregate<ProductCardProps>([
					{ $match: filter },
					{ $sample: { size: options.randomLimit } },
				])
				.toArray()

			totalCount = items.length
		} else if (options?.pagination) {
			const { startId, perPage } = options.pagination

			totalCount = await collection.countDocuments(filter)

			items = await collection
				.find(filter)
				.skip(startId)
				.limit(perPage)
				.toArray()
		} else {
			items = await collection.find(filter).sort({ brandName: 1 }).toArray()
			totalCount = items.length
		}

		return { items, totalCount }
	} catch (err) {
		throw err
	}
}

export default getDBProducts
