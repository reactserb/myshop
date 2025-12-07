import { AuthFormLayout } from '@/app/(auth)/_components/AuthFormLayout'
import { LuMail, LuTrash2 } from 'react-icons/lu'
import { TbLoader2 } from 'react-icons/tb'

interface DeleteAccountInitialStepProps {
	loading: boolean
	error: string
	canResend: boolean
	timeLeft: number
	onSendCode: (e: React.FormEvent) => void
}

export const DeleteAccountInitialStep = ({
	loading,
	error,
	canResend,
	timeLeft,
	onSendCode,
}: DeleteAccountInitialStepProps) => {
	return (
		<AuthFormLayout>
			<div className='flex flex-col gap-y-8'>
				<div className='flex flex-col items-center'>
					<LuTrash2 className='w-12 h-12 text-red-500 mb-4' />
					<h1 className='text-2xl font-bold text-center'>Удаление аккаунта</h1>
				</div>
				<p className='text-center text-red-600 font-medium'>
					Внимание! Это действие необратимо. Все Ваши данные будут удалены без
					возможности восстановления.
				</p>

				<p className='text-center'>
					Для подтверждения удаления аккаунта мы отправим SMS с кодом на
					телефон, по которому Вы регистрировались.
				</p>

				{error && (
					<div className='p-3 bg-red-100 text-red-700 text-center rounded'>
						{error}
					</div>
				)}

				<form
					onSubmit={onSendCode}
					className='mx-auto flex flex-col justify-center'
					autoComplete='off'
				>
					<button
						type='submit'
						disabled={loading || !canResend}
						className='flex-1 flex flex-row items-center justify-center gap-x-3 bg-red-100 hover:bg-red-700 text-red-700 hover:text-gray-700 px-4 py-2 h-10 rounded font-medium duration-300 text-center cursor-pointer disabled:bg-gray-200'
					>
						{loading ? (
							<>
								<TbLoader2 className='animate-spin w-4 h-4' />
								Отправка...
							</>
						) : !canResend ? (
							`Ждите ${timeLeft} сек`
						) : (
							<>
								<LuMail className='w-4 h-4 flex-shrink-0' />
								Получить код подтверждения
							</>
						)}
					</button>
				</form>
			</div>
		</AuthFormLayout>
	)
}
