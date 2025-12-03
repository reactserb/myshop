import Loader from '@/components/Loader'
import GenericListPage from '../../../components/GenericListPage'
import getDBProducts from '../getDBProducts'
import { Suspense } from 'react'
import Filter from '@/components/Filter/Filter'
import Sorter from '@/components/Sorter/Sorter'
import FilterDrawerButton from '@/components/Filter/FilterDrawerButton'
import SortDrawerButton from '@/components/Sorter/SortDrawerButton'

export const metadata = {
	title: 'Скидки магазина UNKNOWN',
	description: 'Скидочные товары магазина UNKNOWN',
}

const AllActions = async ({
	searchParams,
}: {
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
	const { priceFrom, priceTo, sizes, brands, sort } = await searchParams

	const fromPrice = priceFrom ? parseInt(priceFrom) : undefined
	const toPrice = priceTo ? parseInt(priceTo) : undefined

	const priceRangeOptions =
		fromPrice !== undefined && toPrice !== undefined
			? { from: fromPrice, to: toPrice }
			: undefined

	return (
		<div className='flex flex-row gap-x-10 justify-between'>
			<div className='hidden lg:flex flex-col w-[200px] gap-y-10 ml-5 mt-10'>
				<Filter basePath='discount' />
			</div>
			<div className='flex flex-col flex-1'>
				<div className='hidden lg:flex justify-end px-5'>
					<Sorter basePath='discount' />
				</div>
				<div className='flex lg:hidden justify-around gap-x-2'>
					<SortDrawerButton>
						<Sorter basePath='discount' compact />
					</SortDrawerButton>
					<FilterDrawerButton>
						<Filter basePath='discount' compact />
					</FilterDrawerButton>
				</div>

				<Suspense fallback={<Loader />}>
					<GenericListPage
						searchParams={searchParams}
						props={{
							getData: ({ pagination: { startId, perPage } }) =>
								getDBProducts('discount', {
									pagination: { startId, perPage },
									priceRange: priceRangeOptions,
									selectedSizes: sizes,
									selectedBrands: brands,
									sort,
								}),
							pageTitle: 'Все скидки',
							basePath: '/discount',
							errorMessage: 'Ошибка: не удалось загрузить скидки',
						}}
					/>
				</Suspense>
			</div>
		</div>
	)
}
export default AllActions
