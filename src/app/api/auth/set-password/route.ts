import { NextRequest } from 'next/server'
import { ObjectId, UpdateFilter, Document } from 'mongodb'
import { getDB } from '@/lib/utils/api-routes'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
	try {
		const { userId, password, email, fieldsToUpdate } = await request.json()

		if (!userId || !password || !email || !fieldsToUpdate) {
			return Response.json(
				{ error: 'Требуются userId, password, email и дополнительные поля' },
				{ status: 400 }
			)
		}

		const db = await getDB()

		// 1. Хешируем пароль
		const hashedPassword = await bcrypt.hash(password, 10)

		// 2. Формируем полный объект обновления
		const updateData = {
			password: hashedPassword,
			email: email, // Заменяем временный email на реальный
			...fieldsToUpdate,
		}

		const updateOperation: UpdateFilter<Document> = {
			// Исправлена типизация с any на UpdateFilter<Document>
			$set: updateData,
		}

		updateOperation.$unset = { emailVerified: '' }

		const result = await db
			.collection('user')
			.updateOne({ _id: ObjectId.createFromHexString(userId) }, updateOperation)

		if (result.matchedCount === 0) {
			return Response.json(
				{ error: 'Пользователь не найден', debug: { userId } },
				{ status: 404 }
			)
		}

		return Response.json({ success: true }, { status: 200 })
	} catch (error) {
		console.error('Ошибка в set-password API:', error)
		return Response.json(
			{ error: 'Внутренняя ошибка сервера' },
			{ status: 500 }
		)
	}
}
