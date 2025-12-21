import { getDB } from '@/lib/utils/api-routes'
import { getServerUserId } from '@/lib/utils/getServerUserId'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const db = await getDB()
		const orderData = await request.json()

		// Получаем ID текущего пользователя из сессии
		const userId = await getServerUserId()

		if (!userId) {
			return NextResponse.json(
				{ message: 'Пользователь не авторизован' },
				{ status: 401 }
			)
		}

		// Находим пользователя по его ID
		const user = await db.collection('user').findOne({
			_id: new ObjectId(userId as string),
		})

		if (!user) {
			return NextResponse.json(
				{ message: 'Пользователь не найден' },
				{ status: 404 }
			)
		}

		const roundedTotalAmount =
			Math.round((orderData.totalPrice || 0) * 100) / 100
		const roundedDiscountAmount =
			Math.round((orderData.totalDiscount || 0) * 100) / 100

		const order = {
			userId: user._id,
			orderNumber: `${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`,
			status: 'pending',
			paymentStatus: 'waiting',
			totalAmount: roundedTotalAmount,
			discountAmount: roundedDiscountAmount,
			deliveryAddress: orderData.deliveryAddress,
			surname: user.surname,
			name: user.name,
			phone: user.phoneNumber,
			gender: user.gender,
			birthday: user.birthdayDate,
			items: orderData.cartItems.map(
				(item: {
					productId: string
					size: string
					price: number
					discountPercent?: number
				}) => ({
					productId: item.productId,
					size: item.size,
					price: Math.round((item.price || 0) * 100) / 100,
					discountPercent: item.discountPercent,
				})
			),
			createdAt: new Date(),
			updatedAt: new Date(),
		}

		const result = await db.collection('orders').insertOne(order)

		return NextResponse.json({
			success: true,
			order: {
				...order,
				_id: result.insertedId,
			},
			orderNumber: order.orderNumber,
		})
	} catch (error) {
		console.error('Ошибка создания заказа:', error)
		return NextResponse.json(
			{ message: 'Внутренняя ошибка сервера' },
			{ status: 500 }
		)
	}
}
