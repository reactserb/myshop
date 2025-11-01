import { getDB } from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET(request: Request) {
	try {
		const category = new URL(request.url).searchParams.get('category')

		if (!category) {
			return NextResponse.json(
				{ message: 'Query parameter is required' },
				{ status: 400 }
			)
		}

		const db = await getDB()
		const products = await db
			.collection('products')
			.find({ categories: category })
			.toArray()

		return NextResponse.json(products)
	} catch {
		return NextResponse.json(
			{ message: 'Error to fetch products' },
			{ status: 500 }
		)
	}
}
