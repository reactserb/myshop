import { ProductCardProps } from './product'

export interface CartItem {
	productId: string
	size: string
	addedAt: Date
}

export interface CartSummaryProps {
	visibleCartItems: CartItem[]
	totalPrice: number
	totalMaxPrice: number
	totalDiscount: number
}

export interface CartItemProps {
	item: {
		productId: string
		addedAt: Date
		size: string
	}
	productData: ProductCardProps | undefined
	isSelected: boolean
	onSelectionChange: (
		productId: string,
		size: string,
		isSelected: boolean
	) => void
}

export interface OrderCartItem {
	productId: string
	size: string
	addedAt: Date
}

export type SelectedCartItem = {
	productId: string
	size: string
}
