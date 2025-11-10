import { getDB } from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	try {
		const db = await getDB()
		const url = new URL(request.url)

		const brandsLimit = url.searchParams.get('brandsLimit')

		let brandsCursor = db.collection('brands').find().sort({ brandName: 1 })
		let totalCount: number | undefined

		if (brandsLimit) {
			const limit = parseInt(brandsLimit)

			brandsCursor = brandsCursor.limit(limit)
		} else {
			totalCount = await db.collection('brands').countDocuments()
		}

		const brands = await brandsCursor.toArray()

		if (totalCount !== undefined) {
			return NextResponse.json({ brands, totalCount })
		} else {
			return NextResponse.json(brands)
		}
	} catch (error) {
		console.error('Error fetching brands:', error)

		return NextResponse.json(
			{ message: 'Error to fetch brands' },
			{ status: 500 }
		)
	}
}
