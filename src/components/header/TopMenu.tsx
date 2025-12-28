'use client'

import SearchButton from './SearchButton'
import { useAuthStore } from '@/store/authStore'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import Link from 'next/link'
import { LuBox, LuShoppingCart, LuStar } from 'react-icons/lu'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { useEffect } from 'react'

const TopMenu = () => {
	const { user } = useAuthStore()
	const pathname = usePathname()
	const { totalItems, fetchCart } = useCartStore()

	const isFavoritesPage = pathname === '/favorites'
	const isUserOrdersPage = pathname === '/user-orders'
	const isAdminOrdersPage = pathname === '/administrator/admin-orders'
	const isCartPage = pathname === '/cart'

	const isManagerOrAdmin = user?.role === 'manager' || user?.role === 'admin'
	const ordersLink = isManagerOrAdmin
		? '/administrator/admin-orders'
		: '/user-orders'
	const isOrdersPage = isUserOrdersPage || isAdminOrdersPage

	useEffect(() => {
		if (user && !isManagerOrAdmin) {
			fetchCart()
		}
	}, [user, isManagerOrAdmin, fetchCart])

	return (
		<ul className='fixed bottom-0 left-0 right-0 bg-white lg:static lg:bg-transparent text-gray-400 flex gap-x-5 justify-around items-center w-full py-2 z-[1000]'>
			{!isManagerOrAdmin && (
				<li>
					<Link href='/favorites'>
						<LuStar
							className={`text-2xl ${isFavoritesPage ? 'text-red-700' : 'text-gray-400 lg:hover:text-black'}`}
						/>
					</Link>
				</li>
			)}
			{!isManagerOrAdmin && <SearchButton />}
			<li>
				<Link href={ordersLink}>
					<LuBox
						className={`text-2xl ${isOrdersPage ? 'text-red-700' : 'text-gray-400 lg:hover:text-black'}`}
					/>
				</Link>
			</li>
			{!isManagerOrAdmin && (
				<li className='relative'>
					<Link href='/cart'>
						<LuShoppingCart
							className={`text-2xl ${isCartPage ? 'text-red-700' : 'text-gray-400 lg:hover:text-black'}`}
						/>
						{totalItems > 0 && (
							<span className='absolute -top-5 -right-4 bg-teal-600 text-white font-semibold text-[10px] rounded-xl w-6 h-6 flex items-center justify-center py-0.5 px-0.5'>
								{totalItems > 99 ? '99+' : totalItems}
							</span>
						)}
					</Link>
				</li>
			)}
			{isManagerOrAdmin && (
				<Link
					href='/administrator'
					className='flex items-center gap-x-1 text-red-500 lg:hover:text-red-700'
				>
					<MdOutlineAdminPanelSettings className='text-3xl' />
					<span>Администраторская</span>
				</Link>
			)}
		</ul>
	)
}
export default TopMenu
