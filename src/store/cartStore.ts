import { CartItem } from '@/lib/types/cart'
import { CartState } from '@/lib/types/cartStoreStates'
import { create } from 'zustand'

export const useCartStore = create<CartState>(set => ({
	cartItems: [],
	totalItems: 0,
	isLoading: false,
	isCheckout: false,
	isOrdered: false,
	currentOrderId: null,
	orderNumber: null,

	fetchCart: async () => {
		try {
			set({ isLoading: true })
			const response = await fetch('/api/cart')

			if (!response.ok) {
				throw new Error('Failed to fetch cart')
			}

			const cartItems: CartItem[] = await response.json()

			const totalItems = cartItems.reduce((sum: number) => sum + 1, 0)

			set({
				cartItems,
				totalItems,
				isLoading: false,
			})
		} catch (error) {
			console.error('Error fetching cart:', error)
			set({ isLoading: false })
		}
	},

	updateCart: (items: CartItem[]) => {
		const totalItems = items.reduce((sum: number) => sum + 1, 0)
		set({
			cartItems: items,
			totalItems,
		})
	},

	clearCart: () => {
		set({
			cartItems: [],
			totalItems: 0,
		})
	},

	setIsCheckout: (isCheckout: boolean) => {
		set({
			isCheckout,
		})
	},
	setIsOrdered: (isOrdered: boolean) => {
		set({ isOrdered })
	},

	setOrderInfo: (orderId: string, orderNumber: string) => {
		set({ currentOrderId: orderId, orderNumber })
	},

	resetOrderInfo: () => {
		set({ currentOrderId: null, orderNumber: null })
	},

	resetAfterOrder: () => {
		set({
			cartItems: [],
			totalItems: 0,
			isCheckout: false,
			isOrdered: false,
			currentOrderId: null,
			orderNumber: null,
		})
	},
}))
