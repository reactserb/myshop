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
		const requestData = await request.json()

		const { purchasedProductIds } = requestData
		const userId = await getServerUserId()

		if (!userId) {
			return NextResponse.json(
				{ message: 'Пользователь не авторизован' },
				{ status: 401 }
			)
		}

		let userObjectId
		try {
			userObjectId = new ObjectId(userId as string)
		} catch {
			console.error('Invalid user ID format:', userId)
			return NextResponse.json(
				{ message: 'Неверный формат ID пользователя' },
				{ status: 400 }
			)
		}

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

		const user = await db.collection('user').findOne({
			_id: userObjectId,
		})

		if (!user) {
			return NextResponse.json(
				{ message: 'Пользователь не найден' },
				{ status: 404 }
			)
		}

		const currentPurchases = Array.isArray(user.purchases) ? user.purchases : []

		const numericPurchasedIds = purchasedProductIds.map(
			(purchase: PurchaseItem) => Number(purchase.productId)
		)

		// СОЗДАЕМ МАССИВ ТОЛЬКО С УНИКАЛЬНЫМИ ID
		const uniqueNewIds = numericPurchasedIds.filter(
			(id: number, index: number, array: number[]) =>
				array.indexOf(id) === index // Оставляем только уникальные ID: если индекс первого вхождения равен текущему индексу, значит это не дубликат
		)

		// ОБЪЕДИНЯЕМ СУЩЕСТВУЮЩИЕ И НОВЫЕ ПОКУПКИ, УБИРАЯ ДУБЛИКАТЫ
		const allPurchases = [...currentPurchases, ...uniqueNewIds] // Объединяем два массива в один с помощью spread оператора
		const updatedPurchases = allPurchases.filter(
			(id: number, index: number, array: number[]) =>
				array.indexOf(id) === index // Фильтруем объединенный массив, оставляя только уникальные значения (удаляем возможные дубликаты между currentPurchases и uniqueNewIds)
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
				{ message: 'Данные не были обновлены' },
				{ status: 500 }
			)
		}

		return NextResponse.json({
			success: true,
			message: 'Пользователь успешно обновлен',
			updatedFields: {
				productsAdded: uniqueNewIds.length,
				totalPurchases: updatedPurchases.length,
				cartCleared: true,
			},
		})
	} catch (error) {
		console.error('Ошибка обновления данных пользователя:', error)
		return NextResponse.json(
			{ message: 'Внутренняя ошибка сервера' },
			{ status: 500 }
		)
	}
}
