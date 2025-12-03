'use client'

import { CATALOG } from '@/lib/constants/catalog'
import Link from 'next/link'

const CatalogBlock = ({ handleClose }: { handleClose: () => void }) => {
	return (
		<div className='relative flex flex-col mt-10 gap-y-15'>
			<div className='flex items-center'>
				<div className='text-sm uppercase text-gray-400'>Каталог</div>
			</div>
			<div className='flex flex-col gap-5'>
				{CATALOG.map(link => (
					<Link
						key={link.id}
						href={link.href}
						className='hover:opacity-75 break-words'
						onClick={handleClose}
					>
						{link.name}
					</Link>
				))}
			</div>
		</div>
	)
}
export default CatalogBlock
