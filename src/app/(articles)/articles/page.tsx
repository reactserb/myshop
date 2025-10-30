import GenericProductListPage from '@/components/GenericListPage'
import getDBArticles from '../getDBArticles'

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
		<GenericProductListPage
			searchParams={searchParams}
			props={{
				getData: () => getDBArticles(),
				pageTitle: 'Блог',
				basePath: '/articles',
				errorMessage: 'Ошибка: не удалось загрузить статьи',
				contentType: 'articles',
			}}
		/>
	)
}
export default AllArticles
