import { getDB } from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'
import { CONFIG } from '../../../../config/config'
import { Filter } from 'mongodb'
import { ProductCardProps } from '@/lib/types/product'

export async function GET(request: Request) {
	try {
		const db = await getDB()
		const { searchParams } = new URL(request.url)
		const category = searchParams.get('category')
		const brandName = searchParams.get('brandName')

		const matchFilter: Filter<ProductCardProps> = {}

		if (category) {
			matchFilter.categories = category
		} else if (brandName) {
			matchFilter.title = brandName
		} else {
			return NextResponse.json(
				{ message: 'Query parameter is required' },
				{ status: 400 }
			)
		}

		const priceRange = await db
			.collection('products')
			.aggregate([
				{ $match: matchFilter },

				{
					$addFields: {
						finalPrice: {
							$multiply: [
								'$basePrice',

								{
									$divide: [{ $subtract: [100, '$discountPercent'] }, 100],
								},
							],
						},
					},
				},

				{
					$group: {
						_id: null,

						min: { $min: '$finalPrice' },

						max: { $max: '$finalPrice' },
					},
				},
			])

			.toArray()

		const sizesResult = await db
			.collection('products')
			.aggregate([
				{ $match: matchFilter },
				{ $unwind: '$sizes' },
				{
					$group: {
						_id: null,
						uniqueSizes: { $addToSet: '$sizes' },
					},
				},
			])
			.toArray()

		const uniqueSizes = sizesResult.length > 0 ? sizesResult[0].uniqueSizes : []

		const brandsResult = await db
			.collection('products')
			.aggregate([
				{ $match: matchFilter },
				{
					$group: {
						_id: '$title',
					},
				},
				{
					$group: {
						_id: null,
						uniqueBrands: { $addToSet: '$_id' },
					},
				},
				{
					$project: {
						_id: 0,
						uniqueBrands: 1,
					},
				},
			])
			.toArray()

		const uniqueBrands =
			brandsResult.length > 0 ? brandsResult[0].uniqueBrands : []

		uniqueBrands.sort((a: string, b: string) => a.localeCompare(b))

		return NextResponse.json({
			priceRange: {
				min: priceRange[0]?.min ?? 0,
				max: priceRange[0]?.max ?? CONFIG.FALLBACK_PRICE_RANGE.max,
			},
			sizes: uniqueSizes,
			brands: uniqueBrands,
		})
	} catch (error) {
		console.error('Error fetching products:', error)
		return NextResponse.json(
			{ message: 'Error to fetch products' },
			{ status: 500 }
		)
	}
}
