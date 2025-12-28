import { getDB } from '@/lib/utils/api-routes'
import { getServerUserId } from '@/lib/utils/getServerUserId'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

interface PurchaseItem {
	productId: string
	size: string
}

export async function POST(request: Request) {
	try {
		const db = await getDB()
		const body = await request.json()

		const { orderId, purchasedProductIds } = body as {
			orderId?: string
			purchasedProductIds?: PurchaseItem[]
		}

		if (!orderId) {
			return NextResponse.json(
				{ message: 'ID заказа обязателен' },
				{ status: 400 }
			)
		}

		if (
			!Array.isArray(purchasedProductIds) ||
			purchasedProductIds.length === 0
		) {
			return NextResponse.json(
				{ message: 'Список купленных товаров пуст или некорректен' },
				{ status: 400 }
			)
		}

		// --- 1. Заказ ---

		let orderObjectId: ObjectId
		try {
			orderObjectId = new ObjectId(orderId)
		} catch {
			return NextResponse.json(
				{ message: 'Неверный формат ID заказа' },
				{ status: 400 }
			)
		}

		const order = await db.collection('orders').findOne({ _id: orderObjectId })

		if (!order) {
			return NextResponse.json({ message: 'Заказ не найден' }, { status: 404 })
		}

		// --- 2. Списываем размеры у товаров ---

		for (const purchase of purchasedProductIds) {
			const productIdNum = Number(purchase.productId)
			const size = purchase.size

			if (!productIdNum || !size) continue

			const product = await db
				.collection('products')
				.findOne({ id: productIdNum })

			if (product && Array.isArray(product.sizes)) {
				const updatedSizes = product.sizes.filter((s: string) => s !== size)

				await db.collection('products').updateOne(
					{ id: productIdNum },
					{
						$set: {
							sizes: updatedSizes,
							updatedAt: new Date(),
						},
					}
				)
			}
		}

		// --- 3. Обновляем статус заказа ---

		await db.collection('orders').updateOne(
			{ _id: orderObjectId },
			{
				$set: {
					status: 'confirmed',
					paymentStatus: 'paid',
					paidAt: new Date(),
					updatedAt: new Date(),
				},
			}
		)

		await db.collection('orders').updateOne(
			{ _id: orderObjectId },
			{
				$set: {
					status: 'confirmed',
					paymentStatus: 'paid',
					paidAt: new Date(),
					updatedAt: new Date(),
				},
			}
		)

		// --- 4. Обновляем пользователя (покупки + очистка корзины) ---

		const userId = await getServerUserId()

		if (!userId) {
			// если важно, можно откатить, но чаще достаточно просто залогировать
			console.warn('Пользователь не авторизован при обновлении покупок')
		} else {
			let userObjectId: ObjectId
			try {
				userObjectId = new ObjectId(userId as string)
			} catch {
				console.error('Invalid user ID format:', userId)
				return NextResponse.json(
					{ message: 'Неверный формат ID пользователя' },
					{ status: 400 }
				)
			}

			const user = await db.collection('user').findOne({ _id: userObjectId })

			if (!user) {
				return NextResponse.json(
					{ message: 'Пользователь не найден' },
					{ status: 404 }
				)
			}

			const currentPurchases: number[] = Array.isArray(user.purchases)
				? user.purchases
				: []

			const numericPurchasedIds = purchasedProductIds.map((p: PurchaseItem) =>
				Number(p.productId)
			)

			const uniqueNewIds = numericPurchasedIds.filter(
				(id, index, array) => array.indexOf(id) === index
			)

			const allPurchases = [...currentPurchases, ...uniqueNewIds]

			const updatedPurchases = allPurchases.filter(
				(id, index, array) => array.indexOf(id) === index
			)

			const updateResult = await db.collection('user').updateOne(
				{ _id: userObjectId },
				{
					$set: {
						purchases: updatedPurchases,
						cart: [],
						updatedAt: new Date(),
					},
				}
			)

			if (updateResult.modifiedCount === 0) {
				return NextResponse.json(
					{ message: 'Данные пользователя не были обновлены' },
					{ status: 500 }
				)
			}
		}

		// --- 5. Ответ ---

		return NextResponse.json({
			success: true,
			message:
				'Оплата подтверждена, размеры списаны, данные пользователя обновлены',
		})
	} catch (error) {
		console.error(
			'Ошибка подтверждения оплаты / обновления пользователя:',
			error
		)
		return NextResponse.json(
			{ message: 'Внутренняя ошибка сервера' },
			{ status: 500 }
		)
	}
}
