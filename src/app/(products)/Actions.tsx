import getDBProducts from './getDBProducts'
import ProductsSection from './ProductsSection'
import { CONFIG } from '../../../config/config'
import ErrorComponent from '@/components/ErrorComponent'

const Actions = async () => {
	try {
		const { items } = await getDBProducts('discount', {
			randomLimit: CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS,
		})

		return (
			<ProductsSection
				title='Скидки'
				viewAllButtons={{ btnText: 'Все скидки', href: '/actions' }}
				products={items}
				compact
			/>
		)
	} catch (error) {
		return (
			<ErrorComponent
				error={error instanceof Error ? error : new Error(String(error))}
				userMessage='Ошибка: не удалось загрузить скидки'
			/>
		)
	}
}
export default Actions
