'use client'

import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import SuccessUpdatePass from './SuccessUpdatePass'
import { AuthFormLayout } from '../../_components/AuthFormLayout'
import { LuLoaderCircle, LuMessageCircle } from 'react-icons/lu'
import PasswordInput from '../../_components/PasswordInput'
import { isPasswordValid } from '@/lib/utils/validation/passwordValid'
import { buttonStyles } from '../../styles'
import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'

interface PhonePasswordResetVerifyProps {
	phone: string
	loading: boolean
	setLoadingAction: (loading: boolean) => void
	error: string | null
	setErrorAction: (error: string | null) => void
	onBackAction: () => void
}

export const PhonePasswordResetVerify = ({
	phone,
	loading,
	setLoadingAction,
	error,
	setErrorAction,
	onBackAction,
}: PhonePasswordResetVerifyProps) => {
	const router = useRouter()
	const [otp, setOtp] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [showNewPassword, setShowNewPassword] = useState(false)
	const [closeForm, setCloseForm] = useState(false)
	const [success, setSuccess] = useState(false)

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value)
		setErrorAction(null)
	}

	const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOtp(e.target.value)
		setErrorAction(null)
	}

	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoadingAction(true)
		setErrorAction(null)

		try {
			// 1. Сначала проверяем OTP через BetterAuth
			const { error: resetError } = await authClient.phoneNumber.resetPassword({
				phoneNumber: phone.replace(/\D/g, ''),
				otp,
				newPassword,
			})

			if (resetError) {
				if (resetError.message?.includes('Invalid OTP')) {
					setOtp('')
					throw new Error('Неверный код подтверждения')
				} else if (resetError.message?.includes('Too many attempts')) {
					setCloseForm(true)
					throw new Error(
						'Превышено количество попыток. Перейдите на страницу входа, чтобы начать заново, или измените номер телефона'
					)
				} else if (
					resetError.message?.includes('OTP expired') ||
					resetError.message?.includes('OTP not found')
				) {
					setCloseForm(true)
					throw new Error(
						'Просроченный или недействительный код подтверждения. Перейдите на страницу входа, чтобы начать заново, или измените номер телефона'
					)
				}
				throw new Error(resetError.message || 'Неверный OTP код')
			}

			// 2. Если OTP верный, обновляем пароль в нашей БД
			const response = await fetch('/api/auth/reset-phone-pass', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					phoneNumber: phone.replace(/\D/g, ''),
					newPassword,
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Не удалось обновить пароль в системе')
			}

			setSuccess(true)

			setTimeout(() => {
				router.replace('/login')
			}, 3000)
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : 'Произошла ошибка'
			setErrorAction(errorMessage)
		} finally {
			setLoadingAction(false)
		}
	}

	const handleToLogin = () => {
		router.push('/login')
	}

	if (success) {
		return <SuccessUpdatePass />
	}

	return (
		<AuthFormLayout>
			<div className='flex flex-col gap-y-6'>
				<div className='flex flex-col items-center'>
					<LuMessageCircle className='w-12 h-12 text-gray-500 mb-4' />
					<h1 className='text-2xl font-bold text-center'>Введите код из SMS</h1>
				</div>

				<p className='text-center'>
					Мы отправили 4-значный код на номер: <br />
					<span className='text-gray-600 font-medium'>{phone}</span>
				</p>

				{error && (
					<div className='p-3 bg-red-100 text-red-700 rounded text-sm text-center'>
						{error}
					</div>
				)}
				{error &&
					(error.includes('Превышено количество попыток') ||
						error.includes('Просроченный или недействительный код')) && (
						<button
							onClick={handleToLogin}
							className='text-gray-500 hover:underline text-sm mx-auto cursor-pointer'
						>
							Перейти на страницу входа
						</button>
					)}
				<button
					type='button'
					onClick={onBackAction}
					className='text-gray-500 hover:underline text-sm mx-auto cursor-pointer'
				>
					Изменить номер телефона
				</button>
				{!closeForm && (
					<form
						onSubmit={handleResetPassword}
						className='flex flex-col gap-y-4 justify-center'
					>
						<div>
							<p className='text-center text-gray-400'>Код из SMS</p>
							<input
								type='password'
								id='otp'
								pattern='[0-9]{4}'
								maxLength={4}
								inputMode='numeric'
								autoComplete='one-time-code'
								value={otp}
								onChange={handleOtpChange}
								className='flex justify-center w-27.5 h-15 mx-auto text-center px-4 py-3 border border-gray-300 rounded focus:border-gray-500 focus:bg-white focus:outline-none'
								required
							/>
						</div>

						<div className='w-full flex flex-row flex-wrap justify-center gap-x-8 gap-y-4 relative'>
							<div className='flex flex-col items-start relative'>
								<PasswordInput
									id='password'
									label='Новый пароль'
									value={newPassword}
									onChangeAction={handlePasswordChange}
									showPassword={showNewPassword}
									togglePasswordVisibilityAction={() =>
										setShowNewPassword(!showNewPassword)
									}
									showRequirements={true}
									inputClass={`h-15 ${
										newPassword.length > 0 && !isPasswordValid(newPassword)
											? 'border-red-500'
											: ''
									}`}
								/>
							</div>
						</div>

						<button
							type='submit'
							disabled={loading}
							className={`${buttonStyles.active} rounded w-full p-2 [&&]:min-h-10 cursor-pointer flex items-center justify-center gap-2 mx-auto`}
						>
							{loading ? (
								<>
									<LuLoaderCircle className='animate-spin w-4 h-4' />
									Сохранение...
								</>
							) : (
								'Установить новый пароль'
							)}
						</button>
						<Link
							href='/login'
							className={`${buttonStyles.inactive} rounded [&&]:w-full p-2 [&&]:min-h-10 [&&]:mt-8 cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-600 hover:text-white`}
						>
							<CgProfile />
							Вернуться к авторизации
						</Link>
					</form>
				)}
			</div>
		</AuthFormLayout>
	)
}
