import getDBProducts from '@/app/(products)/getDBProducts'
import GenericListPage from '@/components/GenericListPage'

const BrandPage = async ({
	params,
	searchParams,
}: {
	params: Promise<{ brandName: string }>
	searchParams: Promise<{ page?: string; itemsPerPage?: string }>
}) => {
	const brandResponse = (await params).brandName
	const brandName = decodeURIComponent(brandResponse)
	const nonBreakingBrandName = brandName.replace(/ /g, '\u00A0')
	const pageTitle = `Все товары бренда: ${nonBreakingBrandName}`

	const getDataHandler = async ({
		pagination: { startId, perPage },
	}: {
		pagination: { startId: number; perPage: number }
	}) => {
		const result = await getDBProducts(undefined, {
			brand: brandName,
			pagination: { startId, perPage },
		})
		return result
	}

	return (
		<GenericListPage
			searchParams={searchParams}
			props={{
				getData: getDataHandler,
				pageTitle: pageTitle,
				basePath: `/brands/${brandResponse}`,
				errorMessage: `Ошибка: не удалось загрузить товары бренда ${brandName}`,
			}}
		/>
	)
}
export default BrandPage
