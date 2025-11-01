import { CATALOG } from '@/lib/catalog'
import Link from 'next/link'
import BurgerCatalogButton from './BurgerCatalogButton'

const CatalogHeader = () => {
	return (
		<div className='flex'>
			<BurgerCatalogButton />
			<div className='flex items-center p-2 gap-10 hidden md:flex '>
				{CATALOG.map(link => (
					<Link key={link.id} href={link.href} className='hover:opacity-75'>
						{link.name}
					</Link>
				))}
			</div>
		</div>
	)
}
export default CatalogHeader
