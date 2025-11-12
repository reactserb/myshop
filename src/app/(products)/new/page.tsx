import Loader from '@/components/Loader'
import GenericListPage from '../../../components/GenericListPage'
import getDBProducts from '../getDBProducts'
import { Suspense } from 'react'

export const metadata = {
	title: 'Новинки магазина UNKNOWN',
	description: 'Новые товары магазина UNKNOWN',
}

const AllNew = async ({
	searchParams,
}: {
	searchParams: Promise<{ page?: string; itemsPerPage?: string }>
}) => {
	return (
		<Suspense fallback={<Loader />}>
			<GenericListPage
				searchParams={searchParams}
				props={{
					getData: ({ pagination: { startId, perPage } }) =>
						getDBProducts('new', { pagination: { startId, perPage } }),
					pageTitle: 'Все новинки',
					basePath: '/new',
					errorMessage: 'Ошибка: не удалось загрузить новинки',
				}}
			/>
		</Suspense>
	)
}
export default AllNew
