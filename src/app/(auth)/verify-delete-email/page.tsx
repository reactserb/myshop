'use client'

import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AuthFormLayout } from '../_components/AuthFormLayout'
import { LuMail, LuTrash2 } from 'react-icons/lu'
import { TbLoader2 } from 'react-icons/tb'

const VerifyDeleteEmailPage = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		try {
			const { error } = await authClient.deleteUser({
				callbackURL: '/goodbye',
			})

			if (error) {
				throw new Error(error.message)
			}

			setSuccess(true)

			router.replace('/')
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Произошла ошибка')
		} finally {
			setLoading(false)
		}
	}

	if (success) {
		return (
			<AuthFormLayout>
				<div className='text-center'>
					<h1 className='text-2xl font-bold mb-4'>Проверьте Вашу почту</h1>
					<p>Мы отправили письмо с подтверждением удаления аккаунта.</p>
				</div>
			</AuthFormLayout>
		)
	}

	return (
		<AuthFormLayout>
			<div className='flex flex-col gap-y-8'>
				<div className='flex flex-col items-center'>
					<LuTrash2 className='w-12 h-12 text-red-500 mb-4' />
					<h1 className='text-2xl font-bold text-center'>Удаление аккаунта</h1>
				</div>
				<p className='text-center'>
					Для подтверждения удаления аккаунта мы отправим письмо с инструкциями
					на Вашу почту, по которой Вы регистрировались.
				</p>
				{error && (
					<div className='p-5 bg-gay-red-100 text-red-700 rounded'>{error}</div>
				)}
				<form
					onSubmit={handleSubmit}
					className='mx-auto flex flex-col justify-center'
					autoComplete='off'
				>
					<button
						type='submit'
						disabled={loading}
						className='flex-1 flex flex-row items-center justify-center gap-x-3 bg-red-100 hover:bg-red-700 text-red-700 hover:text-gray-700 px-4 py-2 h-12 rounded font-medium duration-300 text-center cursor-pointer disabled:bg-gray-200'
					>
						{loading ? (
							<>
								<TbLoader2 className='animate-spin w-4 h-4' />
								Отправка...
							</>
						) : (
							<>
								<LuMail className='w-4 h-4 flex-shrink-0' />
								Отправить подтверждение
							</>
						)}
					</button>
				</form>
			</div>
		</AuthFormLayout>
	)
}

export default VerifyDeleteEmailPage
