import { getDB } from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { phoneNumber } = await request.json()
		const db = await getDB()

		const user = await db.collection('user').findOne({ phoneNumber })

		if (!user) {
			return NextResponse.json({
				exists: false,
			})
		}

		return NextResponse.json({
			exists: true,
			userName: user.name,
		})
	} catch (error) {
		console.error('Ошибка проверки телефона: ', error)
		NextResponse.json(
			{
				error: 'Ошибка сервера',
			},
			{
				status: 500,
			}
		)
	}
}
