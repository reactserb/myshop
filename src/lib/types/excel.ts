export interface SimplifiedOrderData {
	order: {
		orderNumber: string
		status: string
		createdAt: string
		paymentStatus: string
		totalAmount: number
		discountAmount: number
		name: string
		surname: string
		phone: string
		gender: string
		birthday: string
		deliveryAddress: {
			city: string
			street: string
			house: string
			apartment: string
			additional?: string
		}
	}
	items: Array<{
		productId: string
		description: string
		price: number
		size: string
		totalPrice: number
		title: string
	}>
}
