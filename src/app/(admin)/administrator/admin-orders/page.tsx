'use client'

import ErrorComponent from '@/components/ErrorComponent'
import Loader from '@/components/Loader'
import { Order } from '@/lib/types/order'
import { useEffect, useMemo, useState } from 'react'
import AdminOrderCard from './_components/AdminOrderCard'
import { CONFIG } from '../../../../../config/config'

const AdminOrderPage = () => {
	const [orders, setOrders] = useState<Order[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<{
		error: Error
		userMessage: string
	} | null>(null)

	const [visibleOrdersCount, setVisibleOrdersCount] = useState<number>(
		CONFIG.ITEMS_PER_ORDERS_ADMIN_PAGE
	)
	const visibleOrders = useMemo(
		() => orders.slice(0, visibleOrdersCount),
		[orders, visibleOrdersCount]
	)
	const hasMoreOrders = orders.length > visibleOrdersCount

	const handleShowMore = () => {
		setVisibleOrdersCount(
			prevCount => prevCount + CONFIG.ITEMS_PER_ORDERS_ADMIN_PAGE
		)
	}

	const fetchOrders = async () => {
		try {
			const response = await fetch('/api/admin/users/orders')
			if (!response.ok) {
				throw new Error('Ошибка при загрузке заказов')
			}
			const data = await response.json()
			setOrders(data.orders)
		} catch (error) {
			setError({
				error: error instanceof Error ? error : new Error('Неизвестная ошибка'),
				userMessage: 'Не удалось получить заказы пользователя',
			})
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchOrders()
	}, [])

	if (loading) return <Loader />

	if (error) {
		return (
			<ErrorComponent error={error.error} userMessage={error.userMessage} />
		)
	}

	return (
		<div className='px-[max(12px,calc((100%-1208px)/2))] mx-auto mb-8 py-8'>
			<div className='font-semibold text-2xl mb-5'>Заказы:</div>
			{visibleOrders.map(order => (
				<AdminOrderCard key={order._id} order={order} />
			))}

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

export default AdminOrderPage
