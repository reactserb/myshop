'use client'

import { formStyles, profileStyles } from '@/app/(auth)/styles'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { LuKey, LuX } from 'react-icons/lu'

const ProfilePassword = () => {
	const { user, logout } = useAuthStore()
	const router = useRouter()
	const [isModalOpen, setIsModalOpen] = useState(false)

	const isPhoneRegistered = user?.phoneNumberVerified === true

	const handlePasswordChangeClick = () => {
		setIsModalOpen(true)
	}

	const handleConfirm = async () => {
		setIsModalOpen(false)

		await logout()

		if (isPhoneRegistered) {
			router.replace('/phone-pass-reset')
		} else {
			router.replace('/forgot-password')
		}
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const getModalText = () => {
		return isPhoneRegistered
			? 'Для смены пароля будет использована SMS-верификация. Вы будете выведены из аккаунта. Продолжить?'
			: 'Для смены пароля будет отправлено письмо с инструкциями на Ваш email. Вы будете выведены из аккаунта. Продолжить?'
	}

	return (
		<div className='mb-8'>
			<div className='flex flex-wrap justify-between items-center mb-4 gap-4'>
				<h3 className={profileStyles.sectionTitle}>Пароль</h3>

				<button
					onClick={handlePasswordChangeClick}
					className={profileStyles.editButton}
				>
					Сменить пароль
					<FaArrowRightLong className='h-4 w-4 ml-1' />
				</button>
			</div>

			<div className='flex gap-x-2 items-center justify-between'>
				<input
					type='text'
					value='********'
					className={`${formStyles.input} text-gray-700 [&&]:w-full disabled:cursor-not-allowed [&&]:disabled:bg-gray-300`}
					disabled
					readOnly
				/>
				<LuKey className='h-10 w-10 text-gray-300' />
			</div>

			{/* Модальное окно */}
			{isModalOpen && (
				<div className='absolute inset-0 z-100 flex items-center justify-center bg-[#ffffffcc]  min-h-screen text-gray-600 py-10 px-3 backdrop-blur-sm'>
					<div className='relative bg-white border-1 border-gray-500 rounded w-full flex flex-col justify-center gap-y-8 p-6'>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='text-lg font-semibold text-gray-900'>
								Подтверждение смены пароля
							</h3>
							<button
								onClick={handleCancel}
								className='text-gray-400 hover:text-gray-600 duration-300 p-1 rounded-full hover:bg-gray-100 cursor-pointer'
							>
								<LuX className='h-5 w-5' />
							</button>
						</div>

						<p className='text-gray-600 mb-6'>{getModalText()}</p>

						<div className='flex flex-wrap gap-3 justify-end'>
							<button
								onClick={handleCancel}
								className={profileStyles.cancelButton}
							>
								Отмена
							</button>
							<button
								onClick={handleConfirm}
								className={profileStyles.saveButton}
							>
								Продолжить
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ProfilePassword
