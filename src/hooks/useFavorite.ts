'use client'

import { useAuthStore } from '@/store/authStore'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useFavorites = () => {
	const { user } = useAuthStore()
	const [favorites, setFavorites] = useState<string[]>([])
	const pathname = usePathname()
	const router = useRouter()

	useEffect(() => {
		const loadFavorites = async () => {
			if (!user?.id) {
				setFavorites([])
				return
			}

			try {
				const response = await fetch(`/api/favorites?userId=${user.id}`)
				if (response.ok) {
					const data = await response.json()
					setFavorites(data.favorites || [])
				}
			} catch (error) {
				console.error('Ошибка загрузки избранного:', error)
			}
		}

		loadFavorites()
	}, [user?.id])

	const toggleFavorite = async (productId: string) => {
		if (!user?.id) return

		const isCurrentlyFavorite = favorites.includes(productId)
		const action = isCurrentlyFavorite ? 'remove' : 'add'

		const response = await fetch('/api/favorites', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				userId: user.id,
				productId,
				action,
			}),
		})

		if (response.ok) {
			if (isCurrentlyFavorite) {
				setFavorites(prev => prev.filter(id => id !== productId))
			} else {
				setFavorites(prev => [...prev, productId])
			}
		}
		if (pathname === '/favorites') {
			router.refresh()
		}
	}

	const isFavorite = (productId: string) => favorites.includes(productId)

	return {
		toggleFavorite,
		isFavorite,
	}
}
