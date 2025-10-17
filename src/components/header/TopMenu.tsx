import { IoStarOutline } from 'react-icons/io5'
import { IoBagOutline } from 'react-icons/io5'
import { BsBox } from 'react-icons/bs'
import { GoSearch } from 'react-icons/go'

const TopMenu = () => {
	return (
		<ul className='fixed bottom-0 left-0 right-0 bg-white lg:static lg:bg-transparent text-gray-400 flex gap-x-2 lg:gap-x-0 justify-around items-center w-full py-2 z-10000'>
			<li>
				<IoStarOutline className='text-2xl cursor-pointer lg:hover:text-black lg:mr-3' />
			</li>
			<li>
				<GoSearch className='text-2xl cursor-pointer lg:hover:text-black lg:hidden' />
			</li>
			<li>
				<BsBox className='text-2xl cursor-pointer lg:hover:text-black lg:mr-3' />
			</li>
			<li>
				<IoBagOutline className='text-2xl cursor-pointer lg:hover:text-black lg:mr-3' />
			</li>
		</ul>
	)
}
export default TopMenu
