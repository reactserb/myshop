import { AuthFormLayout } from '@/app/(auth)/_components/AuthFormLayout'
import { formStyles } from '@/app/(auth)/styles'
import { LuCheck, LuTrash2 } from 'react-icons/lu'
import { TbLoader2 } from 'react-icons/tb'

interface DeleteAccountVerificationStepProps {
	phoneNumber?: string
	code: string
	error: string
	verifying: boolean
	canResend: boolean
	timeLeft: number
	onCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	onVerify: (e: React.FormEvent) => void
	onResend: () => void
}

export const DeleteAccountVerificationStep = ({
	phoneNumber,
	code,
	error,
	verifying,
	canResend,
	timeLeft,
	onCodeChange,
	onVerify,
	onResend,
}: DeleteAccountVerificationStepProps) => {
	return (
		<AuthFormLayout>
			<div className='flex flex-col gap-y-8'>
				<div className='flex flex-col items-center'>
					<LuTrash2 className='w-12 h-12 text-red-500 mb-4' />
					<h1 className='text-2xl font-bold text-center'>
						Последнее подтверждение
					</h1>
				</div>

				<p className='text-center text-red-600 font-medium'>
					Вы собираетесь безвозвратно удалить свой аккаунт и все данные!
				</p>

				<p className='text-center'>
					Введите код из SMS, отправленный на номер +{phoneNumber}
				</p>

				{error && (
					<div className='p-3 bg-red-100 text-red-700 rounded text-center'>
						{error}
					</div>
				)}

				<div className='flex flex-col gap-3 items-center'>
					<div className='flex flex-row gap-3 justify-center'>
						<input
							type='text'
							inputMode='numeric'
							pattern='[0-9]{4}'
							maxLength={4}
							value={code}
							onChange={onCodeChange}
							className={`${formStyles.input} [&&]:w-27.5 [&&]:bg-white block text-center`}
							autoComplete='one-time-code'
							autoFocus
							required
						/>

						<button
							onClick={onVerify}
							disabled={code.length !== 4 || verifying}
							className='flex-1 flex flex-row items-center justify-center gap-x-3 bg-red-100 hover:bg-red-700 text-red-700 hover:text-gray-700 px-4 py-2 h-10 rounded font-medium duration-300 text-center cursor-pointer disabled:bg-gray-200'
						>
							{verifying ? (
								<>
									<TbLoader2 className='animate-spin w-4 h-4' />
									Удаление...
								</>
							) : (
								<>
									<LuCheck className='w-4 h-4 flex-shrink-0' />
									Удалить аккаунт
								</>
							)}
						</button>
					</div>

					<button
						onClick={onResend}
						disabled={!canResend}
						className='text-gray-500 hover:text-black text-sm underline duration-300 cursor-pointer disabled:opacity-50'
					>
						{canResend
							? 'Отправить код повторно'
							: `Повторить отправку через: ${timeLeft} сек`}
					</button>
				</div>
			</div>
		</AuthFormLayout>
	)
}
