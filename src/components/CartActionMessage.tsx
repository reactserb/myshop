const CartActionMessage = ({
	message,
}: {
	message: {
		success: boolean
		message: string
	}
}) => {
	if (!message) return null

	const isSuccess = message.success
	const baseClasses =
		'fixed top-4 right-4 z-[1500] px-6 py-3 rounded-xl animate-in slide-in-from-top-2 fade-in duration-300 max-w-sm text-white'

	const gradientClass = isSuccess
		? 'bg-gradient-to-r from-teal-600 to-teal-300'
		: 'bg-gradient-to-r from-red-600 to-red-300'

	return (
		<div className={`${baseClasses} ${gradientClass}`}>
			<div className='flex items-center gap-2'>
				<span className='font-medium'>{message.message}</span>
			</div>
		</div>
	)
}

export default CartActionMessage
