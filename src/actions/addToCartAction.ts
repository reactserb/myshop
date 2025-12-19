'use server'

import { CartItem } from '@/lib/types/cart'
import { getDB } from '@/lib/utils/api-routes'
import { getServerUserId } from '@/lib/utils/getServerUserId'
import { ObjectId } from 'mongodb'

export async function addToCartAction(
	productId: string,
	size: string
): Promise<{ success: boolean; message: string }> {
	try {
		if (!productId) {
			return { success: false, message: 'ID продукта не указан' }
		}

		const userId = await getServerUserId()

		if (!userId) {
			return { success: false, message: 'Не авторизован' }
		}

		const db = await getDB()

		const user = await db.collection('user').findOne({
			_id: new ObjectId(userId as string),
		})

		if (!user) {
			return { success: false, message: 'Пользователь не найден' }
		}

		const productIdNumber = parseInt(productId)

		const product = await db.collection('products').findOne({
			id: productIdNumber,
		})

		if (!product) {
			return { success: false, message: 'Продукт не найден' }
		}

		const cartItems: CartItem[] = user.cart || []

		const existingItem = cartItems.find(
			(item: CartItem) => item.productId === productId && item.size === size
		)

		if (existingItem) {
			return {
				success: false,
				message: 'Товар с таким размером уже в корзине.',
			}
		}

		const newCartItem: CartItem = {
			productId,
			size,
			addedAt: new Date(),
		}

		const newCartItems = [...cartItems, newCartItem]

		await db
			.collection('user')
			.updateOne(
				{ _id: new ObjectId(userId as string) },
				{ $set: { cart: newCartItems } }
			)

		let successMessage = 'Товар добавлен в корзину'

		const result: { success: boolean; message: string } = {
			success: true,
			message: successMessage,
		}

		return result
	} catch {
		return { success: false, message: 'Ошибка сервера' }
	}
}
