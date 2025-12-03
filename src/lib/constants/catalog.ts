import { CatalogItemProps } from '../types/catalog'

export const CATALOG: CatalogItemProps[] = [
	{
		id: 1,
		name: 'Бренды',
		href: '/brands',
		apiEndpoint: 'brands',
	},
	{
		id: 2,
		name: 'Новинки',
		href: '/new',
		apiEndpoint: 'products',
		categoryName: 'new',
	},
	{
		id: 3,
		name: 'Скидки',
		href: '/discount',
		apiEndpoint: 'products',
		categoryName: 'discount',
	},
]
