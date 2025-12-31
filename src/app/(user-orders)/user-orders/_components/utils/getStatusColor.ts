import { Order } from '@/lib/types/order'

export const getStatusColor = (order: Order) => {
	if (order.paymentStatus === 'paid' && order.status === 'confirmed') {
		return 'bg-teal-600 text-white'
	} else if (order.paymentStatus === 'failed') {
		return 'bg-[#d80000] text-white'
	} else if (order.paymentStatus === 'waiting' && order.status === 'pending') {
		return 'bg-[#f3f2f1] text-main-text'
	}

	switch (order.status) {
		case 'pending':
		case 'confirmed':
			return 'bg-[#f3f2f1]'
		case 'delivered':
			return 'bg-[#067647] text-white'
		case 'cancelled':
			return 'bg-[#d80000] text-white'
		case 'refund':
			return 'bg-[#fff9e6] text-[#b35c00]'
		case 'delivering':
			return 'bg-[#e6f7ee] text-[#067647]'
		default:
			return 'bg-[#f3f2f1] text-gray-800'
	}
}
