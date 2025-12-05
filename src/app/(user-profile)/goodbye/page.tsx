import { AuthFormLayout } from '@/app/(auth)/_components/AuthFormLayout'
import Link from 'next/link'

export default function GoodbyePage() {
	return (
		<AuthFormLayout>
			<div className='bg-white flex flex-col justify-center items-center'>
				<h1 className='text-2xl font-bold text-gray-600 mb-4'>
					Ваш аккаунт был удален
				</h1>
				<p className='text-gray-600 mb-6'>
					Спасибо, что были с нами. Все ваши данные были успешно удалены.
				</p>
				<Link
					href='/'
					className='bg-gray-300 hover:bg-gray-500 w-full text-center text-white text-2xl px-3 py-2 cursor-pointer rounded duration-300'
				>
					На главную
				</Link>
			</div>
		</AuthFormLayout>
	)
}
