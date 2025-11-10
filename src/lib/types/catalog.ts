export interface CatalogItemProps {
	id: number
	name: string
	href: string
	apiEndpoint: 'brands' | 'products'
	categoryName?: string
}
