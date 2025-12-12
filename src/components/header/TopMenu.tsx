'use client'

import SearchButton from './SearchButton'
import { useAuthStore } from '@/store/authStore'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import Link from 'next/link'
import { LuBox, LuShoppingCart, LuStar } from 'react-icons/lu'

const TopMenu = () => {
	const { user } = useAuthStore()
	const isManagerOrAdmin = user?.role === 'manager' || user?.role === 'admin'

	return (
		<ul className='fixed bottom-0 left-0 right-0 bg-white lg:static lg:bg-transparent text-gray-400 flex gap-x-5 justify-around items-center w-full py-2 z-[1000]'>
			{!isManagerOrAdmin && (
				<li>
					<LuStar className='text-2xl cursor-pointer lg:hover:text-black ' />
				</li>
			)}
			{!isManagerOrAdmin && <SearchButton />}
			<li>
				<LuBox className='text-2xl cursor-pointer lg:hover:text-black' />
			</li>
			{!isManagerOrAdmin && (
				<li>
					<LuShoppingCart className='text-2xl cursor-pointer lg:hover:text-black' />
				</li>
			)}
			{isManagerOrAdmin && (
				<Link
					href='/administrator'
					className='flex items-center gap-x-1 text-red-500 cursor-pointer lg:hover:text-red-700'
				>
					<MdOutlineAdminPanelSettings className='text-3xl' />
					<span>Администраторская</span>
				</Link>
			)}
		</ul>
	)
}
export default TopMenu
