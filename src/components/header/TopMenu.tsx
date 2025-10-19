import { IoStarOutline } from 'react-icons/io5'
import { IoBagOutline } from 'react-icons/io5'
import { BsBox } from 'react-icons/bs'
import SearchButton from './SearchButton'

const TopMenu = () => {
	return (
		<ul className='fixed bottom-0 left-0 right-0 bg-white lg:static lg:bg-transparent text-gray-400 flex gap-x-5 justify-around items-center w-full py-2 z-10000'>
			<li>
				<IoStarOutline className='text-2xl cursor-pointer lg:hover:text-black ' />
			</li>
			<SearchButton />
			<li>
				<BsBox className='text-2xl cursor-pointer lg:hover:text-black' />
			</li>
			<li>
				<IoBagOutline className='text-2xl cursor-pointer lg:hover:text-black' />
			</li>
		</ul>
	)
}
export default TopMenu
