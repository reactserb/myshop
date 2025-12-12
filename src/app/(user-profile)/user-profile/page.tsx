'use client'

import { ErrorContent } from '@/app/(auth)/(reg)/_components/ErrorContent'
import Loader from '@/components/Loader'
import { useAuthStore } from '@/store/authStore'
import { useEffect, useState } from 'react'
import { LuMailWarning, LuPhone } from 'react-icons/lu'
import ProfileHeader from '../_components/ProfileHeader'
import SecuritySection from '../_components/SecuritySection'
import { useRouter } from 'next/navigation'
import ProfileAvatar from '../_components/ProfileAvatar'
import ProfileEmail from '../_components/ProfileEmail'
import ProfilePhoneSettings from '../_components/ProfilePhone/ProfilePhoneSettings'
import ProfilePassword from '../_components/ProfilePassword'

const ProfilePage = () => {
	const { user, isAuth, checkAuth } = useAuthStore()
	const [isCheckingAuth, setIsCheckingAuth] = useState(true)
	const [isInfoOpen, setIsInfoOpen] = useState(false)
	const router = useRouter()
	const isPhoneRegistration = user?.phoneNumberVerified

	useEffect(() => {
		const checkAuthentication = async () => {
			await checkAuth()
			setIsCheckingAuth(false)
		}
		checkAuthentication()
	}, [checkAuth])

	useEffect(() => {
		if (!isCheckingAuth && !isAuth) {
			router.replace('/')
		}
	}, [isAuth, isCheckingAuth, router])

	const handleToLogin = () => {
		router.replace('/login')
	}

	const handleToRegister = () => {
		router.replace('/register')
	}

	if (isCheckingAuth) {
		return <Loader />
	}

	if (!isAuth) {
		return <Loader />
	}

	if (!user) {
		return (
			<ErrorContent
				error='Данные пользователя не найдены'
				icon={<LuMailWarning className='h-8 w-8 text-red-600' />}
				primaryAction={{ label: 'Войти', onClick: handleToLogin }}
				secondaryAction={{
					label: 'Зарегистрироваться',
					onClick: handleToRegister,
				}}
			/>
		)
	}

	return (
		<div className='px-4 md:px-6 xl:px-8'>
			<div className='max-w-4xl mx-auto'>
				<div className='animate-slide-in opacity translate-y-8'>
					<div className='bg-white rounded border border-gray-300 overflow-hidden duration-700 ease-out'>
						<ProfileHeader name={user.name} surname={user.surname} />

						<div className='p-6 md:p-8'>
							<div className='flex items-center justify-center mb-6'>
								<div className='bg-gray-500 text-white px-3 py-2 rounded text-sm flex items-center'>
									{isPhoneRegistration ? (
										<>
											<LuPhone className='h-5 w-5 mr-2' />
											<span>Зарегистрирован по телефону</span>
										</>
									) : (
										<>
											<LuMailWarning className='h-5 w-5 mr-2' />
											<span>Зарегистрирован по email</span>
										</>
									)}
								</div>
							</div>
							<ProfileAvatar />
							<button
								className='px-4 py-2 bg-gray-500 hover:bg-gray-300 hover:text-gray-600 text-white rounded cursor-pointer mb-3'
								onClick={() => setIsInfoOpen(!isInfoOpen)}
							>
								{isInfoOpen ? 'Скрыть информацию' : 'Показать информацию'}
							</button>
							{isInfoOpen && (
								<>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
										<ProfileEmail />
										<ProfilePhoneSettings />
									</div>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
										<ProfilePassword />
									</div>
								</>
							)}
							<SecuritySection />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfilePage
