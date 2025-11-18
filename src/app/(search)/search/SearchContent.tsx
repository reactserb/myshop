'use client'

import ProductsSection from '@/app/(products)/ProductsSection'
import ErrorComponent from '@/components/ErrorComponent'
import MiniLoader from '@/components/MiniLoader'
import { ProductCardProps } from '@/lib/types/product'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const SearchContent = () => {
	const [products, setProducts] = useState<ProductCardProps[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<{
		error: Error
		userMessage: string
	} | null>(null)

	const searchParams = useSearchParams()
	const query = searchParams.get('q') || ''

	useEffect(() => {
		const fetchSearchResults = async () => {
			try {
				setIsLoading(true)
				const response = await fetch(
					`/api/search-full?query=${encodeURIComponent(query)}`
				)
				const data = await response.json()

				setProducts(data)
			} catch (error) {
				setError({
					error:
						error instanceof Error ? error : new Error('Неизвестная ошибка'),
					userMessage: 'Ошибка: не удалось загрузить результаты поиска',
				})
			} finally {
				setIsLoading(false)
			}
		}

		if (query) {
			fetchSearchResults()
		}
	}, [query])

	if (isLoading) {
		return <MiniLoader />
	}

	if (error) {
		return (
			<ErrorComponent error={error.error} userMessage={error.userMessage} />
		)
	}

	return (
		<div>
			<div className='px-5'>
				<h1 className='text-xl'>Результаты поиска</h1>
				<div className='mb-6 text-gray-400'>
					<p>
						по запросу <span className='text-black'>«{query}»</span>
					</p>
					<p className='text-black'>
						Найдено: <span>{products.length}</span>
					</p>
				</div>
			</div>

			{products.length === 0 ? (
				<p className='px-5'>По Вашему запросу ничего не найдено</p>
			) : (
				<ProductsSection title={''} products={products} />
			)}
		</div>
	)
}

export default SearchContent
