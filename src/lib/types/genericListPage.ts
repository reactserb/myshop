import { ArticleCardProps } from './article'
import { ProductCardProps } from './product'

type ContentItem = ProductCardProps | ArticleCardProps

interface PaginatedResponse {
	items: ContentItem[]
	totalCount: number
}

export interface GenericListPageProps {
	getData: (options: {
		pagination: { startId: number; perPage: number }
	}) => Promise<PaginatedResponse>
	pageTitle: string
	basePath: string
	errorMessage: string
	contentType?: 'articles'
}
