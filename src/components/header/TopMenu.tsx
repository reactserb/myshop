import { IoStarOutline } from 'react-icons/io5'
import { IoBagOutline } from 'react-icons/io5'
import { BsBox } from 'react-icons/bs'
import { GoSearch } from 'react-icons/go'

const TopMenu = () => {
	return (
		<ul className='flex gap-x-2'>
			<li>
				<IoStarOutline className='text-2xl cursor-pointer' />
			</li>
			<li>
				<GoSearch className='text-2xl cursor-pointer md:hidden' />
			</li>
			<li>
				<BsBox className='text-2xl cursor-pointer' />
			</li>
			<li>
				<IoBagOutline className='text-2xl cursor-pointer' />
			</li>
		</ul>
	)
}
export default TopMenu
