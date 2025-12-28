import { getDB } from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
	try {
		const db = await getDB()

		const orders = await db
			.collection('orders')
			.find({})
			.sort({
				createdAt: -1,
			})
			.toArray()

		return NextResponse.json({ orders })
	} catch (error) {
		console.error('Ошибка при загрузке заказов:', error)
		return NextResponse.json(
			{ message: 'Ошибка при загрузке заказов' },
			{ status: 500 }
		)
	}
}
