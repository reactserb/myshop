'use client'

import { useRegisterFormContext } from '@/app/contexts/RegisterFormContext'
import { useRouter } from 'next/navigation'
import { buttonStyles } from '../../styles'
import { LuMailCheck } from 'react-icons/lu'

export const SuccessSent = () => {
	const { regFormData } = useRegisterFormContext()
	const router = useRouter()

	return (
		<div className='space-y-6 flex flex-col items-center'>
			<div className='flex flex-col items-center text-center space-y-4'>
				<div className='p-3 bg-black rounded-full'>
					<LuMailCheck className='h-8 w-8 text-white' />
				</div>
				<div className='space-y-2'>
					<h2 className='text-2xl font-bold text-gray-900'>
						Письмо отправлено!
					</h2>
					<p className='text-gray-600'>
						Мы отправили email с подтверждением на{' '}
						<span className='font-semibold text-gray-500 break-all'>
							{regFormData.email}
						</span>
						. Пожалуйста, проверьте и следуйте инструкциям.
					</p>
				</div>
			</div>

			<div className='space-y-3 w-full'>
				<button
					onClick={() => router.replace('/login')}
					className={`${buttonStyles.active} px-4 py-2 rounded cursor-pointer w-full`}
				>
					Перейти к авторизации
				</button>
			</div>
		</div>
	)
}
