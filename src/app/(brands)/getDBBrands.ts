import { BrandProps } from '@/lib/types/brand'
import { getDB } from '@/lib/utils/api-routes'

const getDBBrands = async (options?: {
	brandsLimit?: number
	pagination?: { startId: number; perPage: number }
}) => {
	try {
		const db = await getDB()
		const collection = db.collection<BrandProps>('brands')

		let items: BrandProps[]
		let totalCount = 0

		if (options?.brandsLimit) {
			items = await collection
				.aggregate<BrandProps>([{ $sample: { size: options.brandsLimit } }])
				.toArray()

			totalCount = items.length
		} else {
			items = await collection.find().sort({ brandName: 1 }).toArray()
			totalCount = items.length
		}

		if (!items) throw new Error('Ошибка получения брендов')

		return { items, totalCount }
	} catch (err) {
		console.log(`Ошибка получения брендов`, err)
		throw err
	}
}

export default getDBBrands
