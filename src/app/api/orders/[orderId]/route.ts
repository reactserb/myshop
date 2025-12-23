import { getDB } from '@/lib/utils/api-routes'
import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ orderId: string }> }
) {
	try {
		const db = await getDB()
		const { orderId } = await params
		const updateData = await request.json()

		const mappedUpdateData = {
			deliveryAddress: updateData.deliveryAddress,
			items: updateData.cartItems,
			totalAmount: updateData.totalPrice,
			discountAmount: updateData.totalDiscount,
			updatedAt: new Date(),
		}

		const result = await db
			.collection('orders')
			.updateOne(
				{ _id: ObjectId.createFromHexString(orderId) },
				{ $set: mappedUpdateData }
			)

		if (result.matchedCount === 0) {
			return NextResponse.json({ message: 'Заказ не найден' }, { status: 404 })
		}

		return NextResponse.json({
			success: true,
			message: 'Заказ обновлён',
			modifiedCount: result.modifiedCount,
		})
	} catch (error) {
		console.error('Ошибка обновления заказа:', error)
		return NextResponse.json(
			{ message: 'Внутренняя ошибка сервера' },
			{ status: 500 }
		)
	}
}
