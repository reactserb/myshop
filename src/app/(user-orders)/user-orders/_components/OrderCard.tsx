import { Order } from '@/lib/types/order'
import { useOrderProducts } from '@/hooks/useOrderProducts'
import { formatPriceWithSpaces } from '@/lib/utils/price/formatPriceWithSpaces'
import { getStatusText } from './utils/getStatusText'
import { getStatusColor } from './utils/getStatusColor'
import ProductsSection from '@/app/(products)/ProductsSection'
import { useState } from 'react'
import { OrderActions } from './OrderActions'
import MiniLoader from '@/components/MiniLoader'
import OrderDetails from './OrderDetails'
import FakePaymentModal from '@/app/(fake-payment)/FakePaymentModal'
import { FakePaymentData, PaymentSuccessData } from '@/lib/types/payment'
import {
	markPaymentAsFailed,
	updateAfterPayment,
} from '@/lib/utils/order-helpers'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import PaymentSuccessModal from '@/app/(fake-payment)/PaymentSuccessModal'
import Loader from '@/components/Loader'

const OrderCard = ({ order }: { order: Order }) => {
	const [showOrderDetails, setShowOrderDetails] = useState(false)
	const [showPaymentModal, setShowPaymentModal] = useState(false)
	const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)
	const [showSuccessModal, setShowSuccessModal] = useState(false)
	const [successData, setSuccessData] = useState<PaymentSuccessData | null>(
		null
	)
	const router = useRouter()

	const purchasedProductIds = order.items.map(item => ({
		productId: item.productId,
		size: item.size,
	}))

	const { setIsOrdered, resetAfterOrder } = useCartStore()

	const { orderProducts, loading: productsLoading } = useOrderProducts(order)

	const applyIndexStyles = showOrderDetails

	const handlePaymentResult = async (paymentData?: FakePaymentData) => {
		try {
			if (paymentData?.status === 'succeeded') {
				await updateAfterPayment({
					orderId: order._id!,
					purchasedProductIds,
				})
			}

			const successModalData: PaymentSuccessData = {
				orderNumber: order.orderNumber!,
				paymentId: paymentData!.id,
				amount: order.totalAmount + 500,
				cardLast4: paymentData!.cardLast4,
			}

			setSuccessData(successModalData)

			setShowSuccessModal(true)

			setIsOrdered(true)
		} catch (error) {
			setShowPaymentModal(false)
			console.error(`Ошибка:`, error)
			alert(`Ошибка при обработке заказа`)
		} finally {
			setShowPaymentModal(false)
		}
	}

	const handlePaymentSuccess = async (paymentData: FakePaymentData) => {
		setIsPaymentProcessing(true)
		try {
			await handlePaymentResult(paymentData)
		} finally {
			setIsPaymentProcessing(false)
		}
	}

	const handlePaymentError = async (error: string) => {
		alert(`Ошибка оплаты: ${error}`)
		if (order._id) {
			await markPaymentAsFailed(order._id)
		} else {
			console.error('Order ID не найден для отметки платежа как неудачного')
		}
		setShowPaymentModal(false)
		resetAfterOrder()
		router.push('/user-orders')
	}

	const handleClosePaymentModal = () => {
		setShowPaymentModal(false)
	}

	const handleCloseSuccessModal = () => {
		window.location.href = '/user-orders'
		setShowSuccessModal(false)
		setIsOrdered(true)
		resetAfterOrder()
	}

	if (productsLoading) {
		return <MiniLoader />
	}

	return (
		<>
			{isPaymentProcessing && (
				<Loader
					text='подтверждения платежа'
					className='fixed inset-0 z-[1070] flex items-center justify-center bg-black text-white p-4'
				/>
			)}
			<div className='text-main-text'>
				<div className='flex flex-col md:flex-row justify-between items-center mb-10.5 gap-6'>
					<div className='flex flex-row text-sm lg:text-2xl gap-6 items-center'>
						<span
							className={`px-2 py-1 rounded text-base shrink-0 ${getStatusColor(order)}`}
						>
							{getStatusText(order)}
						</span>
						{order.paymentStatus !== 'paid' && (
							<button
								onClick={() => setShowPaymentModal(true)}
								className='px-2 py-1 bg-teal-600 text-white hover:scale-105 rounded text-base shrink-0 cursor-pointer duration-300'
							>
								Оплатить
							</button>
						)}
					</div>
					<OrderActions
						showOrderDetails={showOrderDetails}
						onToggleDetails={() => setShowOrderDetails(!showOrderDetails)}
					/>
					<div className='flex flex-row gap-6 items-center'>
						<p className='text-sm text-green-700 lg:text-2xl'>
							{formatPriceWithSpaces(order.totalAmount + 500)} ₽
						</p>
					</div>
				</div>
				{showOrderDetails && <OrderDetails order={order} />}
				<ProductsSection
					products={orderProducts}
					compact
					isOrderPage={true}
					applyIndexStyles={applyIndexStyles}
				/>
				<FakePaymentModal
					amount={order.totalAmount + 500}
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
			</div>
		</>
	)
}

export default OrderCard
