import { Order } from '@/lib/types/order'

export const getStatusText = (order: Order): string => {
	if (order.paymentStatus === 'failed') {
		return 'Не оплачен'
	} else if (order.paymentStatus === 'paid' && order.status === 'confirmed') {
		return 'Подтвержден'
	} else if (order.paymentStatus === 'waiting' && order.status === 'pending') {
		return 'В процессе'
	}

	const statusMap: { [key: string]: string } = {
		pending: 'В процессе',
		refund: 'Возврат',
		delivering: 'Отправлен',
		confirmed: 'Подтвержден',
		delivered: 'Доставлен',
		cancelled: 'Отменен',
	}

	return statusMap[order.status] || order.status
}
