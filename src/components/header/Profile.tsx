'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuthStore } from '@/store/authStore'
import { IoEnterOutline, IoExitOutline } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAvatar } from '@/lib/utils/avatar/getAvatar'
import { checkAvatarExists } from '@/lib/utils/avatar/avatarUtils'

const Profile = () => {
	const { isAuth, logout, user, checkAuth } = useAuthStore()
	const [avatarSrc, setAvatarSrc] = useState<string>('')
	const [lastUpdate, setLastUpdate] = useState(Date.now())
	const router = useRouter()

	useEffect(() => {
		setLastUpdate(Date.now())
	}, [user])

	useEffect(() => {
		const checkAvatar = async () => {
			if (user?.id) {
				try {
					const exists = await checkAvatarExists(user.id)

					if (exists) {
						setAvatarSrc(`/api/auth/avatar/${user.id}?t=${lastUpdate}`)
					} else {
						setAvatarSrc(getAvatar())
					}
				} catch {
					setAvatarSrc(getAvatar())
				}
			} else if (user?.gender) {
				setAvatarSrc(getAvatar())
			}
		}

		checkAvatar()
	}, [user, lastUpdate])

	useEffect(() => {
		checkAuth()
	}, [checkAuth])

	const handleLogout = async () => {
		try {
			await logout()

			router.replace('/')
		} catch (error) {
			console.error('Не удалось выйти:', error)
		}
	}

	const handleAvatarError = () => {
		setAvatarSrc(getAvatar())
	}

	if (!isAuth) {
		return (
			<Link href='login' className='text-gray-400 hover:text-black'>
				<IoEnterOutline className='text-3xl' />
			</Link>
		)
	}

	return (
		<div className='flex flex-1 items-center gap-x-3 cursor-pointer'>
			<Link href='/user-profile' className='flex items-center'>
				<span className='hidden xl:block cursor-pointer p-2.5'>
					{user?.name}
				</span>
				<div className='w-10 h-10 rounded-full overflow-hidden'>
					<Image
						src={avatarSrc || getAvatar()}
						alt='Ваш профиль'
						width={40}
						height={40}
						onError={handleAvatarError}
						className='object-cover w-full h-full'
					/>
				</div>
			</Link>
			<button
				onClick={handleLogout}
				className='text-gray-400 hover:text-black cursor-pointer'
			>
				<IoExitOutline className='text-3xl' />
			</button>
		</div>
	)
}
export default Profile
