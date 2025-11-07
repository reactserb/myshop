import { BrandProps } from '@/lib/types/brand'
import { CONFIG } from '../../../config/config'
import getDBBrands from './getDBBrands'
import BrandsSection from './BrandsSection'

const Brands = async () => {
	try {
		const { items } = await getDBBrands({
			brandsLimit: CONFIG.ITEMS_PER_PAGE_MAIN_BRANDS,
		})

		return (
			<BrandsSection
				title='Бренды'
				viewAllButtons={{ btnText: 'Все бренды', href: 'brands' }}
				brands={items as BrandProps[]}
				compact
			/>
		)
	} catch {
		return (
			<div className='text-red-500 p-3'>
				Ошибка: не удалось загрузить бренды
			</div>
		)
	}
}
export default Brands
