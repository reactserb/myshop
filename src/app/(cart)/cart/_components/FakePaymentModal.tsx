import {
	FakePaymentData,
	FakePaymentModalProps,
	PaymentSimulationResult,
} from '@/lib/types/payment'
import { formatPriceWithSpaces } from '@/lib/utils/price/formatPriceWithSpaces'
import { FormEvent, useState } from 'react'

interface TestCard {
	number: string
	description: string
	result: PaymentSimulationResult
}

const FakePaymentModal = ({
	amount,
	isOpen,
	onClose,
	onSuccess,
	onError,
}: FakePaymentModalProps) => {
	const [isProcessing, setIsProcessing] = useState<boolean>(false)
	const [cardNumber, setCardNumber] = useState<string>('')
	const [expiryDate, setExpiryDate] = useState<string>('')
	const [cvc, setCvc] = useState<string>('')
	const [cardholder, setCardholder] = useState<string>('')

	if (!isOpen) return null

	const testCards: TestCard[] = [
		{
			number: '5555 5555 5555 4444',
			description: 'Успешная оплата',
			result: 'success',
		},
		{
			number: '4111 1111 1111 1111',
			description: 'Недостаточно средств',
			result: 'failure',
		},
		{
			number: '4000 0000 0000 0002',
			description: 'Ошибка банка',
			result: 'error',
		},
	]

	const simulatePayment = async (
		simulatedResult: PaymentSimulationResult
	): Promise<void> => {
		if (!isOpen) return

		setIsProcessing(true)

		await new Promise(resolve => setTimeout(resolve, 2000))

		try {
			const basePaymentData: Omit<FakePaymentData, 'status'> = {
				id: `fake_pay_${Date.now()}`,
				amount,
				cardLast4: cardNumber.slice(-4) || '4444',
				timestamp: new Date().toISOString(),
				processor: 'fake_payment_system',
			}

			switch (simulatedResult) {
				case 'success':
					onSuccess({
						...basePaymentData,
						status: 'succeeded',
					})
					break
				case 'failure':
				case 'error':
					setCardNumber('')
					setExpiryDate('')
					setCvc('')
					setCardholder('')
					onError(
						simulatedResult === 'failure'
							? 'Недостаточно средств на карте'
							: 'Ошибка банка-эмитента. Попробуйте позже'
					)
					break
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Произошла неизвестная ошибка'
			onError(errorMessage)
		} finally {
			setIsProcessing(false)
		}
	}

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault()

		const testCard = testCards.find(card =>
			cardNumber.replace(/\s/g, '').includes(card.number.replace(/\s/g, ''))
		)

		const result: PaymentSimulationResult = testCard?.result || 'error'
		simulatePayment(result)
	}

	const handleCardNumberChange = (value: string): void => {
		const formattedValue = value
			.replace(/\s/g, '')
			.replace(/(\d{4})/g, '$1 ')
			.trim()
			.slice(0, 19)

		setCardNumber(formattedValue)
	}

	const fillTestCard = (cardNumber: string): void => {
		handleCardNumberChange(cardNumber)
		setExpiryDate('12/28')
		setCvc('123')
		setCardholder('IVAN IVANOV')
	}

	const handleExpiryDateChange = (value: string): void => {
		const formattedValue = value
			.replace(/\D/g, '')
			.replace(/(\d{2})(\d)/, '$1/$2')
			.slice(0, 5)

		setExpiryDate(formattedValue)
	}

	const handleCvcChange = (value: string): void => {
		const formattedValue = value.replace(/\D/g, '').slice(0, 3)
		setCvc(formattedValue)
	}

	return (
		<>
			<div className='fixed inset-0 bg-black z-[1040]' />

			<div className='fixed left-4 right-4 top-4 bottom-4 z-[1050] flex flex-col max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden'>
				<div className='p-6 border-b top-0 bg-white'>
					<div className='flex items-center justify-between mb-4'>
						<h2 className='text-xl font-bold'>Тестовая оплата</h2>
						<button
							onClick={onClose}
							className='text-gray-400 hover:text-gray-600 p-1 -m-1 rounded-full hover:bg-gray-100'
							disabled={isProcessing}
						>
							✕
						</button>
					</div>
					<p className='text-gray-600'>
						Сумма: {formatPriceWithSpaces(amount)} ₽
					</p>
				</div>

				<div className='flex-1 overflow-y-auto p-6 pb-20 min-h-0'>
					{/* Тестовые карты */}
					<div className='mb-6 p-4 bg-gray-50 rounded-xl'>
						<h3 className='text-sm font-semibold mb-3 text-gray-800'>
							🧪 Тестовые карты (авто-оплата)
						</h3>
						{testCards.map((card, index) => (
							<button
								key={index}
								type='button'
								onClick={() => fillTestCard(card.number)}
								disabled={isProcessing}
								className='block w-full text-left p-3 hover:bg-gray-100 rounded-xl text-sm mb-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200'
							>
								<div className='flex items-center'>
									<span className='font-mono font-semibold text-gray-900 bg-white px-2 py-1 rounded-md shadow-sm'>
										{card.number}
									</span>
									<span className='text-gray-500 ml-3 flex-1'>
										{card.description}
									</span>
								</div>
							</button>
						))}
					</div>

					<form
						id='payment-form'
						onSubmit={handleFormSubmit}
						className='space-y-4'
					>
						<div>
							<label className='block text-sm font-semibold mb-2 text-gray-700'>
								Номер карты
							</label>
							<input
								type='text'
								value={cardNumber}
								onChange={e => handleCardNumberChange(e.target.value)}
								placeholder='0000 0000 0000 0000'
								className='w-full p-3 border border-gray-300 rounded-xl font-mono text-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all'
								required
								maxLength={19}
								disabled={isProcessing}
							/>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-semibold mb-2 text-gray-700'>
									Срок действия
								</label>
								<input
									type='text'
									value={expiryDate}
									onChange={e => handleExpiryDateChange(e.target.value)}
									placeholder='ММ/ГГ'
									className='w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all'
									required
									maxLength={5}
									disabled={isProcessing}
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold mb-2 text-gray-700'>
									CVC
								</label>
								<input
									type='text'
									value={cvc}
									onChange={e => handleCvcChange(e.target.value)}
									placeholder='123'
									className='w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all'
									required
									maxLength={3}
									disabled={isProcessing}
								/>
							</div>
						</div>

						<div>
							<label className='block text-sm font-semibold mb-2 text-gray-700'>
								Имя держателя
							</label>
							<input
								type='text'
								value={cardholder}
								onChange={e => setCardholder(e.target.value.toUpperCase())}
								placeholder='IVAN IVANOV'
								className='w-full p-3 border border-gray-300 rounded-xl uppercase focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all'
								required
								disabled={isProcessing}
							/>
						</div>
					</form>
				</div>
				<div className='p-6 pt-5 border-t bg-white sticky bottom-0 z-10 flex gap-3'>
					<button
						type='button'
						onClick={onClose}
						disabled={isProcessing}
						className='flex-1 p-4 border border-gray-300 rounded-xl text-gray-700 font-semibold text-base cursor-pointer hover:bg-gray-50 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm'
					>
						Отмена
					</button>
					<button
						type='submit'
						form='payment-form'
						disabled={
							isProcessing || !cardNumber || !expiryDate || !cvc || !cardholder
						}
						className='flex-1 p-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl font-semibold text-base cursor-pointer hover:from-teal-700 hover:to-teal-600 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center'
					>
						{isProcessing ? (
							<span>Обработка...</span>
						) : (
							`Оплатить ${formatPriceWithSpaces(amount)} ₽`
						)}
					</button>
				</div>
			</div>
		</>
	)
}

export default FakePaymentModal
