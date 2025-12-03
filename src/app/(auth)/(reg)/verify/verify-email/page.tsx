'use client'

import { AuthFormLayout } from '@/app/(auth)/_components/AuthFormLayout'
import { useRegisterFormContext } from '@/app/contexts/RegisterFormContext'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { LoadingContent } from '../../_components/LoadingContent'
import { ErrorContent } from '../../_components/ErrorContent'
import { LuMailWarning } from 'react-icons/lu'
import { SuccessSent } from '../../_components/SuccessSent'

const VerifyEmailPage = () => {
	const { regFormData } = useRegisterFormContext()
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [verificationSent, setVerificationSent] = useState(false)
	const hasSentInitialRequest = useRef(false)
	const router = useRouter()

	const verifyAccount = useCallback(async () => {
		try {
			setIsLoading(true)
			setError(null)

			await authClient.signUp.email(
				{
					...regFormData,
					email: regFormData.email,
					callbackURL: '/verify/verify-success',
				},
				{
					onSuccess: () => {
						setVerificationSent(true)
						setIsLoading(false)
					},
					onError: ctx => {
						setIsLoading(false)
						setVerificationSent(false)

						const errorMessage = ctx.error?.message || 'Неизвестная ошибка'

						if (errorMessage.includes('already exists')) {
							setError('Пользователь с таким email уже существует')
						} else {
							setError(errorMessage)
						}
					},
				}
			)
		} catch (err) {
			setIsLoading(false)
			setVerificationSent(false)
			setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
		}
	}, [regFormData])

	useEffect(() => {
		if (!hasSentInitialRequest.current && regFormData.email) {
			hasSentInitialRequest.current = true
			verifyAccount()
		}
	}, [verifyAccount, regFormData.email])

	const handleToLogin = () => router.replace('/login')
	const handleResend = () => {
		verifyAccount()
	}

	return (
		<AuthFormLayout>
			{isLoading ? (
				<LoadingContent title='Отправка письма...' />
			) : error ? (
				<ErrorContent
					error={error}
					icon={<LuMailWarning className='h-8 w-8 text-red-600' />}
					primaryAction={{ label: 'Войти', onClick: handleToLogin }}
					secondaryAction={{
						label: 'Попробовать снова',
						onClick: handleResend,
					}}
				/>
			) : verificationSent ? (
				<SuccessSent />
			) : null}
		</AuthFormLayout>
	)
}
export default VerifyEmailPage
