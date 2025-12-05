'use client'

import { LoadingContent } from '@/app/(auth)/(reg)/_components/LoadingContent'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import DeleteAccountModal from './DeleteAccountModal'

const SecuritySection: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
	const { user, logout } = useAuthStore()
	const router = useRouter()

	const handleAppLogout = async () => {
		try {
			await logout()
			router.replace('/')
		} catch (error) {
			console.error('Ошибка при выходе:', error)
			setError('Не удалось выйти из приложения')
		}
	}

	const handleDeleteAccount = async () => {
		if (!user) return

		try {
			setIsLoading(true)
			setError(null)

			const response = await fetch('/api/auth/delete-account', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userId: user.id }),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message || 'Не удалось удалить аккаунт')
			}

			logout() // Это очистит Zustand store
			router.replace('/goodbye') // Редирект на страницу прощания
		} catch (error) {
			console.error('Ошибка при удалении аккаунта:', error)
			setError(
				error instanceof Error
					? error.message
					: 'Не удалось удалить аккаунт. Попробуйте позже.'
			)
		} finally {
			setIsLoading(false)
			setShowDeleteConfirm(false)
		}
	}

	const handleOpenDeleteModal = () => {
		setError(null)
		setShowDeleteConfirm(true)
	}

	const handleCloseDeleteModal = () => {
		setError(null)
		setShowDeleteConfirm(false)
	}

	if (isLoading) {
		return (
			<div className='fixed inset-0 bg-white flex items-center justify-center z-[150]'>
				<LoadingContent title='Аккаунт удаляется ' />
			</div>
		)
	}

	return (
		<>
			<div className='border-t pt-8'>
				<h2 className='text-2xl font-bold text-gray-600 mb-6'>Безопасность</h2>
				{error && (
					<div className='mb-4 p-3 bg-red-100 border border-red-300 text-red-600 rounded'>
						{error}
					</div>
				)}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<button
						onClick={handleAppLogout}
						className='flex-1 bg-gray-300 border-none rounded flex hover:bg-gray-500 hover:text-gray-100 px-4 py-2 justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed h-12 text-gray-500 font-medium  duration-300 cursor-pointer'
					>
						Выйти из аккаунта
					</button>
					<button
						onClick={handleOpenDeleteModal}
						className='bg-red-300 hover:bg-red-500 text-white px-4 py-2 h-12 rounded font-medium duration-300 text-center cursor-pointer'
					>
						Удалить аккаунт
					</button>
				</div>
			</div>
			<DeleteAccountModal
				isOpen={showDeleteConfirm}
				onClose={handleCloseDeleteModal}
				onConfirm={handleDeleteAccount}
				error={error}
			/>
		</>
	)
}

export default SecuritySection
