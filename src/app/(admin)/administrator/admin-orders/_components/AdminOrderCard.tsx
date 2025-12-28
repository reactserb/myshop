import { Order } from '@/lib/types/order'
import { updateOrderStatus } from '@/lib/utils/order-helpers'
import { useState } from 'react'
import { LuPhone, LuUpload } from 'react-icons/lu'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import { formatPhoneNumber } from '../utils/formatPhoneNumber'
import StatusDropdown from './StatusDropdown'
import { getMappedStatus } from '../utils/getMappedStatus'
import { getEnglishStatuses } from '../utils/getEnglishStatuses'
import { buttonStyles } from '@/app/(auth)/styles'
import { exportOrderToExcel } from '../utils/exportOrderToExcel'
import OrderProductsLoader from './OrderProductsLoader'
import OrderDetails from './OrderDetails'

interface AdminOrderCardProps {
	order: Order
	onStatusUpdate?: (orderId: string, newStatus: string) => void
}

const AdminOrderCard = ({ order, onStatusUpdate }: AdminOrderCardProps) => {
	const [currentStatusLabel, setCurrentStatusLabel] = useState<string>(
		getMappedStatus(order)
	)
	const [isUpdating, setIsUpdating] = useState(false)
	const [showOrderDetails, setShowOrderDetails] = useState(false)
	const [showFullOrder, setShowFullOrder] = useState(false)
	const [isExporting, setIsExporting] = useState(false)

	const handleStatusChange = async (newStatusLabel: string) => {
		setIsUpdating(true)
		try {
			const { status: englishStatus, paymentStatus } =
				getEnglishStatuses(newStatusLabel)

			const updateData: { status: string; paymentStatus?: string } = {
				status: englishStatus,
				...(paymentStatus && { paymentStatus }),
			}

			await updateOrderStatus(order._id, updateData)
			setCurrentStatusLabel(newStatusLabel)

			onStatusUpdate?.(order._id, englishStatus)
		} catch (error) {
			console.error('Ошибка при обновлении статуса:', error)
		} finally {
			setIsUpdating(false)
		}
	}

	const handleToggleDetails = () => {
		setShowOrderDetails(prev => !prev)
		if (showOrderDetails) {
			setShowFullOrder(false)
		}
	}

	const handleToggleFullOrder = () => {
		setShowFullOrder(prev => !prev)
	}

	const handleExportToExcel = async () => {
		if (!order || isExporting) return

		setIsExporting(true)
		try {
			await exportOrderToExcel(order)
		} catch (error) {
			console.error('Ошибка при выгрузке в Excel:', error)
		} finally {
			setIsExporting(false)
		}
	}

	if (!order) return null

	return (
		<div className='text-main-text mb-8 border-b pb-8 last:border-b-0'>
			<div className='flex flex-wrap justify-between items-center gap-x-10 mb-15 xl:mb-5'>
				{/* Левая часть */}
				<div className='flex gap-5 items-center'>
					<h2 className='text-base md:text-lg xl:text-2xl font-bold'>
						{order.orderNumber.slice(-3)}
					</h2>
					<div className='flex items-center gap-x-2'>
						<span className='text-base md:text-lg'>{order.name}</span>
						<span className='text-base md:text-lg'>{order.surname}</span>
					</div>
				</div>

				{/* Правая часть */}
				<div className='flex flex-wrap gap-5 items-center'>
					<div className='flex items-center gap-2'>
						<LuPhone className='text-xl' />
						<span className='underline'>{formatPhoneNumber(order.phone)}</span>
					</div>

					<StatusDropdown
						currentStatusLabel={currentStatusLabel}
						isUpdating={isUpdating}
						onStatusChange={handleStatusChange}
					/>
					{showOrderDetails && (
						<button
							className={`${buttonStyles.active} hover:scale-105 w-50 h-10 px-2 flex justify-center items-center gap-2 rounded duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
							onClick={handleExportToExcel}
							disabled={isExporting}
						>
							{isExporting ? (
								<>
									<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900' />
									Экспорт...
								</>
							) : (
								<>
									<LuUpload />
									Выгрузить в Excel
								</>
							)}
						</button>
					)}
					<button
						className='bg-[#f3f2f1] hover:scale-105 w-50 h-10 px-2 flex justify-center items-center gap-2 rounded duration-300 cursor-pointer disabled:opacity-50'
						onClick={handleToggleDetails}
						disabled={isExporting}
					>
						{!showOrderDetails ? (
							<>
								<MdOutlineVisibility className='text-xl' />
								Посмотреть
							</>
						) : (
							<>
								<MdOutlineVisibilityOff className='text-xl' />
								Скрыть заказ
							</>
						)}
					</button>
				</div>
			</div>
			{/* Детали заказа */}
			{showOrderDetails && (
				<div className='mt-8'>
					<OrderProductsLoader
						orderItems={order.items}
						applyIndexStyles={showFullOrder}
						showFullOrder={showFullOrder}
					/>

					<div className='flex justify-center mt-10'>
						<button
							className='bg-gray-300 hover:scale-105 text-main-text w-60 h-10 px-2 flex justify-center items-center gap-2 rounded duration-300 cursor-pointer disabled:opacity-50'
							onClick={handleToggleFullOrder}
							disabled={isExporting}
						>
							{showFullOrder ? (
								<>
									<MdOutlineVisibilityOff className='text-xl' />
									Скрыть подробности
								</>
							) : (
								<>
									<MdOutlineVisibility className='text-xl' />
									Подробности заказа
								</>
							)}
						</button>
					</div>

					{showFullOrder && <OrderDetails order={order} />}
				</div>
			)}
		</div>
	)
}

export default AdminOrderCard
