'use client'

import { useRouter } from 'next/navigation'
import { AuthFormLayout } from '../../_components/AuthFormLayout'
import { LuMailCheck } from 'react-icons/lu'

const SuccessSentEmail = ({ email }: { email: string }) => {
	const router = useRouter()

	return (
		<AuthFormLayout>
			<div className='flex flex-col gap-y-6'>
				<div className='flex flex-col items-center'>
					<LuMailCheck className='w-12 h-12 text-gray-600 mb-4' />
					<h1 className='text-2xl font-bold text-center'>
						Проверьте Вашу почту
					</h1>
				</div>

				<p>
					Если Вы <strong>регистрировались по email</strong> и аккаунт с email{' '}
					<span className='font-semibold break-all'>{email}</span> существует в
					нашей системе, мы отправили письмо с инструкциями по сбросу пароля.
				</p>

				<div className='text-primary bg-white p-4 rounded border border-gray-500'>
					<h3 className='font-semibold mb-2'>Не получили письмо?</h3>
					<ul className='text-sm list-disc list-inside space-y-1'>
						<li>Проверьте папку «Спам» или «Нежелательная почта»</li>
						<li>
							Убедитесь, что Вы регистрировались именно по email, а не по номеру
							телефона
						</li>
						<li>
							Попробуйте войти с помощью номера телефона, если Вы его указывали
						</li>
						<li>Письмо может приходить с задержкой до 5-10 минут</li>
					</ul>
				</div>

				<div className='mt-4 p-4 bg-white rounded border border-gray-500'>
					<h3 className='font-semibold text-gray-600 mb-2'>
						Регистрировались по телефону?
					</h3>
					<p className='text-gray-500 text-sm'>
						Если Вы не помните, как регистрировались,
						<button
							type='button'
							onClick={() => router.replace('/login')}
							className='text-gray-500 text-left font-semibold underline hover:no-underline cursor-pointer duration-300'
						>
							попробуйте войти с помощью номера телефона
						</button>
					</p>
				</div>
			</div>
		</AuthFormLayout>
	)
}

export default SuccessSentEmail
