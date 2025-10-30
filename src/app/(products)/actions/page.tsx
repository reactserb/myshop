import GenericListPage from '../../../components/GenericListPage'
import getDBProducts from '../getDBProducts'

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
		<GenericListPage
			searchParams={searchParams}
			props={{
				getData: () => getDBProducts('discount'),
				pageTitle: 'Все акции',
				basePath: '/actions',
				errorMessage: 'Ошибка: не удалось загрузить акции',
			}}
		/>
	)
}
export default AllActions
