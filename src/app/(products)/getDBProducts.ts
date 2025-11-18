import { ProductCardProps } from '@/lib/types/product'
import { getDB } from '@/lib/utils/api-routes'
import { Filter } from 'mongodb'

const getDBProducts = async (
	category?: string,
	options?: {
		randomLimit?: number
		pagination?: { startId: number; perPage: number }
		brand?: string
		priceRange?: { from: number; to: number }
		selectedSizes?: string | string[]
		selectedBrands?: string | string[]
		sort?: 'price_asc' | 'price_desc'
	}
) => {
	try {
		const db = await getDB()
		const collection = db.collection<ProductCardProps>('products')

		let items: ProductCardProps[]
		let totalCount = 0

		const filter: Filter<ProductCardProps> = {}

		if (category) {
			filter.categories = category
		}

		if (options?.priceRange) {
			filter.$expr = {
				$and: [
					{
						$gte: [
							{
								$multiply: [
									'$basePrice',

									{
										$divide: [{ $subtract: [100, '$discountPercent'] }, 100],
									},
								],
							},

							options.priceRange.from,
						],
					},

					{
						$lte: [
							{
								$multiply: [
									'$basePrice',

									{
										$divide: [{ $subtract: [100, '$discountPercent'] }, 100],
									},
								],
							},

							options.priceRange.to,
						],
					},
				],
			}
		}

		if (options?.selectedSizes) {
			const sizesArray: string[] = Array.isArray(options.selectedSizes)
				? options.selectedSizes
				: [options.selectedSizes]

			filter.sizes = { $in: sizesArray }
		}

		if (options?.selectedBrands) {
			const brandsArray: string[] = Array.isArray(options.selectedBrands)
				? options.selectedBrands
				: [options.selectedBrands]

			filter.title = { $in: brandsArray }
		}

		if (options?.brand) {
			filter.title = options.brand
		}

		const priceCalculationStage: object = {
			$addFields: {
				finalPrice: {
					$multiply: [
						'$basePrice',

						{ $divide: [{ $subtract: [100, '$discountPercent'] }, 100] },
					],
				},
			},
		}

		let sortStage: object | null = null
		if (options?.sort === 'price_asc') {
			sortStage = { $sort: { finalPrice: 1 } }
		} else if (options?.sort === 'price_desc') {
			sortStage = { $sort: { finalPrice: -1 } }
		} else {
			sortStage = { $sort: { brandName: 1 } }
		}

		if (options?.randomLimit) {
			items = await collection
				.aggregate<ProductCardProps>([
					{ $match: filter },
					{ $sample: { size: options.randomLimit } },
				])
				.toArray()

			totalCount = items.length
		} else if (options?.pagination) {
			const { startId, perPage } = options.pagination

			totalCount = await collection.countDocuments(filter)

			const pipeline: object[] = [
				{ $match: filter },
				priceCalculationStage,
				sortStage!,
				{ $skip: startId },
				{ $limit: perPage },
				{ $unset: 'finalPrice' },
			]

			items = await collection.aggregate<ProductCardProps>(pipeline).toArray()
		} else {
			const pipeline: object[] = [
				{ $match: filter },
				priceCalculationStage,
				sortStage!,
				{ $unset: 'finalPrice' },
			]

			items = await collection.aggregate<ProductCardProps>(pipeline).toArray()

			totalCount = items.length
		}

		return { items, totalCount }
	} catch (err) {
		throw err
	}
}

export default getDBProducts
