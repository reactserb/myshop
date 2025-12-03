import Link from 'next/link'
import { IoMdClose } from 'react-icons/io'
import { IoFilter } from 'react-icons/io5'

interface FilterHeaderProps {
	isFilterBrandActive: boolean
	isFilterPriceActive: boolean
	isFilterSizeActive: boolean
	basePath: string
	onCloseMenu?: () => void
}

const FilterHeader = ({
	isFilterBrandActive,
	isFilterPriceActive,
	isFilterSizeActive,
	basePath,
	onCloseMenu,
}: FilterHeaderProps) => {
	return (
		<div>
			{isFilterBrandActive || isFilterPriceActive || isFilterSizeActive ? (
				<Link href={`${basePath}`} onClick={onCloseMenu}>
					<div className='flex gap-x-2 items-center group'>
						<IoMdClose className='text-3xl bg-gray-200 p-1 rounded-2xl group-hover:opacity-50' />

						<span className='group-hover:opacity-50 pt-1'>Сбросить фильтр</span>
					</div>
				</Link>
			) : (
				<div className='flex items-center gap-x-2 text-md'>
					<IoFilter className='text-xl' />

					<span>Фильтр</span>
				</div>
			)}
		</div>
	)
}
export default FilterHeader
