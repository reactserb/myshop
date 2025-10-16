import { IoStarOutline } from 'react-icons/io5'
import { IoBagOutline } from 'react-icons/io5'
import { BsBox } from 'react-icons/bs'
import { GoSearch } from 'react-icons/go'

const TopMenu = () => {
	return (
		<ul className='fixed bottom-0 left-0 right-0 bg-white md:static md:bg-transparent flex gap-x-2 md:gap-x-0 justify-around items-center w-full px-4 py-2 z-50'>
			<li>
				<IoStarOutline className='text-2xl cursor-pointer md:mr-3' />
			</li>
			<li>
				<GoSearch className='text-2xl cursor-pointer md:hidden' />
			</li>
			<li>
				<BsBox className='text-2xl cursor-pointer md:mr-3' />
			</li>
			<li>
				<IoBagOutline className='text-2xl cursor-pointer md:mr-3' />
			</li>
		</ul>
	)
}
export default TopMenu
