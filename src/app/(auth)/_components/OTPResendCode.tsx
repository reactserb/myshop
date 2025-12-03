'use client'

const OTPResendCode = ({
	canResend,
	timeLeft,
	onResendAction,
}: {
	canResend: boolean
	timeLeft: number
	onResendAction: () => void
}) => {
	return !canResend ? (
		<p className='text-black text-xs text-center'>
			Запросить код повторно можно через{' '}
			<span className='font-bold'>{timeLeft} секунд</span>
		</p>
	) : (
		<button
			onClick={onResendAction}
			disabled={!canResend}
			className={`text-xs underline cursor-pointer text-center ${
				canResend ? 'text-gray-500' : 'text-gray-300 cursor-not-allowed'
			}`}
		>
			Отправить еще раз
		</button>
	)
}

export default OTPResendCode
