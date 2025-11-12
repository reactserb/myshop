import Loader from '@/components/Loader'
import GenericListPage from '../../../components/GenericListPage'
import getDBProducts from '../getDBProducts'
import { Suspense } from 'react'

export const metadata = {
	title: 'Скидки магазина UNKNOWN',
	description: 'Скидочные товары магазина UNKNOWN',
}

const AllActions = async ({
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
						getDBProducts('discount', { pagination: { startId, perPage } }),
					pageTitle: 'Все скидки',
					basePath: '/actions',
					errorMessage: 'Ошибка: не удалось загрузить скидки',
				}}
			/>
		</Suspense>
	)
}
export default AllActions
