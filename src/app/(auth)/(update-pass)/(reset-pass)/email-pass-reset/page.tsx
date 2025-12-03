'use client'

import { ErrorContent } from '@/app/(auth)/(reg)/_components/ErrorContent'
import { AuthFormLayout } from '@/app/(auth)/_components/AuthFormLayout'
import PasswordInput from '@/app/(auth)/_components/PasswordInput'
import Tooltip from '@/app/(auth)/_components/Tooltip'
import { authClient } from '@/lib/auth-client'
import { isPasswordValid } from '@/lib/utils/validation/passwordValid'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LuMailWarning } from 'react-icons/lu'
import SuccessUpdatePass from '../../_components/SuccessUpdatePass'

const ResetPassword = () => {
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [confirmPassword, setConfirmPassword] = useState('')
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [token, setToken] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const queryToken = new URLSearchParams(window.location.search).get('token')
		if (!queryToken) {
			setError('Недействительная ссылка для сброса пароля')
			return
		}
		setToken(queryToken)
	}, [])

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
		setError(null)
	}

	const handleConfirmPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setConfirmPassword(e.target.value)
		setError(null)
	}

	const handleToStart = () => {
		router.replace('/forgot-password')
	}

	if (error && !token) {
		return (
			<AuthFormLayout>
				<ErrorContent
					title='Что-то пошло не так!'
					error={error}
					icon={<LuMailWarning className='h-8 w-8 text-red-600' />}
					secondaryAction={{
						label: (
							<>
								Запросить новую ссылку
								<br />
								для сброса пароля
							</>
						),
						onClick: handleToStart,
					}}
				/>
			</AuthFormLayout>
		)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!isPasswordValid(password)) {
			setError(
				'Пароль должен содержать 8+ символов: заглавные и строчные буквы, цифры'
			)
			return
		}

		if (password !== confirmPassword) {
			setError('Пароли не совпадают')
			return
		}

		setLoading(true)
		setError(null)

		try {
			if (!token) {
				throw new Error('Токен сброса пароля отсутствует')
			}

			const { error } = await authClient.resetPassword({
				newPassword: password,
				token,
			})

			if (error) {
				throw new Error(error.message)
			}

			setSuccess(true)

			setTimeout(() => {
				router.replace('/login')
			}, 3000)
		} catch (error) {
			setError(error instanceof Error ? error.message : 'Произошла ошибка')
		} finally {
			setLoading(false)
		}
	}

	if (success) {
		return <SuccessUpdatePass />
	}

	return (
		<AuthFormLayout>
			<h1 className='text-2xl font-bold text-center mb-8'>
				Установите новый пароль
			</h1>
			{error && (
				<div className='relative'>
					<Tooltip text={error} position='top' />
				</div>
			)}
			<form
				onSubmit={handleSubmit}
				className='w-full mx-auto flex flex-col gap-y-8 justify-center'
				autoComplete='off'
			>
				<div className='w-full flex flex-row flex-wrap justify-center gap-x-8 gap-y-4'>
					<div className='flex flex-col gap-y-4 items-start'>
						<PasswordInput
							id='password'
							label='Новый пароль'
							value={password}
							onChangeAction={handlePasswordChange}
							showPassword={showPassword}
							togglePasswordVisibilityAction={() =>
								setShowPassword(!showPassword)
							}
							showRequirements={true}
							inputClass={
								password.length > 0 && !isPasswordValid(password)
									? 'border-red-500'
									: ''
							}
						/>
						<PasswordInput
							id='confirmPassword'
							label='Подтвердите пароль'
							value={confirmPassword}
							onChangeAction={handleConfirmPasswordChange}
							showPassword={showConfirmPassword}
							togglePasswordVisibilityAction={() =>
								setShowConfirmPassword(!showConfirmPassword)
							}
							compareWith={password}
							inputClass={
								confirmPassword.length > 0 && password !== confirmPassword
									? 'border-red-500'
									: ''
							}
						/>
					</div>
				</div>

				<button
					type='submit'
					disabled={loading}
					className={`text-white bg-gray-500 w-full max-w-65 mx-auto p-2 gap-4 cursor-pointer duration-300 rounded ${loading ? 'bg-gray-300 text-black' : 'bg-gray-600'}`}
				>
					{loading ? 'Сохранение...' : 'Сохранить новый пароль'}
				</button>
			</form>
		</AuthFormLayout>
	)
}

export default ResetPassword
