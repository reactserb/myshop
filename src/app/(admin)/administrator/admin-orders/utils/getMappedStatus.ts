import { Order } from '@/lib/types/order'
import { CUSTOMER_STATUSES } from './customerStatuses'

export const getMappedStatus = (order: Order): string => {
	if (order.paymentStatus === 'paid' && order.status === 'confirmed') {
		return 'Подтвержден'
	} else if (order.paymentStatus === 'failed' && order.status === 'cancelled') {
		return 'Не подтвержден'
	} else if (order.paymentStatus === 'waiting' && order.status === 'pending') {
		return 'Новый'
	}

	const statusFromValue = CUSTOMER_STATUSES.find(
		status => status.value === order.status
	)
	if (statusFromValue) {
		return statusFromValue.label
	}

	return 'Новый'
}
