import { CartItem } from './cart'

export interface CartState {
	cartItems: CartItem[]
	totalItems: number
	isLoading: boolean
	isCheckout: boolean
	isOrdered: boolean
	fetchCart: () => Promise<void>
	updateCart: (items: CartItem[]) => void
	clearCart: () => void
	setIsCheckout: (isCheckout: boolean) => void
	setIsOrdered: (isOrdered: boolean) => void
	resetAfterOrder: () => void
}
