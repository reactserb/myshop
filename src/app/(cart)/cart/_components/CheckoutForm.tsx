'use client'

import { useEffect, useState } from 'react'
import DeliveryAddress from './DeliveryAddress'
import { DeliveryAddress as DeliveryAddressType } from '@/lib/types/order'

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
			<DeliveryAddress
				formData={deliveryFormData}
				onFormDataChange={handleFormDataChange}
			/>
		</div>
	)
}

export default CheckoutForm
