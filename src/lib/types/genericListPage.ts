import { ArticleCardProps } from './article'
import { ProductCardProps } from './product'

type ContentItem = ProductCardProps | ArticleCardProps

export interface GenericListPageProps {
	getData: () => Promise<ContentItem[]>
	pageTitle: string
	basePath: string
	errorMessage: string
	contentType?: 'articles'
}
