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

export interface Order {
	status: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
	paymentStatus: 'pending' | 'waiting' | 'paid'
}

// Для онлайн-оплаты:
// 1. Создание: status: "pending", paymentStatus: "pending"
// 2. Переход на оплату: paymentStatus: "waiting"
// 3. Успешная оплата: status: "confirmed",
// paymentStatus: "paid"
// 4. Доставка: status: "delivered"
