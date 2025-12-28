import { Order, OrderItem } from '@/lib/types/order'
import { getMappedStatus } from './getMappedStatus'
import { SimplifiedOrderData } from '@/lib/types/excel'
import { downloadExcel, generateOrderExcel } from './excelGenerator'
import { getPaymentStatusText } from './getPaymentStatusText'

interface ProductData {
	title?: string
	description?: string
}

interface EnrichedOrderItem extends Omit<OrderItem, 'name' | 'title'> {
	description: string
	title: string
}

/**
 * Получает имя товара с приоритетами
 */
const getProductName = (productData?: ProductData): string => {
	return (
		`${productData?.description} ${productData?.title}` || 'Неизвестный товар'
	)
}

/**
 * Загружает данные о продукте
 */
const fetchProductDetails = async (productId: string): Promise<ProductData> => {
	try {
		const response = await fetch(`/api/products/${productId}`)
		if (!response.ok) throw new Error(`HTTP ${response.status}`)
		return await response.json()
	} catch (error) {
		console.warn(`Не удалось загрузить товар ${productId}:`, error)
		return {}
	}
}

/**
 * Обогащает данные товара информацией о продукте
 */
const enrichOrderItem = async (item: OrderItem): Promise<EnrichedOrderItem> => {
	const productData = await fetchProductDetails(item.productId)

	return {
		...item,
		description: getProductName(productData),
		title: productData?.title || '',
	}
}

const prepareExcelData = (
	order: Order,
	items: EnrichedOrderItem[]
): SimplifiedOrderData => ({
	order: {
		orderNumber: order.orderNumber,
		status: getMappedStatus(order),
		createdAt: order.createdAt,
		paymentStatus: getPaymentStatusText(order.paymentStatus),
		totalAmount: order.totalAmount,
		discountAmount: order.discountAmount,
		name: order.name,
		surname: order.surname,
		phone: order.phone,
		gender: order.gender,
		birthday: order.birthday,
		deliveryAddress: order.deliveryAddress,
	},
	items: items.map(item => ({
		productId: item.productId,
		description: item.description,
		size: item.size,
		price: item.price,
		title: item.title,
		totalPrice: item.price,
	})),
})

/**
 * Экспорт заказа в Excel
 */
export const exportOrderToExcel = async (order: Order): Promise<void> => {
	try {
		const enrichedItems = await Promise.all(order.items.map(enrichOrderItem))
		const excelData = prepareExcelData(order, enrichedItems)

		const excelBuffer = generateOrderExcel(excelData)
		downloadExcel(excelBuffer, `Заказ_${order.orderNumber}`)
	} catch (error) {
		console.error('Ошибка экспорта в Excel:', error)
		throw new Error('Не удалось экспортировать заказ')
	}
}
