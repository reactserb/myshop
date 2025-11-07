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
	} catch {
		return (
			<div className='text-red-500 p-3'>
				Ошибка: не удалось загрузить новинки
			</div>
		)
	}
}
export default NewProducts
