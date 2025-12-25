import { Order } from '@/lib/types/order'

const OrderDetails: React.FC<{ order: Order }> = ({ order }) => {
	return (
		<>
			<div className='mb-4 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-3 lg:gap-6 text-sm mt-10'>
				<p className='text-main-text lg:text-base'>Адрес доставки:</p>
				<p className='font-medium lg:text-base break-words'>
					{order.deliveryAddress.city}, {order.deliveryAddress.street},
					{` д. ${order.deliveryAddress.house}`}
					{order.deliveryAddress.apartment &&
						`, кв. ${order.deliveryAddress.apartment}`}
				</p>
			</div>
			<div className='mt-4 pt-4 border-t border-gray-200 space-y-3 text-sm'>
				<div className='flex justify-between items-center'>
					<span className='text-main-text lg:text-base'>
						Итоговая цена без скидки
					</span>
					<span className='font-medium lg:text-base '>
						{(order.totalAmount + order.discountAmount).toLocaleString('ru-RU')}{' '}
						₽
					</span>
				</div>
			</div>
			<div className='mt-4 pt-4 border-t border-gray-200 space-y-3 text-sm'>
				<div className='flex justify-between items-center'>
					<span className='text-main-text lg:text-base'>Скидка:</span>
					<span className='font-medium lg:text-base text-red-700'>
						-{order.discountAmount.toLocaleString('ru-RU')} ₽
					</span>
				</div>
			</div>
		</>
	)
}

export default OrderDetails
