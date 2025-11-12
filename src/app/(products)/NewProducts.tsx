import ErrorComponent from '@/components/ErrorComponent'
import { CONFIG } from '../../../config/config'
import getDBProducts from './getDBProducts'
import ProductsSection from './ProductsSection'

const NewProducts = async () => {
	try {
		const { items } = await getDBProducts('new', {
			randomLimit: CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS,
		})

		return (
			<ProductsSection
				title='Новинки'
				viewAllButtons={{ btnText: 'Все новинки', href: '/new' }}
				products={items}
				compact
			/>
		)
	} catch (error) {
		return (
			<ErrorComponent
				error={error instanceof Error ? error : new Error(String(error))}
				userMessage='Ошибка: не удалось загрузить новинки'
			/>
		)
	}
}
export default NewProducts
