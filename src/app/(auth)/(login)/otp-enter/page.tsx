'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { AuthFormLayout } from '../../_components/AuthFormLayout'
import { LoadingContent } from '../../(reg)/_components/LoadingContent'
import { useSearchParams } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { ErrorContent } from '../../(reg)/_components/ErrorContent'
import { LuPhoneOff } from 'react-icons/lu'
import LoginWithOTP from '../login/_components/LoginWithOTP'

const EnterCodePage = () => {
	return (
		<Suspense
			fallback={
				<AuthFormLayout>
					<LoadingContent title={'Сейчас запросим код'} />
				</AuthFormLayout>
			}
		>
			<OTPLoginPage />
		</Suspense>
	)
}

const OTPLoginPage = () => {
	const searchParams = useSearchParams()
	const phoneNumber = searchParams.get('login') || ''
	const [status, setStatus] = useState<'sending' | 'sent' | 'error'>('sending')
	const [error, setError] = useState('')
	const isSentRef = useRef(false)

	useEffect(() => {
		const sendOTP = async () => {
			if (isSentRef.current || !phoneNumber) return

			isSentRef.current = true

			try {
				await authClient.phoneNumber.sendOtp(
					{ phoneNumber },
					{
						onSuccess: () => {
							setStatus('sent')
						},
						onError: ctx => {
							setStatus('error')
							setError(ctx.error?.message || 'Ошибка при отправке SMS')
						},
					}
				)
			} catch (error) {
				setStatus('error')
				setError(error instanceof Error ? error.message : 'Неизвестная ошибка')
				isSentRef.current = false
			}
		}

		sendOTP()
	}, [phoneNumber])

	const handleRetry = () => {
		setStatus('sending')
		setError('')
		isSentRef.current = false
	}

	if (status === 'sending') {
		return (
			<AuthFormLayout>
				<LoadingContent title={`Отправка SMS на номер +${phoneNumber}`} />
			</AuthFormLayout>
		)
	}

	if (status === 'error') {
		return (
			<AuthFormLayout>
				<ErrorContent
					error={error}
					icon={<LuPhoneOff className='h-8 w-8 text-red-600' />}
					primaryAction={{
						label: 'Попробовать снова',
						onClick: handleRetry,
					}}
				/>
			</AuthFormLayout>
		)
	}

	return <LoginWithOTP phoneNumber={phoneNumber} />
}

export default EnterCodePage
