import { PaymentSuccessData } from '@/lib/types/payment'
import { formatPriceWithSpaces } from '@/lib/utils/price/formatPriceWithSpaces'

interface PaymentSuccessModalProps {
	isOpen: boolean
	onClose: () => void
	successData: PaymentSuccessData | null
}

const PaymentSuccessModal = ({
	isOpen,
	onClose,
	successData,
}: PaymentSuccessModalProps) => {
	if (!isOpen || !successData) return null

	return (
		<>
			<div className='fixed inset-0 bg-black/50 z-[1040]' />
			<div className='fixed left-4 right-4 top-4 bottom-4 z-[1050] flex flex-col max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden'>
				<div className='p-6 border-b top-0 bg-white text-center'>
					<div className='w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6'>
						<svg
							className='w-12 h-12 text-green-600'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M5 13l4 4L19 7'
							/>
						</svg>
					</div>
					<h2 className='text-2xl font-bold text-gray-900 mb-2'>
						Оплата прошла успешно!
					</h2>
					<button
						onClick={onClose}
						className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 -m-2 rounded-full hover:bg-gray-100 transition-all'
					>
						✕
					</button>
				</div>

				<div className='flex-1 overflow-y-auto p-6 pb-20 min-h-0'>
					<div className='space-y-4 mb-8 bg-gray-50 p-6 rounded-2xl'>
						<h3 className='font-semibold text-lg text-gray-900 mb-4 text-center'>
							📋 Детали заказа
						</h3>
						<div className='space-y-3'>
							<div className='flex justify-between items-center py-2 gap-x-3 border-b border-gray-200 last:border-b-0'>
								<span className='text-gray-600'>Номер заказа:</span>
								<span className='font-semibold text-gray-900'>
									#{successData.orderNumber}
								</span>
							</div>
							<div className='flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0'>
								<span className='text-gray-600'>ID платежа:</span>
								<span className='font-mono text-sm bg-white px-2 py-1 rounded text-gray-900'>
									{successData.paymentId.slice(-8)}
								</span>
							</div>
							<div className='flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0'>
								<span className='text-gray-600'>Сумма:</span>
								<span className='font-semibold text-2xl text-green-600'>
									{formatPriceWithSpaces(successData.amount)} ₽
								</span>
							</div>
							<div className='flex justify-between items-center py-2'>
								<span className='text-gray-600'>Карта:</span>
								<span className='font-mono bg-white px-3 py-2 rounded-lg shadow-sm text-sm'>
									•••• {successData.cardLast4}
								</span>
							</div>
						</div>
					</div>
					<div className='bg-blue-50 p-6 rounded-2xl border border-blue-200 mb-8'>
						<p className='text-gray-800 text-sm leading-relaxed'>
							Ваш заказ успешно оплачен и передан в обработку. В ближайшее время
							с Вами свяжется наш менеджер для подтверждения доставки.
						</p>
					</div>
				</div>
				<div className='p-6 pt-5 border-t bg-white sticky bottom-0 z-10'>
					<button
						onClick={onClose}
						className='w-full p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-base'
					>
						Понятно
					</button>
				</div>
			</div>
		</>
	)
}

export default PaymentSuccessModal
