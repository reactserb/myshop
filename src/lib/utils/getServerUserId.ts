import { headers } from 'next/headers'
import {
	getCustomSessionTokenServerComp,
	getValidCustomSession,
} from './auth-helpers'

export async function getServerUserId() {
	try {
		const headersList = await headers()
		const cookies = headersList.get('cookie')
		const sessionToken = getCustomSessionTokenServerComp(cookies)
		if (!sessionToken) return null
		const session = await getValidCustomSession(sessionToken)
		return session?.userId || null
	} catch {
		return null
	}
}
