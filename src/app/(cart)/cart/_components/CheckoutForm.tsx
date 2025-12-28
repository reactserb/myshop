'use client'

import { useEffect, useState } from 'react'
import DeliveryAddress from './DeliveryAddress'
import { DeliveryAddress as DeliveryAddressType } from '@/lib/types/order'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useCartStore } from '@/store/cartStore'

interface CheckoutFormProps {
	onFormDataChange: (data: {
		address: DeliveryAddressType
		isAddressValid: boolean
	}) => void
}

const CheckoutForm = ({ onFormDataChange }: CheckoutFormProps) => {
	const [deliveryFormData, setDeliveryFormData] = useState<DeliveryAddressType>(
		{
			city: '',
			street: '',
			house: '',
			apartment: '',
			additional: '',
		}
	)

	const { isOrdered, setIsCheckout } = useCartStore()

	useEffect(() => {
		const isAddressValid = Boolean(
			deliveryFormData.city && deliveryFormData.street && deliveryFormData.house
		)

		onFormDataChange({
			address: deliveryFormData,
			isAddressValid,
		})
	}, [deliveryFormData, onFormDataChange])

	const handleFormDataChange = (
		field: keyof DeliveryAddressType,
		value: string
	) => {
		setDeliveryFormData(prev => ({
			...prev,
			[field]: value,
		}))
	}

	return (
		<div className='flex-1 space-y-10'>
			{!isOrdered && (
				<button
					onClick={() => setIsCheckout(false)}
					className='rounded text-xl h-15 flex items-center text-gray-500 gap-2 cursor-pointer hover:text-gray-700'
				>
					<FaArrowLeftLong />
					<span>Вернуться в корзину</span>
				</button>
			)}
			<DeliveryAddress
				formData={deliveryFormData}
				onFormDataChange={handleFormDataChange}
			/>
		</div>
	)
}

export default CheckoutForm
