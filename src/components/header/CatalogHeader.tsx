import { CATALOG } from '@/lib/catalog'

import BurgerCatalogButton from './BurgerCatalogButton'
import CatalogHeaderItem from './CatalogHeaderItem'

const CatalogHeader = () => {
	return (
		<div className='flex'>
			<BurgerCatalogButton />
			<div className='flex items-center p-2 gap-10 hidden md:flex '>
				{CATALOG.map(link => (
					<CatalogHeaderItem key={link.id} link={link} />
				))}
			</div>
		</div>
	)
}
export default CatalogHeader
