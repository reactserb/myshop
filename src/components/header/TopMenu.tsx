'use client'

import { IoStarOutline } from 'react-icons/io5'
import { IoBagOutline } from 'react-icons/io5'
import { BsBox } from 'react-icons/bs'
import SearchButton from './SearchButton'
import { useAuthStore } from '@/store/authStore'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import Link from 'next/link'

const TopMenu = () => {
	const { user } = useAuthStore()
	const isManagerOrAdmin = user?.role === 'manager' || user?.role === 'admin'

	return (
		<ul className='fixed bottom-0 left-0 right-0 bg-white lg:static lg:bg-transparent text-gray-400 flex gap-x-5 justify-around items-center w-full py-2 z-[1000]'>
			{!isManagerOrAdmin && (
				<li>
					<IoStarOutline className='text-2xl cursor-pointer lg:hover:text-black ' />
				</li>
			)}
			{!isManagerOrAdmin && <SearchButton />}
			<li>
				<BsBox className='text-2xl cursor-pointer lg:hover:text-black' />
			</li>
			{!isManagerOrAdmin && (
				<li>
					<IoBagOutline className='text-2xl cursor-pointer lg:hover:text-black' />
				</li>
			)}
			{isManagerOrAdmin && (
				<Link
					href='administrator'
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
