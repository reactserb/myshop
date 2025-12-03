'use client'

import { AuthFormLayout } from '@/app/(auth)/_components/AuthFormLayout'
import { buttonStyles, formStyles } from '@/app/(auth)/styles'
import { authClient } from '@/lib/auth-client'
import { useState } from 'react'
import { LuKeyRound, LuLoaderCircle, LuMail } from 'react-icons/lu'
import SuccessSentEmail from '../../_components/SuccessSentEmail'
import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'

const ForgotPassword = () => {
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		try {
			const checkResponse = await fetch('/api/auth/check-login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ login: email, loginType: 'email' }),
			})

			const { exists, verified } = await checkResponse.json()

			if (!exists) {
				throw new Error('Аккаунт с таким email не зарегистрирован')
			}

			if (!verified) {
				throw new Error(
					'Email не верифицирован. Вернитесь к авторизации и используйте телефон для сброса пароля.'
				)
			}

			const { error } = await authClient.requestPasswordReset({
				email,
				redirectTo: `${window.location.origin}/email-pass-reset`,
			})

			if (error) {
				throw new Error(error.message)
			}

			setSuccess(true)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Произошла ошибка')
		} finally {
			setLoading(false)
		}
	}

	if (success) {
		return <SuccessSentEmail email={email} />
	}

	return (
		<AuthFormLayout>
			<div className='flex flex-col gap-y-8'>
				<div className='flex flex-col items-center'>
					<LuKeyRound className='w-12 h-12 text-gray-500 mb-4' />
					<h1 className='text-2xl font-bold text-center'>
						Восстановление пароля
					</h1>
				</div>
				<p>
					Введите email, по которому проходила регистрация, и мы вышлем Вам
					инструкции по сбросу пароля.
				</p>
				{error && (
					<div className='p-5 bg-red-100 text-red-600 rounded'>{error}</div>
				)}
				<form
					onSubmit={handleSubmit}
					className='mx-auto flex flex-col justify-center'
					autoComplete='off'
				>
					<div>
						<label htmlFor='email' className={`${formStyles.label} text-left`}>
							E-mail
						</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							className={formStyles.input}
							required
						/>
					</div>
					<button
						type='submit'
						disabled={loading}
						className={`${buttonStyles.active} rounded [&&]:w-full [&&]:h-10 [&&]:mt-4 cursor-pointer flex items-center justify-center gap-2`}
						style={
							loading ? { backgroundColor: '#dedede', color: 'black' } : {}
						}
					>
						{loading ? (
							<>
								<LuLoaderCircle className='animate-spin w-4 h-4' />
								Отправка...
							</>
						) : (
							<>
								<LuMail className='w-4 h-4' />
								Отправить инструкции
							</>
						)}
					</button>
					<Link
						href='/login'
						className={`${buttonStyles.inactive} rounded [&&]:w-full [&&]:h-10 [&&]:mt-12 cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-600 hover:text-white`}
					>
						<CgProfile />
						Вернуться к авторизации
					</Link>
				</form>
			</div>
		</AuthFormLayout>
	)
}

export default ForgotPassword
