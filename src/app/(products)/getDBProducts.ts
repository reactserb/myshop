import { ProductCardProps } from '@/types/product'
import { getDB } from '@/utils/api-routes'

const getDBProducts = async (category: string) => {
	try {
		const db = await getDB()
		const products = await db
			.collection<ProductCardProps>('products')
			.find({ categories: category })
			.toArray()

		if (!products) throw new Error('Ошибка получения товаров')

		return products
	} catch (err) {
		console.log(`Ошибка получения: ${category}`, err)
		throw err
	}
}

export default getDBProducts
