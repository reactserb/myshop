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

const OrderCard = ({ order }: { order: Order }) => {
	const [showOrderDetails, setShowOrderDetails] = useState(false)
	const { orderProducts, loading: productsLoading } = useOrderProducts(order)

	const applyIndexStyles = showOrderDetails

	if (productsLoading) {
		return <MiniLoader />
	}

	return (
		<div className='text-main-text'>
			<div className='flex flex-col md:flex-row justify-between items-center mb-10.5 gap-6'>
				<div className='flex flex-row text-sm lg:text-2xl gap-6 items-center'>
					<span
						className={`px-2 py-1 rounded text-base shrink-0 ${getStatusColor(order)}`}
					>
						{getStatusText(order)}
					</span>
				</div>
				<OrderActions
					showOrderDetails={showOrderDetails}
					onToggleDetails={() => setShowOrderDetails(!showOrderDetails)}
				/>
				<div className='flex flex-row gap-6 items-center'>
					<p className='text-sm text-green-700 lg:text-2xl'>
						{formatPriceWithSpaces(order.totalAmount)} ₽
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
		</div>
	)
}

export default OrderCard
