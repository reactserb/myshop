import { ProductCardProps } from '@/lib/types/product'
import { getDB } from '@/lib/utils/api-routes'

export async function getProduct(id: string): Promise<ProductCardProps> {
	try {
		const db = await getDB()

		const product = await db
			.collection<ProductCardProps>('products')
			.findOne({ id: parseInt(id) })

		if (!product) {
			throw new Error(`Товар с ID ${id} не найден`)
		}

		return product as ProductCardProps
	} catch (error) {
		console.error('Failed to fetch product:', error)
		throw error
	}
}
