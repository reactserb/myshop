import { GenericListPageProps } from '@/lib/types/genericListPage'
import ProductsSection from '../app/(products)/ProductsSection'
import { CONFIG } from '../../config/config'
import PaginationWrapper from '@/components/PaginationWrapper'
import ArticlesSection from '../app/(articles)/ArticlesSection'
import { ArticleCardProps } from '@/lib/types/article'
import { ProductCardProps } from '@/lib/types/product'
import ErrorComponent from './ErrorComponent'

const GenericListPage = async ({
	searchParams,
	props,
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
	props: GenericListPageProps
}) => {
	const params = await searchParams
	const page = params?.page
	const itemsPerPage =
		params?.itemsPerPage ||
		(props.contentType === 'articles' ? 1 : CONFIG.ITEMS_PER_PAGE)
	const selectedSizes = params?.sizes
	const selectedBrands = params?.brands
	const sort = params?.sort

	const fromPrice = params?.priceFrom ? parseInt(params?.priceFrom) : undefined
	const toPrice = params?.priceTo ? parseInt(params?.priceTo) : undefined

	const priceRangeOptions =
		fromPrice !== undefined && toPrice !== undefined
			? { from: fromPrice, to: toPrice }
			: undefined

	const currentPage = Number(page) || 1
	const perPage = Number(itemsPerPage)
	const startId = (currentPage - 1) * perPage

	try {
		const { items, totalCount } = await props.getData({
			pagination: { startId, perPage },
			priceRange: priceRangeOptions,
			selectedSizes,
			selectedBrands,
			sort,
		})

		const totalPages = Math.ceil(totalCount / perPage)

		return (
			<>
				{props.contentType ? (
					<ArticlesSection
						title={props.pageTitle}
						articles={items as ArticleCardProps[]}
					/>
				) : (
					<ProductsSection
						title={props.pageTitle}
						products={items as ProductCardProps[]}
					/>
				)}

				{totalPages > 1 && (
					<PaginationWrapper
						totalItems={totalCount}
						currentPage={currentPage}
						basePath={props.basePath}
						contentType={props.contentType}
					/>
				)}
			</>
		)
	} catch (error) {
		return (
			<ErrorComponent
				error={error instanceof Error ? error : new Error(String(error))}
				userMessage={props.errorMessage}
			/>
		)
	}
}
export default GenericListPage
