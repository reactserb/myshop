'use client'

import { useAuthStore } from '@/store/authStore'
import { useFavoriteStore } from '@/store/useFavoriteStore'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useFavorites = () => {
	const { user } = useAuthStore()
	const { favorites, isLoaded, setFavorites, addFavorite, removeFavorite } =
		useFavoriteStore()
	const pathname = usePathname()
	const router = useRouter()

	useEffect(() => {
		const loadFavorites = async () => {
			// Если данных нет, пользователь не авторизован или данные уже загружены - выходим
			if (!user?.id || isLoaded) return

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
	}, [user?.id, isLoaded, setFavorites])

	const toggleFavorite = async (productId: string) => {
		if (!user?.id) return
		const isCurrentlyFavorite = favorites.includes(productId)
		const action = isCurrentlyFavorite ? 'remove' : 'add'

		// Оптимистичное обновление (сразу меняем в UI)
		if (isCurrentlyFavorite) removeFavorite(productId)
		else addFavorite(productId)

		try {
			const response = await fetch('/api/favorites', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userId: user.id, productId, action }),
			})

			if (!response.ok) {
				// Если сервер ответил ошибкой, откатываем изменения (необязательно, но желательно)
				if (isCurrentlyFavorite) addFavorite(productId)
				else removeFavorite(productId)
			}
		} catch (e) {
			console.error(e)
		}

		if (pathname === '/favorites') {
			router.refresh()
		}
	}

	return {
		favorites,
		toggleFavorite,
		isFavorite: (productId: string) => favorites.includes(productId),
	}
}
