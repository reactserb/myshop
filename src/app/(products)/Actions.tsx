import getDBProducts from './getDBProducts'
import ProductsSection from './ProductsSection'
import { CONFIG } from '../../../config/config'

const Actions = async () => {
	try {
		const { items } = await getDBProducts('discount', {
			randomLimit: CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS,
		})

		return (
			<ProductsSection
				title='Акции'
				viewAllButtons={{ btnText: 'Все акции', href: 'actions' }}
				products={items}
				compact
			/>
		)
	} catch {
		return (
			<div className='text-red-500 p-3'>Ошибка: не удалось загрузить акции</div>
		)
	}
}
export default Actions
