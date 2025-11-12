import { BrandProps } from '@/lib/types/brand'
import { CONFIG } from '../../../config/config'
import getDBBrands from './getDBBrands'
import BrandsSection from './BrandsSection'
import ErrorComponent from '@/components/ErrorComponent'

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
	} catch (error) {
		return (
			<ErrorComponent
				error={error instanceof Error ? error : new Error(String(error))}
				userMessage='Ошибка: не удалось загрузить бренды'
			/>
		)
	}
}
export default Brands
