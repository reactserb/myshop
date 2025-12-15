'use client'

import { useFavorites } from '@/hooks/useFavorite'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LuStar } from 'react-icons/lu'

const FavoriteButton = ({ productId }: { productId: string }) => {
	const { isAuth } = useAuthStore()
	const [showAlert, setShowAlert] = useState(false)
	const [alertMessage, setAlertMessage] = useState('')
	const [alertType, setAlertType] = useState<'add' | 'remove'>('add')
	const { toggleFavorite, isFavorite } = useFavorites()
	const router = useRouter()

	const handleClick = async (e: React.MouseEvent) => {
		e.stopPropagation()
		if (!isAuth) {
			router.push('/login')
			return
		}

		try {
			const wasFavorite = isFavorite(productId)

			await toggleFavorite(productId)

			setAlertMessage(
				wasFavorite ? 'Удалено из Избранного' : 'Добавлено в Избранное'
			)
			setAlertType(wasFavorite ? 'remove' : 'add')
			setShowAlert(true)
			setTimeout(() => setShowAlert(false), 3000)
		} catch (error) {
			console.error('Не удалось переключить избранное:', error)
		}
	}

	const isActive = isAuth && isFavorite(productId)

	return (
		<>
			<button
				onClick={handleClick}
				className={`w-8 h-8 absolute z-[15] top-2 right-1 cursor-pointer xl:hidden xl:group-hover:flex`}
			>
				<LuStar
					className={`text-2xl ${isActive ? 'text-red-700 bg-red-200 rounded-3xl' : 'text-gray-400 xl:hover:text-black'}`}
				/>
			</button>
			{showAlert && (
				<div
					className={`fixed top-4 right-4 z-[1000] px-6 py-3 rounded-xl shadow-2xl animate-in slide-in-from-top-2 fade-in duration-300 max-w-sm ${
						alertType === 'add'
							? 'bg-gradient-to-r from-teal-600 to-teal-300 text-white'
							: 'bg-gradient-to-r from-red-600 to-red-300 text-white'
					}`}
				>
					<div className='flex items-center gap-2'>
						<span className='text-lg font-semibold'>
							<LuStar className='text-2xl' />
						</span>
						<span className='font-medium'>{alertMessage}</span>
					</div>
				</div>
			)}
		</>
	)
}

export default FavoriteButton
