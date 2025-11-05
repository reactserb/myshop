import { ProductCardProps } from '@/lib/types/product'
import { getDB } from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const query = searchParams.get('query') || ''

		const db = await getDB()

		const searchTokens = query
			.trim()
			.split(/\s+/)
			.filter(token => token.length > 0)

		const conditions: object[] = []

		if (searchTokens.length > 0) {
			searchTokens.forEach(token => {
				conditions.push({
					$or: [
						{ title: { $regex: token, $options: 'i' } },
						{ description: { $regex: token, $options: 'i' } },
					],
				})
			})
		}
		if (conditions.length === 0) {
			return NextResponse.json([])
		}

		const products = (await db
			.collection('products')
			.find({ $and: conditions })
			.project({
				_id: 1,
				title: 1,
				img: 1,
				description: 1,
				basePrice: 1,
				discountPercent: 1,
				sizes: 1,
				id: 1,
			})
			.toArray()) as ProductCardProps[]
		if (!products.length) {
			return NextResponse.json([])
		}

		return NextResponse.json(products)
	} catch (error) {
		console.error('Ошибка поиска:', error)
		return NextResponse.json({ error: 'Ошибка поиска' }, { status: 500 })
	}
}
