import { shuffleArray } from '@/utils/array/shuffleArray'
import getDBProducts from './getDBProducts'
import ProductsSection from './ProductsSection'

const Actions = async () => {
	try {
		let actionProducts = await getDBProducts('discount')
		actionProducts = shuffleArray(actionProducts)

		return (
			<ProductsSection
				title='Акции'
				viewAllButtons={{ btnText: 'Все акции', href: 'actions' }}
				products={actionProducts}
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
