import { BrandProps } from '@/lib/types/brand'
import BrandsSection from '../BrandsSection'
import getDBBrands from '../getDBBrands'
import ErrorComponent from '@/components/ErrorComponent'

export const metadata = {
	title: 'Бренды на сайте магазина UNKNOWN',
	description: 'Покупайте брендовую одежду на сайте магазина UNKNOWN',
}

const AllBrands = async () => {
	try {
		const { items } = await getDBBrands()

		return <BrandsSection title='Бренды' brands={items as BrandProps[]} />
	} catch (error) {
		return (
			<ErrorComponent
				error={error instanceof Error ? error : new Error(String(error))}
				userMessage='Ошибка: не удалось загрузить бренды'
			/>
		)
	}
}
export default AllBrands
