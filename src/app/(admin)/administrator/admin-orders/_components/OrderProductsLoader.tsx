'use client'

import ProductsSection from '@/app/(products)/ProductsSection'
import MiniLoader from '@/components/MiniLoader'
import { ProductCardProps } from '@/lib/types/product'
import { useEffect, useState } from 'react'

interface OrderProduct {
	productId: string
	description: string
	size: string
	price: number
	totalPrice: number
}

interface OrderProductsLoaderProps {
	orderItems: OrderProduct[]
	applyIndexStyles?: boolean
	showFullOrder?: boolean
}

const OrderProductsLoader = ({
	orderItems,
	applyIndexStyles = true,
}: OrderProductsLoaderProps) => {
	const [products, setProducts] = useState<ProductCardProps[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const productPromises = orderItems.map(async item => {
					const response = await fetch(`/api/products/${item.productId}`)
					const productData = await response.json()

					return {
						...productData,
						orderSize: item.size,
						orderPrice: item.price,
					}
				})

				const productsData = await Promise.all(productPromises)
				setProducts(productsData)
			} catch (err) {
				console.error('Ошибка:', err)
			} finally {
				setLoading(false)
			}
		}

		if (orderItems && orderItems.length > 0) {
			fetchProducts()
		} else {
			setLoading(false)
		}
	}, [orderItems])

	if (loading) {
		return <MiniLoader />
	}

	if (products.length === 0) {
		return (
			<div className='text-center py-4'>
				<div className='text-main-text'>Товары не найдены</div>
			</div>
		)
	}

	return (
		<ProductsSection
			products={products}
			applyIndexStyles={applyIndexStyles}
			isOrderPage={true}
			compact
		/>
	)
}

export default OrderProductsLoader
