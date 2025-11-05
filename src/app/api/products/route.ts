import { ProductCardProps } from '@/lib/types/product'
import { getDB } from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'
import { CONFIG } from '../../../../config/config'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET(request: Request) {
	try {
		const db = await getDB()
		const url = new URL(request.url)
		const category = url.searchParams.get('category')
		const randomLimit = url.searchParams.get('randomLimit')
		const startId = parseInt(url.searchParams.get('startIndex') || '0')
		const perPage = parseInt(
			url.searchParams.get('perPage') || CONFIG.ITEMS_PER_PAGE.toString()
		)

		if (!category) {
			return NextResponse.json(
				{ message: 'Query parameter is required' },
				{ status: 400 }
			)
		}

		if (randomLimit) {
			const pipeline = [
				{ $match: { categories: category } }, // Сначала фильтруем по категории
				{ $sample: { size: parseInt(randomLimit) } }, // Затем выбираем случайные N документов
			]
			const products = await db
				.collection('products')
				.aggregate<ProductCardProps>(pipeline)
				.toArray()

			return NextResponse.json(products)
		}

		const totalCount = await db
			.collection('products')
			.countDocuments({ categories: category })

		const products = await db
			.collection('products')
			.find({ categories: category })
			.sort({ _id: 1 })
			.skip(startId)
			.limit(perPage)
			.toArray()

		return NextResponse.json({ products, totalCount })
	} catch {
		return NextResponse.json(
			{ message: 'Error to fetch products' },
			{ status: 500 }
		)
	}
}
