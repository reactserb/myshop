import getDBProducts from '@/app/(products)/getDBProducts'
import Filter from '@/components/Filter'
import FilterDrawerButton from '@/components/FilterDrawerButton'
import GenericListPage from '@/components/GenericListPage'
import Loader from '@/components/Loader'
import SortDrawerButton from '@/components/SortDrawerButton'
import Sorter from '@/components/Sorter'
import { Suspense } from 'react'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ brandName: string }>
}) {
	const { brandName } = await params
	const title = `Все товары бренда: ${decodeURIComponent(brandName)}`
	const descriptionText = `Описание товаров бренда ${decodeURIComponent(
		brandName
	)} в интернет-магазине UNKNOWN.`

	return {
		title: title,
		description: descriptionText,
		openGraph: {
			title: title,
			description: descriptionText,
		},
	}
}

const BrandPage = async ({
	params,
	searchParams,
}: {
	params: Promise<{ brandName: string }>
	searchParams: Promise<{
		page?: string
		itemsPerPage?: string
		priceFrom?: string
		priceTo?: string
		sizes?: string | string[]
		brands?: string | string[]
		sort?: 'price_asc' | 'price_desc'
	}>
}) => {
	const brandResponse = (await params).brandName
	const brandName = decodeURIComponent(brandResponse)
	const pageTitle = `Все товары бренда: ${brandName}`

	const { priceFrom, priceTo, sizes, brands, sort } = await searchParams

	const fromPrice = priceFrom ? parseInt(priceFrom) : undefined
	const toPrice = priceTo ? parseInt(priceTo) : undefined

	const priceRangeOptions =
		fromPrice !== undefined && toPrice !== undefined
			? { from: fromPrice, to: toPrice }
			: undefined

	const getDataHandler = async ({
		pagination: { startId, perPage },
	}: {
		pagination: { startId: number; perPage: number }
	}) => {
		const result = await getDBProducts(undefined, {
			brand: brandName,
			pagination: { startId, perPage },
			priceRange: priceRangeOptions,
			selectedSizes: sizes,
			selectedBrands: brands,
			sort,
		})
		return result
	}

	return (
		<div className='flex flex-row gap-x-10 justify-between'>
			<div className='hidden lg:flex flex-col w-[200px] gap-y-10 ml-5 mt-10'>
				<Filter basePath={`/brands/${brandResponse}`} brandName={brandName} />
			</div>
			<div className='flex flex-col flex-1'>
				<div className='hidden lg:flex justify-end px-5'>
					<Sorter basePath={`/brands/${brandResponse}`} />
				</div>
				<div className='flex lg:hidden justify-around gap-x-2'>
					<SortDrawerButton>
						<Sorter basePath={`/brands/${brandResponse}`} compact />
					</SortDrawerButton>
					<FilterDrawerButton>
						<Filter
							basePath={`/brands/${brandResponse}`}
							brandName={brandName}
							compact
						/>
					</FilterDrawerButton>
				</div>

				<Suspense fallback={<Loader />}>
					<GenericListPage
						searchParams={searchParams}
						props={{
							getData: getDataHandler,
							pageTitle: pageTitle,
							basePath: `/brands/${brandResponse}`,
							errorMessage: `Ошибка: не удалось загрузить товары бренда ${brandName}`,
						}}
					/>
				</Suspense>
			</div>
		</div>
	)
}
export default BrandPage
