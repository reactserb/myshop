'use client'

import { useEffect, useRef, useState } from 'react'
import { AuthFormLayout } from '../../_components/AuthFormLayout'
import { useRouter } from 'next/navigation'
import { ErrorContent } from '../../(reg)/_components/ErrorContent'
import { LuMailWarning, LuPhoneOff, LuSearch } from 'react-icons/lu'
import { buttonStyles, formStyles } from '../../styles'
import { InputMask } from '@react-input/mask'
import Link from 'next/link'
import { LoadingContent } from '../../(reg)/_components/LoadingContent'
import { AuthMethodSelector } from './_components/AuthMethodSelector'

const EnterLoginPage = () => {
	const [login, setLogin] = useState('')
	const [loginType, setLoginType] = useState<'email' | 'phone'>('email')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [showAuthMethodChoice, setShowAuthMethodChoice] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const router = useRouter()

	useEffect(() => {
		if (inputRef.current) {
			setTimeout(() => {
				inputRef.current?.focus()
			}, 0)
		}
	}, [loginType])

	const switchToEmail = () => {
		setLogin('')
		setLoginType('email')
	}

	const switchToPhone = () => {
		setLogin('')
		setLoginType('phone')
	}

	const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setLogin(value)
		setError(null)
	}

	const handleForgotPassword = () => {
		if (loginType === 'phone') {
			router.replace(`/phone-pass-reset`)
		} else {
			router.replace('/forgot-password')
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch('/api/auth/check-login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ login, loginType }),
			})

			const { exists, verified } = await response.json()

			if (!exists) {
				setError(
					loginType === 'email'
						? 'Аккаунт с таким email не существует'
						: 'Аккаунт с таким телефоном не существует'
				)
				return
			}

			if (!verified && loginType === 'email') {
				setError('Email не верифицирован. Войдите по телефону')
				return
			}

			if (!verified && loginType === 'phone') {
				setError('Телефон не верифицирован. Войдите по email')
				return
			}

			if (loginType === 'phone') {
				setShowAuthMethodChoice(true)
			} else {
				router.push(
					`/password-enter?login=${encodeURIComponent(login)}&loginType=${loginType}`
				)
			}
		} catch {
			setError('Ошибка при проверке данных')
		} finally {
			setIsLoading(false)
		}
	}

	const handleToOtherMethod = () => {
		setError(null)
		setLogin('')

		if (loginType === 'phone') {
			setLoginType('email')
		} else {
			setLoginType('phone')
		}
	}

	const handleBackFromMethodChoice = () => {
		setShowAuthMethodChoice(false)
		setLogin('')
		setLoginType('phone')
	}

	const handleAuthMethodSelect = (method: 'password' | 'otp') => {
		const cleanLogin = login.replace(/\D/g, '')

		router.replace(
			method === 'password'
				? `/password-enter?login=${encodeURIComponent(cleanLogin)}&loginType=phone`
				: `/otp-enter?login=${encodeURIComponent(cleanLogin)}&loginType=phone`
		)
	}

	if (isLoading) {
		return (
			<AuthFormLayout>
				<LoadingContent
					title={
						<span style={{ whiteSpace: 'pre-line' }}>
							{`Проверка ${loginType === 'email' ? 'эл.почты' : 'телефона'}\n${login}`}
						</span>
					}
				/>
			</AuthFormLayout>
		)
	}

	if (error)
		return (
			<AuthFormLayout>
				<div className='flex flex-col gap-y-3'>
					<ErrorContent
						title='Упс!'
						error={error}
						icon={
							loginType === 'email' ? (
								<LuMailWarning className='h-8 w-8 text-red-600' />
							) : (
								<LuPhoneOff className='h-8 w-8 text-red-600' />
							)
						}
						secondaryAction={{
							label: 'Выбрать другой способ входа',
							onClick: handleToOtherMethod,
						}}
					/>
					<button
						onClick={() => router.replace('/register')}
						className='w-full rounded border border-gray-300 hover:bg-gray-300 duration-300 cursor-pointer'
					>
						<span className='flex items-center justify-center gap-2 font-medium py-3.5 px-6'>
							<LuSearch className='h-5 w-5' />
							<span className='translate-y-px'>Регистрация</span>
						</span>
					</button>
				</div>
			</AuthFormLayout>
		)

	if (showAuthMethodChoice) {
		return (
			<AuthMethodSelector
				phoneNumber={login}
				onBackAction={handleBackFromMethodChoice}
				onMethodSelectAction={handleAuthMethodSelect}
			/>
		)
	}

	return (
		<AuthFormLayout>
			<h1 className='text-2xl font-bold text-black text-center mb-8'>Войти</h1>
			<form
				onSubmit={handleSubmit}
				className='w-65 mx-auto max-h-screen flex flex-col justify-center overflow-y-auto gap-y-8'
				autoComplete='off'
			>
				<div className='w-full flex flex-row flex-wrap justify-center gap-x-8 gap-y-4 relative'>
					<div className='flex flex-col gap-y-4 items-start w-full'>
						<div>
							<label htmlFor='login' className={formStyles.label}>
								{loginType === 'email' ? 'E-mail' : 'Телефон'}
							</label>

							{loginType === 'phone' ? (
								<InputMask
									ref={inputRef as React.RefObject<HTMLInputElement>}
									mask='+7 (___) ___-__-__'
									replacement={{ _: /\d/ }}
									value={login}
									placeholder='+7 (___) ___-__-__'
									onChange={handleLoginChange}
									className={formStyles.input}
									required
								/>
							) : (
								<input
									ref={inputRef}
									type='email'
									value={login}
									placeholder='example@mail.com'
									onChange={handleLoginChange}
									className={formStyles.input}
									required
								/>
							)}
						</div>
						<div className='flex gap-2 text-sm mx-auto'>
							<button
								type='button'
								onClick={switchToEmail}
								className={`px-2 py-1 rounded cursor-pointer ${loginType === 'email' ? 'bg-gray-500 text-white' : 'bg-gray-100'}`}
							>
								По email
							</button>
							<button
								type='button'
								onClick={switchToPhone}
								className={`px-2 py-1 rounded cursor-pointer ${loginType === 'phone' ? 'bg-gray-500 text-white' : 'bg-gray-100'}`}
							>
								По телефону
							</button>
						</div>
					</div>
				</div>
				<button
					type='submit'
					disabled={
						(loginType === 'email' &&
							(!login.includes('@') || !login.includes('.'))) ||
						(loginType === 'phone' && login.replace(/\D/g, '').length < 11) ||
						isLoading
					}
					className={`
            ${buttonStyles.base} [&&]:my-0
           ${
							(loginType === 'email' &&
								(!login.includes('@') || !login.includes('.'))) ||
							(loginType === 'phone' && login.replace(/\D/g, '').length < 11) ||
							isLoading
								? 'cursor-not-allowed bg-gray-200 text-gray-500'
								: 'bg-gray-500 text-white'
						}
           duration-300
          `}
				>
					Вход
				</button>
				<div className='flex flex-row flex-wrap mx-auto text-xs gap-4 justify-center'>
					<Link
						href='/register'
						className={`${formStyles.loginLink} w-auto px-2`}
					>
						Регистрация
					</Link>
					<button
						type='button'
						onClick={handleForgotPassword}
						className='h-8 text-gray-600 hover:text-black w-30 flex items-center justify-center duration-300 cursor-pointer'
					>
						Забыли пароль?
					</button>
				</div>
			</form>
		</AuthFormLayout>
	)
}

export default EnterLoginPage
