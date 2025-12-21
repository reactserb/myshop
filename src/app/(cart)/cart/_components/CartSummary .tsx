import { buttonStyles } from '@/app/(auth)/styles'
import { CartSummaryProps } from '@/lib/types/cart'
import { useCartStore } from '@/store/cartStore'
import { useState } from 'react'
import { FakePaymentData, PaymentSuccessData } from '@/lib/types/payment'
import { useRouter } from 'next/navigation'
import PriceSummary from './PriceSummary'
import {
	createOrderRequest,
	prepareCartItemsWithPrices,
	updateUserAfterPayment,
} from '@/lib/utils/order-helpers'
import FakePaymentModal from './FakePaymentModal'
import PaymentSuccessModal from './PaymentSuccessModal'
import Loader from '@/components/Loader'

const CartSummary = ({
	visibleCartItems,
	totalPrice,
	totalDiscount,
	totalMaxPrice,
	deliveryData,
	productsData = {},
}: CartSummaryProps) => {
	const [isProcessing, setIsProcessing] = useState(false)
	const {
		isCheckout,
		setIsCheckout,
		isOrdered,
		setIsOrdered,
		resetAfterOrder,
	} = useCartStore()
	const [orderNumber, setOrderNumber] = useState<string | null>(null)

	const [showPaymentModal, setShowPaymentModal] = useState(false)
	const [showSuccessModal, setShowSuccessModal] = useState(false)
	const [successData, setSuccessData] = useState<PaymentSuccessData | null>(
		null
	)
	const [isOrderProcessing, setIsOrderProcessing] = useState(false)

	const router = useRouter()

	const createOrder = async (paymentId?: string) => {
		if (!deliveryData) {
			throw new Error('Данные доставки не заполнены')
		}
		const cartItemsWithPrices = prepareCartItemsWithPrices(
			visibleCartItems,
			productsData
		)

		const orderData = {
			totalMaxPrice,
			totalDiscount,
			deliveryAddress: deliveryData.address,
			cartItems: cartItemsWithPrices,
			totalPrice,
			paymentId,
		}

		return await createOrderRequest(orderData)
	}

	const handleOrderCreation = async (paymentData?: FakePaymentData) => {
		if (!deliveryData) {
			console.error('Данные доставки не заполнены')
			return
		}

		setIsProcessing(true)

		try {
			const result = await createOrder(paymentData?.id)
			try {
				await updateUserAfterPayment({
					purchasedProductIds: visibleCartItems.map(item => ({
						productId: item.productId,
						size: item.size,
					})),
				})
			} catch (updateError) {
				console.warn(
					'Заказ создан, но возникла проблема с обновлением бонусов',
					updateError
				)
			}

			const successModalData: PaymentSuccessData = {
				orderNumber: result.orderNumber,
				paymentId: paymentData!.id,
				amount: totalPrice + 500,
				cardLast4: paymentData!.cardLast4,
			}

			setSuccessData(successModalData)
			setShowSuccessModal(true)

			setOrderNumber(result.orderNumber)
			setIsOrdered(true)
		} catch (error: unknown) {
			console.error(`Ошибка при создании заказа:`, error)
			const errorMessage =
				error instanceof Error ? error.message : 'Произошла неизвестная ошибка'
			alert(`Ошибка при оформлении заказа: ${errorMessage}`)
		} finally {
			setIsProcessing(false)
		}
	}

	const handleOnlinePayment = () => {
		if (!deliveryData) {
			console.error('Данные доставки не заполнены')
			return
		}
		setShowPaymentModal(true)
	}

	const handleClosePaymentModal = () => {
		setShowPaymentModal(false)
	}

	const handlePaymentSuccess = async (paymentData: FakePaymentData) => {
		setIsOrderProcessing(true)
		try {
			await handleOrderCreation(paymentData)
		} finally {
			setIsOrderProcessing(false)
		}
	}

	const handlePaymentError = (error: string) => {
		alert(`Ошибка оплаты: ${error}`)
	}

	const handleCloseSuccessModal = () => {
		setShowSuccessModal(false)
		setIsOrdered(true)
		resetAfterOrder()
		router.push('/orders')
	}

	const isFormValid = (): boolean => {
		if (!deliveryData) {
			return false
		}

		const { address } = deliveryData

		// Проверяем обязательные поля адреса
		const isAddressValid = Boolean(
			address.city?.trim() && address.street?.trim() && address.house?.trim()
		)

		// Используем отфильтрованные товары
		const isValidForm = isAddressValid && visibleCartItems.length > 0

		return isValidForm
	}

	const canProceedWithPayment = (): boolean => {
		return isFormValid() && !isProcessing
	}
	return (
		<>
			<PriceSummary
				visibleCartItems={visibleCartItems}
				totalMaxPrice={totalMaxPrice}
				totalDiscount={totalDiscount}
				totalPrice={totalPrice}
			/>

			<div className='w-full'>
				{!isCheckout ? (
					<button
						onClick={() => setIsCheckout(true)}
						disabled={visibleCartItems.length === 0}
						className={`p-3 rounded mx-auto w-full text-2xl cursor-pointer hover:bg-teal-500 ${
							visibleCartItems.length > 0
								? buttonStyles.active
								: buttonStyles.inactive
						}`}
					>
						Оформить заказ
					</button>
				) : (
					<div className='flex flex-col gap-3'>
						{isOrderProcessing ? (
							<Loader
								text='подтверждения заказа. Подождите несколько секунд'
								className='fixed inset-0 z-[1070] flex items-center justify-center bg-black text-white p-4'
							/>
						) : !isOrdered ? (
							<>
								<button
									disabled={!canProceedWithPayment()}
									onClick={handleOnlinePayment}
									className={`rounded w-full text-xl h-15 items-center justify-center ${
										canProceedWithPayment()
											? buttonStyles.active
											: buttonStyles.inactive
									}`}
								>
									{isProcessing ? 'Обработка...' : 'Оплатить на сайте'}
								</button>
							</>
						) : null}
					</div>
				)}
			</div>
			<FakePaymentModal
				amount={totalPrice + 500}
				isOpen={showPaymentModal}
				onClose={handleClosePaymentModal}
				onSuccess={handlePaymentSuccess}
				onError={handlePaymentError}
			/>

			<PaymentSuccessModal
				isOpen={showSuccessModal}
				onClose={handleCloseSuccessModal}
				successData={successData}
			/>
		</>
	)
}

export default CartSummary
