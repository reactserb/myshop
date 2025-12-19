'use client'

import { addToCartAction } from '@/actions/addToCartAction'
import { SizeOptionsProps } from '@/lib/types/sizeOptions'
import { useEffect, useRef, useState } from 'react'
import CartActionMessage from './CartActionMessage'
import { useCartStore } from '@/store/cartStore'

const SizeOptions = ({ sizes, productId }: SizeOptionsProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState<{
		success: boolean
		message: string
	} | null>(null)

	const { fetchCart } = useCartStore()
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const handleClick = (e: React.MouseEvent, size: string) => {
		e.preventDefault()
		e.stopPropagation()
		handleAddToCart(size)
	}

	const handleAddToCart = async (size: string) => {
		if (isLoading) return

		setIsLoading(true)
		setMessage(null)

		try {
			const result = await addToCartAction(productId, size)
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
			<div className='absolute inset-y-0 w-full z-10 flex flex-wrap justify-center content-end pb-5 gap-2 bg-white opacity-50 hidden xl:group-hover:flex'>
				{sizes.map(size => (
					<form action={() => handleAddToCart(size)} key={size}>
						<button
							onClick={e => handleClick(e, size)}
							disabled={isLoading}
							className='min-w-8 h-8 flex justify-center items-center bg-gray-300 rounded text-sm cursor-pointer hover:bg-gray-500 active:bg-teal-500 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed'
						>
							{size === size.toString() ? size.toUpperCase() : size}
						</button>
					</form>
				))}
			</div>
			{message && <CartActionMessage message={message} />}
		</>
	)
}

export default SizeOptions
