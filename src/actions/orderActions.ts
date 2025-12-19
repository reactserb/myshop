'use server'

import { OrderCartItem } from '@/lib/types/cart'
import { getDB } from '@/lib/utils/api-routes'
import { getServerUserId } from '@/lib/utils/getServerUserId'
import { ObjectId } from 'mongodb'
import { revalidatePath } from 'next/cache'

export async function getOrderCartAction(): Promise<OrderCartItem[]> {
	try {
		const userId = await getServerUserId()

		if (!userId) {
			return []
		}

		const db = await getDB()
		const user = await db.collection('user').findOne({
			_id: new ObjectId(userId as string),
		})

		return user?.cart || []
	} catch (error) {
		console.error('Error getting cart:', error)
		return []
	}
}

// Удалить несколько товаров из корзины
export async function removeMultipleOrderItemsAction(
	itemsToRemove: {
		productId: string
		size: string
	}[]
): Promise<{ success: boolean; message: string }> {
	try {
		const userId = await getServerUserId()

		if (!userId) {
			return { success: false, message: 'Не авторизован' }
		}

		const db = await getDB()

		// Получаем текущую корзину
		const user = await db.collection('user').findOne({
			_id: new ObjectId(userId as string),
		})

		if (!user) {
			return { success: false, message: 'Пользователь не найден' }
		}

		// Фильтруем корзину, удаляя указанные товары
		const updatedCart = user.cart.filter((item: OrderCartItem) => {
			return !itemsToRemove.some(
				target =>
					target.productId === item.productId && target.size === item.size
			)
		})

		// Обновляем корзину
		await db.collection('user').updateOne(
			{
				_id: new ObjectId(userId as string),
			},
			{
				$set: { cart: updatedCart },
			}
		)

		revalidatePath('/cart')
		return {
			success: true,
			message: `Товары удалены`,
		}
	} catch (error) {
		console.error('Ошибка удаления продуктов:', error)
		return { success: false, message: 'Ошибка сервера' }
	}
}
