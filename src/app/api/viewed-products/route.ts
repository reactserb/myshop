import { ProductCardProps } from '@/lib/types/product'
import { getDB } from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { ids } = await req.json() // Ожидаем { ids: ['1', '2', ...] }

		if (!Array.isArray(ids) || ids.length === 0) {
			return NextResponse.json([])
		}

		const productNumbers = ids
			.map(id => parseInt(id, 10))
			.filter(num => !isNaN(num))

		if (productNumbers.length === 0) {
			return NextResponse.json([])
		}

		const db = await getDB()

		const products = await db
			.collection<ProductCardProps>('products')
			.find({ id: { $in: productNumbers } }) // Ищем товары, ID которых есть в списке
			.toArray()

		return NextResponse.json(products)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ message: 'Ошибка получения просмотренных товаров' },
			{ status: 500 }
		)
	}
}
