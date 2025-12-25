import { Order, OrderItem } from '@/lib/types/order'
import { ProductCardProps } from '@/lib/types/product'
import { useEffect, useState } from 'react'

export const useOrderProducts = (order: Order) => {
	const [orderProducts, setOrderProducts] = useState<ProductCardProps[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const promises = order.items.map(async (item: OrderItem) => {
					try {
						const response = await fetch(`/api/products/${item.productId}`)
						if (!response.ok) {
							throw new Error(`Товар ${item.productId} не найден`)
						}

						const productData: ProductCardProps = await response.json()

						const productCardData = {
							_id: productData._id,
							id: productData.id,
							img: productData.img,
							title: productData.title,
							orderSize: item.size,
							sizes: productData.sizes,
							article: productData.article,
							description: productData.description,
							basePrice: productData.basePrice,
							orderPrice: item.price,
							discountPercent:
								item.discountPercent || productData.discountPercent || 0,
							categories: productData.categories || [],
						} as ProductCardProps

						return productCardData
					} catch (fetchError) {
						console.error(
							`Ошибка загрузки товара ${item.productId}:`,
							fetchError
						)
						return null
					}
				})

				const results = await Promise.all(promises)
				const validProducts = results.filter(
					(product): product is ProductCardProps => product !== null
				)

				setOrderProducts(validProducts)
			} catch (error) {
				console.error('Ошибка загрузки товаров:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchProducts()
	}, [order])

	return { orderProducts, loading }
}
