import { SimplifiedOrderData } from '@/lib/types/excel'
import * as XLSX from 'xlsx'

export const generateOrderExcel = (data: SimplifiedOrderData) => {
	const workbook = XLSX.utils.book_new()
	const { order, items } = data

	// === ЛИСТ 1: ОСНОВНАЯ ИНФОРМАЦИЯ О ЗАКАЗЕ ===
	const formatDate = (dateString: string): string => {
		if (!dateString) return 'Не указано'
		try {
			const date = new Date(dateString)
			return date.toLocaleDateString('ru-RU')
		} catch {
			return dateString
		}
	}

	const formatDateTime = (dateString: string): string => {
		if (!dateString) return 'Не указано'
		try {
			const date = new Date(dateString)
			return date.toLocaleString('ru-RU')
		} catch {
			return dateString
		}
	}

	const orderSummary = [
		['📋 ОСНОВНАЯ ИНФОРМАЦИЯ О ЗАКАЗЕ', ''],
		['Номер заказа', order.orderNumber],
		['Статус заказа', order.status],
		['Дата создания', formatDateTime(order.createdAt)],
		['', ''],
		['💳 ИНФОРМАЦИЯ ОБ ОПЛАТЕ', ''],
		['Статус оплаты', order.paymentStatus],
		['Общая сумма', `${order.totalAmount} ₽`],
		['Скидка', order.discountAmount > 0 ? `${order.discountAmount} ₽` : 'Нет'],
		['', ''],
		['👤 ИНФОРМАЦИЯ О КЛИЕНТЕ', ''],
		['ФИО', `${order.surname || ''} ${order.name}`.trim()],
		['Телефон', order.phone],
		[
			'Пол',
			order.gender === 'male'
				? 'Мужской'
				: order.gender === 'female'
					? 'Женский'
					: 'Не указан',
		],
		[
			'Дата рождения',
			order.birthday ? formatDate(order.birthday) : 'Не указана',
		],
		['', ''],
		['🚚 ИНФОРМАЦИЯ О ДОСТАВКЕ', ''],
		[
			'Адрес доставки',
			[
				order.deliveryAddress?.city,
				order.deliveryAddress?.street,
				order.deliveryAddress?.house,
				order.deliveryAddress?.apartment &&
					`кв. ${order.deliveryAddress.apartment}`,
			]
				.filter(Boolean)
				.join(', ') || 'Не указан',
		],
	]

	const orderSheet = XLSX.utils.aoa_to_sheet(orderSummary)
	XLSX.utils.book_append_sheet(workbook, orderSheet, '📋 Заказ')

	// === ЛИСТ 2: ТОВАРЫ В ЗАКАЗЕ ===
	const productsHeader = [
		'№',
		'ID товара',
		'Наименование',
		'Размер',
		'Бренд',
		'Общая стоимость',
	]

	const productsData = items.map((item, index) => [
		index + 1,
		item.productId,
		item.description || 'Название не указано',
		item.size.toUpperCase(),
		item.title || 'Не указан',
		`${item.totalPrice} ₽`,
	])

	const totalRow = [
		'',
		'',
		'',
		'',
		'💰 ИТОГО:',
		`${order.totalAmount} ₽`,
		'',
		'',
	]

	const productsSheetData = [productsHeader, ...productsData, totalRow]
	const productsSheet = XLSX.utils.aoa_to_sheet(productsSheetData)
	XLSX.utils.book_append_sheet(workbook, productsSheet, '📦 Товары')

	// === ЛИСТ 3: СВОДКА ПО ЗАКАЗУ ===
	const summaryData = [
		['📊 СВОДКА ПО ЗАКАЗУ', ''],
		['Номер заказа', order.orderNumber],
		['Дата создания', formatDateTime(order.createdAt)],
		['Количество товаров', items.length],
		['Общая сумма заказа', `${order.totalAmount} ₽`],
		['', ''],
		['РАСПРЕДЕЛЕНИЕ ПО ТОВАРАМ', ''],
		...items.map((item, index) => [
			`${index + 1}. ${item.description || item.productId}`,
			`Размер ${item.size.toUpperCase()}`,
			`Цена ${item.price} ₽`,
		]),
	]

	const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)
	XLSX.utils.book_append_sheet(workbook, summarySheet, '📊 Сводка')

	const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
	return excelBuffer
}

export const downloadExcel = (excelBuffer: ArrayBuffer, fileName: string) => {
	const blob = new Blob([excelBuffer], {
		type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	})

	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.download = `${fileName.replace(/[^\w\s]/gi, '')}.xlsx`
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	URL.revokeObjectURL(url)
}
