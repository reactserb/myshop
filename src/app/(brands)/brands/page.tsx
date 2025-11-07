import { BrandProps } from '@/lib/types/brand'
import BrandsSection from '../BrandsSection'
import getDBBrands from '../getDBBrands'

export const metadata = {
	title: 'Бренды на сайте магазина UNKNOWN',
	description: 'Покупайте брендовую одежду на сайте магазина UNKNOWN',
}

const AllBrands = async () => {
	try {
		const { items } = await getDBBrands()

		return <BrandsSection title='Бренды' brands={items as BrandProps[]} />
	} catch {
		return (
			<div className='text-red-500 p-3'>
				Ошибка: не удалось загрузить бренды
			</div>
		)
	}
}
export default AllBrands
