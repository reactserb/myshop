'use client'

import { addProductToViewed } from '@/lib/utils/localStorageUtils'
import { useAuthStore } from '@/store/authStore'
import { useEffect } from 'react'

export function ViewHistoryLogger({ productId }: { productId: string }) {
	const { isAuth } = useAuthStore()

	useEffect(() => {
		addProductToViewed(productId, isAuth)
	}, [productId, isAuth])

	return null
}
