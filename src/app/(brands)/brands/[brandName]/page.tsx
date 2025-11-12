import getDBProducts from '@/app/(products)/getDBProducts'
import GenericListPage from '@/components/GenericListPage'
import Loader from '@/components/Loader'
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
	)
}
export default BrandPage
