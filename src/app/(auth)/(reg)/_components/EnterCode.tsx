'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { buttonStyles } from '../../styles'
import { useRouter } from 'next/navigation'
import { useRegisterFormContext } from '@/app/contexts/RegisterFormContext'
import { authClient } from '@/lib/auth-client'
import { FaArrowLeftLong } from 'react-icons/fa6'
import useTimer from '@/hooks/useTimer'
import { AuthFormLayout } from '../../_components/AuthFormLayout'
import { LoadingContent } from './LoadingContent'
import OTPResendCode from '../../_components/OTPResendCode'

const MAX_ATTEMPTS = 3
const TIMEOUT_PERIOD = 180

export const EnterCode = ({ phoneNumber }: { phoneNumber: string }) => {
	const [code, setCode] = useState('')
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS)
	const { regFormData } = useRegisterFormContext()
	const { timeLeft, canResend, startTimer } = useTimer(TIMEOUT_PERIOD)
	const inputRef = useRef<HTMLInputElement>(null)
	const router = useRouter()

	useEffect(() => {
		startTimer()
		if (inputRef.current) {
			setTimeout(() => {
				inputRef.current?.focus()
			}, 0)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (code.length !== 4) return

		setIsLoading(true)

		try {
			const { data: verifyData, error: verifyError } =
				await authClient.phoneNumber.verify({
					phoneNumber,
					code,
					disableSession: true,
				})

			if (verifyError) throw verifyError

			setAttemptsLeft(MAX_ATTEMPTS)

			const {
				password: _,
				confirmPassword: __,
				phoneNumber: ___,
				email, // Нам нужен реальный email
				...fieldsToUpdate
			} = regFormData

			// 3. Установка пароля и ОБНОВЛЕНИЕ ВСЕХ ДАННЫХ через единый API-маршрут (set-password)
			const passwordUpdateResponse = await fetch('/api/auth/set-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					userId: verifyData.user.id,
					password: regFormData.password,
					email: email,
					fieldsToUpdate: fieldsToUpdate,
				}),
			})

			if (!passwordUpdateResponse.ok) {
				const errorData = await passwordUpdateResponse.json()
				console.error('Детали ошибки API set-password:', errorData)
				throw new Error(
					errorData.error || 'Ошибка установки пароля/обновления данных'
				)
			}

			router.replace('/verify/verify-success')
		} catch (error) {
			console.error('Ошибка верификации телефона:', error)
			setCode('')
			setAttemptsLeft(prev => prev - 1)

			if (attemptsLeft <= 1) {
				setError('Попытки исчерпаны. Пожалуйста, зарегистрируйтесь снова')
				setTimeout(() => router.replace('/register'), 2000)
			} else {
				setError(`Неверный код. Осталось попыток:\u00A0${attemptsLeft - 1}`)
			}
		} finally {
			setIsLoading(false)
		}
	}

	const handleResend = async () => {
		if (!canResend) return
		try {
			await authClient.phoneNumber.sendOtp(
				{ phoneNumber },
				{
					onSuccess: () => {
						startTimer()
						setError('')
						setAttemptsLeft(MAX_ATTEMPTS)
					},
					onError: ctx => {
						setError(ctx.error?.message || 'Ошибка при отправке SMS')
					},
				}
			)
		} catch (error) {
			console.error('Ошибка отправки кода:', error)
			setError('Ошибка при отправке кода')
		}
	}

	if (isLoading) {
		return (
			<AuthFormLayout>
				<LoadingContent title={'Проверяем код...'} />
			</AuthFormLayout>
		)
	}

	return (
		<>
			<div className='flex flex-col gap-y-8'>
				<h1 className='text-2xl font-bold text-black text-center'>
					Регистрация
				</h1>
				<div>
					<p className='text-center text-gray-500'>Код из SMS</p>
					<form
						onSubmit={handleSubmit}
						className='w-65 mx-auto max-h-screen flex flex-col justify-center items-center'
						autoComplete='off'
					>
						<input
							ref={inputRef}
							type='password'
							inputMode='numeric'
							pattern='[0-9]{4}'
							maxLength={4}
							value={code}
							onChange={e => {
								setCode(e.target.value)
								setError('')
							}}
							className='flex justify-center w-27.5 h-15 text-center text-2xl px-4 py-3 border border-gray-200 rounded focus:border-gray-500 focus:bg-white focus:outline-none'
							autoComplete='one-time-code'
							required
						/>
						{error && (
							<div className='text-red-500 text-center mt-2 text-sm'>
								{error}
							</div>
						)}
						<button
							type='submit'
							className={`${buttonStyles.base} ${code.length !== 4 ? buttonStyles.inactive : buttonStyles.active} [&&]:mt-8 mb-0`}
							disabled={code.length !== 4 || attemptsLeft <= 0}
						>
							Подтвердить
						</button>
					</form>
				</div>

				<OTPResendCode
					canResend={canResend}
					timeLeft={timeLeft}
					onResendAction={handleResend}
				/>

				<Link
					href='/register'
					className='h-8 text-xs text-black hover:text-black w-30 flex items-center justify-center gap-x-2 mx-auto duration-300 cursor-pointer'
				>
					<FaArrowLeftLong className='text-2xl' />
					Вернуться
				</Link>
			</div>
		</>
	)
}
