import Loader from '@/components/Loader'
import GenericListPage from '../../../components/GenericListPage'
import getDBProducts from '../getDBProducts'
import { Suspense } from 'react'
import Filter from '@/components/Filter/Filter'
import Sorter from '@/components/Sorter/Sorter'
import SortDrawerButton from '@/components/Sorter/SortDrawerButton'
import FilterDrawerButton from '@/components/Filter/FilterDrawerButton'

export const metadata = {
	title: 'Новинки магазина UNKNOWN',
	description: 'Новые товары магазина UNKNOWN',
}

const AllNew = async ({
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
				<Filter basePath='new' />
			</div>
			<div className='flex flex-col flex-1'>
				<div className='hidden lg:flex justify-end px-5'>
					<Sorter basePath='new' />
				</div>

				<div className='flex lg:hidden justify-around gap-x-2'>
					<SortDrawerButton>
						<Sorter basePath='new' compact />
					</SortDrawerButton>
					<FilterDrawerButton>
						<Filter basePath='new' compact />
					</FilterDrawerButton>
				</div>

				<Suspense fallback={<Loader />}>
					<GenericListPage
						searchParams={searchParams}
						props={{
							getData: ({ pagination: { startId, perPage } }) =>
								getDBProducts('new', {
									pagination: { startId, perPage },
									priceRange: priceRangeOptions,
									selectedSizes: sizes,
									selectedBrands: brands,
									sort,
								}),
							pageTitle: 'Все новинки',
							basePath: '/new',
							errorMessage: 'Ошибка: не удалось загрузить новинки',
						}}
					/>
				</Suspense>
			</div>
		</div>
	)
}
export default AllNew
