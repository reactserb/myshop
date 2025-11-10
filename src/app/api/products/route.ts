import { ProductCardProps } from '@/lib/types/product'
import { getDB } from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	try {
		const db = await getDB()
		const url = new URL(request.url)
		const category = url.searchParams.get('category')
		const randomLimit = url.searchParams.get('randomLimit')

		if (!category) {
			return NextResponse.json(
				{ message: 'Query parameter is required' },
				{ status: 400 }
			)
		}

		if (randomLimit) {
			const pipeline = [
				{ $match: { categories: category } },
				{ $sample: { size: parseInt(randomLimit) } },
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
			.toArray()

		return NextResponse.json({ products, totalCount })
	} catch (error) {
		console.error('Error fetching products:', error)
		return NextResponse.json(
			{ message: 'Error to fetch products' },
			{ status: 500 }
		)
	}
}
