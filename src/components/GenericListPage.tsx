import { GenericListPageProps } from '@/lib/types/genericListPage'
import ProductsSection from '../app/(products)/ProductsSection'
import { CONFIG } from '../../config/config'
import PaginationWrapper from '@/components/PaginationWrapper'
import ArticlesSection from '../app/(articles)/ArticlesSection'
import { ArticleCardProps } from '@/lib/types/article'
import { ProductCardProps } from '@/lib/types/product'

const GenericListPage = async ({
	searchParams,
	props,
}: {
	searchParams: Promise<{ page?: string; itemsPerPage?: string }>
	props: GenericListPageProps
}) => {
	const params = await searchParams
	const page = params?.page
	const itemsPerPage =
		params?.itemsPerPage ||
		(props.contentType === 'articles' ? 1 : CONFIG.ITEMS_PER_PAGE)

	const currentPage = Number(page) || 1
	const perPage = Number(itemsPerPage)
	const startId = (currentPage - 1) * perPage

	try {
		const items = await props.getData()
		const paginatedItems = items.slice(startId, startId + perPage)

		return (
			<>
				{props.contentType ? (
					<ArticlesSection
						title={props.pageTitle}
						articles={paginatedItems as ArticleCardProps[]}
					/>
				) : (
					<ProductsSection
						title={props.pageTitle}
						products={paginatedItems as ProductCardProps[]}
					/>
				)}

				{items.length > perPage && (
					<PaginationWrapper
						totalItems={items.length}
						currentPage={currentPage}
						basePath={props.basePath}
						contentType={props.contentType}
					/>
				)}
			</>
		)
	} catch {
		return <div className='text-red-500'>{props.errorMessage}</div>
	}
}
export default GenericListPage
