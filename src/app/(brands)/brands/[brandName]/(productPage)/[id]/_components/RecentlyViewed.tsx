'use client'

import Loader from '@/components/Loader'
import { ProductCardProps } from '@/lib/types/product'
import { getRecentlyViewedProductIds } from '@/lib/utils/localStorageUtils'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { formatPriceWithSpaces } from '@/lib/utils/price/formatPriceWithSpaces'
import { useAuthStore } from '@/store/authStore'

const RecentlyViewed = ({ finalPrice }: { finalPrice: number }) => {
 	const { isAuth } = useAuthStore()

	if (!isAuth) return null

	const [products, setProducts] = useState<ProductCardProps[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchViewedProducts = async () => {
			 const viewedIds = getRecentlyViewedProductIds(isAuth)

			if (viewedIds.length === 0) {
				setIsLoading(false)
				return
			}

			try {
				// Отправляем POST запрос на наш новый API-роут
				const response = await fetch('/api/viewed-products', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ ids: viewedIds }),
				})

				if (!response.ok) {
					throw new Error('Ошибка сети при загрузке просмотренных товаров')
				}

				const data: ProductCardProps[] = await response.json()

				// Сортируем данные, чтобы они были в том же порядке, что и в localStorage
				const sortedData = viewedIds
					.map(id => data.find(p => p.id.toString() === id.toString()))
					.filter(Boolean) as ProductCardProps[]

				setProducts(sortedData)
			} catch (error) {
				console.error('Ошибка загрузки недавно просмотренных:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchViewedProducts()
	}, [isAuth])

	if (isLoading) {
		return <Loader />
	}

	if (products.length === 0) {
		return null // Ничего не показываем, если история пуста
	}

	return (
		<div className='flex flex-col relative'>
			<h3 className='xl:text-lg mb-2 text-gray-700 text-center xl:text-left px-3'>
				Вы недавно смотрели
			</h3>

			<div className='flex flex-row gap-x-2 xl:gap-x-6 overflow-x-auto pb-4 scrollbar-hide'>
				<div className='block absolute right-0 top-0 bottom-0 w-30 bg-gradient-to-l from-white to-transparent pointer-events-none z-10'></div>
				{products.map(
					({ id, description, basePrice, img, title, discountPercent }) => (
						<Link
							key={id}
							href={`/brands/${title}/${id}?desc=${encodeURIComponent(description)} ${title}`}
							className='text-main-text text-sm xl:text-lg flex flex-col min-w-[200px] w-[200px] xl:min-w-[300px] xl:w-[300px] rounded bg-white duration-300 p-2'
						>
							<div className='relative w-full h-[200px] xl:h-[250px] flex-shrink-0'>
								<Image
									src={img}
									alt={title}
									fill
									className='object-contain'
									sizes='(max-width: 768px) 200px, (max-width: 1280px) 250px, 300px'
								/>
							</div>
							<div>
								{discountPercent > 0 && (
									<div className='flex flex-col mb-2 text-center'>
										<div>
											<div className='text-black xl:text-red-500 mb-2 text-sm xl:text-lg'>
												{formatPriceWithSpaces(finalPrice)} ₽
											</div>
											<span className='hidden xl:block line-through text-xs xl:text-sm'>
												{formatPriceWithSpaces(basePrice)} ₽
											</span>{' '}
											<span className='hidden xl:block bg-yellow-200 p-1 rounded'>
												-{discountPercent} %
											</span>
										</div>
									</div>
								)}
								{!discountPercent && (
									<div className='mb-2 text-sm xl:text-lg text-center'>
										{formatPriceWithSpaces(basePrice)} ₽
									</div>
								)}
							</div>
						</Link>
					)
				)}
			</div>
		</div>
	)
}

export default RecentlyViewed
