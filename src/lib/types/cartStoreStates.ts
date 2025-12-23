import { CartItem } from './cart'

export interface CartState {
	cartItems: CartItem[]
	totalItems: number
	isLoading: boolean
	isCheckout: boolean
	isOrdered: boolean
	currentOrderId: string | null
	orderNumber: string | null
	fetchCart: () => Promise<void>
	updateCart: (items: CartItem[]) => void
	clearCart: () => void
	setIsCheckout: (isCheckout: boolean) => void
	setIsOrdered: (isOrdered: boolean) => void
	setOrderInfo: (orderId: string, orderNumber: string) => void
	resetOrderInfo: () => void
	resetAfterOrder: () => void
}
