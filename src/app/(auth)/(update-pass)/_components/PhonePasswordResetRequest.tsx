'use client'

import { authClient } from '@/lib/auth-client'
import { useState } from 'react'
import { AuthFormLayout } from '../../_components/AuthFormLayout'
import { buttonStyles, formStyles } from '../../styles'
import { InputMask } from '@react-input/mask'
import { LuKeyRound, LuLoaderCircle, LuPhone } from 'react-icons/lu'
import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'

interface PhonePasswordResetRequestProps {
	onSuccessAction: (phone: string) => void
	loading: boolean
	setLoadingAction: (loading: boolean) => void
	error: string | null
	setErrorAction: (error: string | null) => void
}

export const PhonePasswordResetRequest = ({
	onSuccessAction,
	loading,
	setLoadingAction,
	error,
	setErrorAction,
}: PhonePasswordResetRequestProps) => {
	const [phone, setPhone] = useState('')

	const handleRequestReset = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoadingAction(true)
		setErrorAction(null)

		const cleanPhone = phone.replace(/\D/g, '')

		try {
			const checkResponse = await fetch('/api/auth/check-login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ login: cleanPhone, loginType: 'phone' }),
			})

			const { exists, verified } = await checkResponse.json()

			if (!exists) {
				throw new Error('Номер телефона не зарегистрирован в системе')
			}

			if (!verified) {
				throw new Error(
					'Телефон не верифицирован. Вернитесь к авторизации и используйте email для сброса пароля.'
				)
			}

			const { error: resetError } =
				await authClient.phoneNumber.requestPasswordReset({
					phoneNumber: cleanPhone,
				})

			if (resetError) {
				if (resetError.message?.toLowerCase().includes("isn't registered")) {
					throw new Error('Номер телефона не зарегистрирован в системе')
				}
				throw new Error(resetError.message || 'Не удалось отправить код')
			}

			onSuccessAction(phone)
		} catch (err) {
			setErrorAction(err instanceof Error ? err.message : 'Произошла ошибка')
		} finally {
			setLoadingAction(false)
		}
	}

	return (
		<AuthFormLayout>
			<div className='flex flex-col gap-y-6'>
				<div className='flex flex-col items-center'>
					<LuKeyRound className='w-12 h-12 text-gray-500 mb-4' />
					<h1 className='text-2xl font-bold text-center'>
						Сброс пароля для телефона
					</h1>
				</div>

				<p className='text-center'>
					Введите номер телефона, на который придет код для сброса пароля
				</p>

				{error && (
					<div className='p-3 bg-red-100 text-red-700 rounded text-sm'>
						{error}
					</div>
				)}

				<form
					onSubmit={handleRequestReset}
					className='flex flex-col gap-y-4 mx-auto'
				>
					<div>
						<label htmlFor='phone' className={formStyles.label}>
							Номер телефона
						</label>

						<InputMask
							mask='+7 (___) ___-__-__'
							replacement={{ _: /\d/ }}
							value={phone}
							onChange={e => setPhone(e.target.value)}
							placeholder='+7 (___) ___-__-__'
							className={formStyles.input}
							required
						/>
					</div>

					<button
						type='submit'
						disabled={loading}
						className={`${buttonStyles.active} rounded [&&]:w-full [&&]:h-10 cursor-pointer flex items-center justify-center gap-2`}
					>
						{loading ? (
							<>
								<LuLoaderCircle className='animate-spin w-4 h-4' />
								Отправка...
							</>
						) : (
							<>
								<LuPhone className='w-4 h-4' />
								Отправить код
							</>
						)}
					</button>
					<Link
						href='/login'
						className={`${buttonStyles.inactive} rounded [&&]:w-full [&&]:h-10 [&&]:mt-8 cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-600 hover:text-white`}
					>
						<CgProfile />
						Вернуться к авторизации
					</Link>
				</form>
			</div>
		</AuthFormLayout>
	)
}
