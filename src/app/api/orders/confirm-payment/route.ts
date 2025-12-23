import { getDB } from '@/lib/utils/api-routes'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const db = await getDB()
		const { orderId, purchasedProductIds } = await request.json()

		if (!orderId) {
			return NextResponse.json(
				{ message: 'ID заказа обязателен' },
				{ status: 400 }
			)
		}

		// 1. Находим заказ
		const order = await db.collection('orders').findOne({
			_id: ObjectId.createFromHexString(orderId),
		})

		if (!order) {
			return NextResponse.json({ message: 'Заказ не найден' }, { status: 404 })
		}

		// 2. СПИСЫВАЕМ ТОВАРЫ
		for (const purchase of purchasedProductIds) {
			const productId = Number(purchase.productId)
			const size = purchase.size

			const product = await db.collection('products').findOne({ id: productId })

			if (product && product.sizes && Array.isArray(product.sizes)) {
				const updatedSizes = product.sizes.filter((s: string) => s !== size)

				await db.collection('products').updateOne(
					{ id: productId },
					{
						$set: {
							sizes: updatedSizes,
							updatedAt: new Date(),
						},
					}
				)
			}
		}

		// 3. Обновляем статус заказа
		await db.collection('orders').updateOne(
			{ _id: ObjectId.createFromHexString(orderId) },
			{
				$set: {
					status: 'confirmed',
					paymentStatus: 'paid',
					paidAt: new Date(),
					updatedAt: new Date(),
				},
			}
		)

		return NextResponse.json({
			success: true,
			message: 'Оплата подтверждена и размеры списаны',
		})
	} catch (error) {
		console.error('Ошибка подтверждения оплаты:', error)
		return NextResponse.json(
			{ message: 'Внутренняя ошибка сервера' },
			{ status: 500 }
		)
	}
}
