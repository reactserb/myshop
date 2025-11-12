import { Suspense } from 'react'
import getDBArticles from '../getDBArticles'
import GenericListPage from '@/components/GenericListPage'
import Loader from '@/components/Loader'

export const metadata = {
	title: 'Статьи на сайте магазина UNKNOWN',
	description: 'Читайте статьи на сайте магазина UNKNOWN',
}

const AllArticles = async ({
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
						getDBArticles({ pagination: { startId, perPage } }),
					pageTitle: 'Блог',
					basePath: '/articles',
					errorMessage: 'Ошибка: не удалось загрузить статьи',
					contentType: 'articles',
				}}
			/>
		</Suspense>
	)
}
export default AllArticles
