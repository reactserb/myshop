import Link from 'next/link'
import { FiMenu } from 'react-icons/fi'

const SearchBlock = () => {
	return (
		<div className='flex'>
			<button className='cursor-pointer'>
				<FiMenu className='text-xl md:hidden' />
			</button>
			<div className='flex items-center p-2 gap-10 hidden md:flex '>
				<Link href='#' className='hover:opacity-75'>
					Бренды
				</Link>
				<Link href='new' className='hover:opacity-75'>
					Новинки
				</Link>
				<Link href='actions' className='hover:opacity-75'>
					Скидки
				</Link>
			</div>
		</div>
	)
}
export default SearchBlock
