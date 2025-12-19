'use client'

import { addToCartAction } from '@/actions/addToCartAction'
import CartActionMessage from '@/components/CartActionMessage'
import { formatPriceWithSpaces } from '@/lib/utils/price/formatPriceWithSpaces'
import { useCartStore } from '@/store/cartStore'
import { useEffect, useRef, useState } from 'react'
import { LuShoppingCart } from 'react-icons/lu'

interface ClientInfoProps {
	sizes: string[]
	finalPrice: number
	basePrice: number
	discountPercent: number
	productId: string
}

const ClientInfo = ({
	sizes,
	finalPrice,
	basePrice,
	discountPercent,
	productId,
}: ClientInfoProps) => {
	const [selectedSize, setSelectedSize] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState<{
		success: boolean
		message: string
	} | null>(null)

	const { fetchCart } = useCartStore()
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const handleAddToCartFromProductPage = async () => {
		if (isLoading) return

		if (!selectedSize) {
			setMessage({
				success: false,
				message: 'Выберите размер',
			})
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}
			timerRef.current = setTimeout(() => {
				setMessage(null)
				timerRef.current = null
			}, 3000)

			return
		}

		setIsLoading(true)
		setMessage(null)

		try {
			const result = await addToCartAction(productId, selectedSize)
			setMessage(result)
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}
			timerRef.current = setTimeout(() => {
				setMessage(null)
				timerRef.current = null
			}, 3000)

			if (result.success) {
				await fetchCart()
			}
		} catch {
			setMessage({
				success: false,
				message: 'Ошибка при добавлении в корзину',
			})
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}
		}
	}, [])

	return (
		<>
			<div className='flex flex-col gap-y-3'>
				<span className='text-sm'>Доступные размеры</span>
				<div className='flex items-center justify-center gap-2'>
					{sizes.map(size => (
						<button
							key={size}
							onClick={() => setSelectedSize(size)}
							className={`min-w-8 h-8 flex justify-center items-center rounded text-sm cursor-pointer transition-colors duration-300 ${
								selectedSize === size
									? 'bg-teal-500 text-white '
									: 'bg-gray-300 hover:bg-gray-500 hover:text-white'
							}`}
						>
							{size.toUpperCase()}
						</button>
					))}
				</div>
			</div>
			<div>
				{discountPercent > 0 && (
					<div className='flex flex-col mb-2 text-center'>
						<div>
							<div className='text-red-500 mb-2 text-xl'>
								{formatPriceWithSpaces(finalPrice)} ₽
							</div>
							<span className='line-through'>
								{formatPriceWithSpaces(basePrice)} ₽
							</span>{' '}
							<span className='bg-yellow-200 p-1 rounded'>
								-{discountPercent} %
							</span>
						</div>
					</div>
				)}
				{!discountPercent && (
					<div className='mb-2 text-xl'>
						{formatPriceWithSpaces(basePrice)} ₽
					</div>
				)}
			</div>
			<div>
				<button
					onClick={handleAddToCartFromProductPage}
					disabled={isLoading}
					className={`relative mb-2 max-w-[300px] mx-auto h-15 ${
						isLoading
							? 'bg-gray-400 opacity-50 cursor-not-allowed'
							: 'bg-gray-500 hover:bg-teal-400 cursor-pointer'
					} text-white text-sm md:text-lg py-4 pl-15 pr-8 md:pl-15 flex justify-center items-center rounded duration-300`}
				>
					<LuShoppingCart
						className={`w-6 h-6 absolute left-4 ${isLoading ? 'animate-spin' : ''}`}
					/>
					<p className='text-center'>
						{isLoading ? 'Добавляем в корзину...' : 'Добавить в корзину'}
						{!isLoading && (
							<span className='block text-gray-300 text-sm'>
								{selectedSize?.toUpperCase()}
							</span>
						)}
					</p>
				</button>
			</div>
			{message && <CartActionMessage message={message} />}
		</>
	)
}

export default ClientInfo
