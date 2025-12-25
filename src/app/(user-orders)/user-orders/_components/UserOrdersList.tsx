import { useState } from 'react'
import { CONFIG } from '../../../../../config/config'
import { Order } from '@/lib/types/order'
import OrderCard from './OrderCard'

const UserOrdersList = ({ orders }: { orders: Order[] }) => {
	const [visibleOrdersCount, setVisibleOrdersCount] = useState<number>(
		CONFIG.ITEMS_PER_ORDERS_PAGE
	)
	const visibleOrders = orders.slice(0, visibleOrdersCount)
	const hasMoreOrders = orders.length > visibleOrdersCount

	const handleShowMore = () => {
		setVisibleOrdersCount(prevCount => prevCount + CONFIG.ITEMS_PER_ORDERS_PAGE)
	}

	return (
		<div>
			<div className='space-y-30'>
				{visibleOrders.map(order => (
					<OrderCard key={order._id} order={order} />
				))}
			</div>

			{hasMoreOrders && (
				<div className='flex justify-center mt-15'>
					<button
						className='bg-teal-500 text-white hover:shadow-button-secondary text-main-text w-55 h-12 px-2 flex justify-center items-center gap-2 rounded cursor-pointer hover:bg-teal-400 hover:text-black duration-300'
						onClick={handleShowMore}
					>
						Показать еще заказы
					</button>
				</div>
			)}
		</div>
	)
}

export default UserOrdersList
