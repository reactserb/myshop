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

		return { items, totalCount }
	} catch (err) {
		throw err
	}
}

export default getDBBrands
