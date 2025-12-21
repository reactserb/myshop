export interface DeliveryAddress {
	city: string
	street: string
	house: string
	apartment: string
	additional: string
}

export interface CartItemWithPrice {
	productId: string
	size: string
	price: number
	basePrice?: number
}

export interface CreateOrderRequest {
	totalMaxPrice: number
	totalDiscount: number
	deliveryAddress: DeliveryAddress
	cartItems: CartItemWithPrice[]
	totalPrice: number
	paymentId?: string
}

export interface UpdateUserData {
	purchasedProductIds: Array<{
		productId: string
		size: string
	}>
}
