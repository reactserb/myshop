import { getDB } from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const db = await getDB()
		const users = await db.collection('users').find().toArray()

		return NextResponse.json(users)
	} catch {
		return NextResponse.json(
			{ message: 'Error to fetch users' },
			{ status: 500 }
		)
	}
}
