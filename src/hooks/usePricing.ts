'use client'

import { ProductCardProps } from '@/lib/types/product'
import { calculateFinalPrice } from '@/lib/utils/price/calculateFinalPrice'
import { useMemo } from 'react'

interface UsePricingProps {
	visibleCartItems: Array<{
		productId: string
		size: string
	}>
	productsData: {
		[key: string]: ProductCardProps
	}
}

export const usePricing = ({
	visibleCartItems,
	productsData,
}: UsePricingProps) => {
	const { totalDiscount, totalMaxPrice, totalPrice } = useMemo(() => {
		const totalMaxPrice = visibleCartItems.reduce((total, item) => {
			const product = productsData[item.productId]
			if (!product) return total // Пропускаем если данные товара не загружены

			return total + product.basePrice
		}, 0)
		const totalDiscount = visibleCartItems.reduce((total, item) => {
			const product = productsData[item.productId]
			if (!product) return total

			const priceWithDiscount = calculateFinalPrice(
				product.basePrice,
				product.discountPercent || 0
			)

			const itemDiscount = product.basePrice - priceWithDiscount

			return total + itemDiscount
		}, 0)

		const totalPrice = visibleCartItems.reduce((total, item) => {
			const product = productsData[item.productId]
			if (!product) return total // Пропускаем если данные товара не загружены

			// Рассчитываем цену с учетом скидки на товар
			const finalPrice = calculateFinalPrice(
				product.basePrice,
				product.discountPercent || 0
			)

			return total + finalPrice
		}, 0)

		return { totalPrice, totalMaxPrice, totalDiscount }
	}, [visibleCartItems, productsData])

	return {
		totalDiscount,
		totalMaxPrice,
		totalPrice,
	}
}
