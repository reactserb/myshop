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

export interface OrderItem {
	basePrice: number
	title: string
	productId: string
	size: string
	price: number
	discountPercent?: number
	productDetails?: {
		_id: string
		id: number
		img: string
		title: string
		description: string
		basePrice: number
		discountPercent: number
	}
}

export interface Order {
	_id: string
	userId: string
	orderNumber: string
	status: 'pending' | 'confirmed' | 'cancelled' | 'delivered' | 'failed'
	paymentStatus: 'pending' | 'waiting' | 'paid' | 'failed'
	paymentId: string
	totalAmount: number
	discountAmount: number
	deliveryAddress: DeliveryAddress
	surname: string
	name: string
	phone: string
	gender: string
	birthday: string
	items: OrderItem[]
	createdAt: string
	updatedAt: string
}

// Для онлайн-оплаты:
// 1. Создание: status: "pending", paymentStatus: "pending"
// 2. Переход на оплату: paymentStatus: "waiting"
// 3. Успешная оплата: status: "confirmed",
// paymentStatus: "paid"
// 4. Доставка: status: "delivered"
