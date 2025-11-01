import { shuffleArray } from '@/lib/utils/array/shuffleArray'
import getDBProducts from './getDBProducts'
import ProductsSection from './ProductsSection'

const NewProducts = async () => {
	try {
		let newProducts = await getDBProducts('new')
		newProducts = shuffleArray(newProducts)

		return (
			<ProductsSection
				title='Новинки'
				viewAllButtons={{ btnText: 'Все новинки', href: 'new' }}
				products={newProducts}
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
