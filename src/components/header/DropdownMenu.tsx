'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { BrandProps } from '@/lib/types/brand'
import { ProductCardProps } from '@/lib/types/product'
import { FaArrowRightLong } from 'react-icons/fa6'
import ErrorComponent from '../ErrorComponent'
import { DropdownMenuProps } from '@/lib/types/dropdown'
import MiniLoader from '../MiniLoader'

type DataType = BrandProps | ProductCardProps

const menuCache = new Map<string, DataType[]>()

const DropdownMenu: React.FC<DropdownMenuProps> = ({ item, onClose }) => {
	const [data, setData] = useState<DataType[] | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<{
		error: Error
		userMessage: string
	} | null>(null)
	const limit = 10

	useEffect(() => {
		const cacheKey = `${item.apiEndpoint}-${item.categoryName || 'brands'}`

		if (menuCache.has(cacheKey)) {
			setData(menuCache.get(cacheKey)!)
			setIsLoading(false)
			return
		}

		const fetchData = async () => {
			try {
				let apiUrl = ''

				if (item.apiEndpoint === 'brands') {
					apiUrl = `/api/brands?brandsLimit=${limit}`
				} else if (item.apiEndpoint === 'products' && item.categoryName) {
					apiUrl = `/api/products?category=${item.categoryName}&randomLimit=${limit}`
				} else {
					throw new Error('Invalid item configuration')
				}

				const res = await fetch(apiUrl)

				const result = (await res.json()) as DataType[]

				menuCache.set(cacheKey, result)
				setData(result)
			} catch (error) {
				setError({
					error:
						error instanceof Error ? error : new Error('Неизвестная ошибка'),
					userMessage: 'Не удалось загрузить данные. Попробуйте позже.',
				})
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [item, limit])

	if (isLoading) {
		return (
			<div className='p-4 bg-white text-black border-b border-gray-200 flex justify-center items-center h-32'>
				<MiniLoader />
			</div>
		)
	}

	if (error) {
		return (
			<ErrorComponent error={error.error} userMessage={error.userMessage} />
		)
	}

	if (!data || data.length === 0) {
		return (
			<div className='p-4 bg-white text-sm text-black border-b border-gray-200'>
				Ничего не найдено
			</div>
		)
	}

	const renderItem = (dataItem: DataType) => {
		if ('brandName' in dataItem) {
			return (
				<div className='flex items-center p-2 rounded'>
					<span className='text-sm'>{dataItem.brandName}</span>
				</div>
			)
		} else {
			return (
				<div className='flex gap-5 items-center p-1 rounded'>
					{dataItem.img && (
						<Image
							src={dataItem.img}
							alt='Фото товара'
							width={50}
							height={50}
							className='ml-4 flex-shrink-0'
						/>
					)}
					<div className='flex gap-x-1 flex-grow'>
						<div className='text-sm text-gray-500 truncate'>
							{dataItem.description}
						</div>
						<div className='text-sm truncate'>{dataItem.title}</div>
					</div>
				</div>
			)
		}
	}

	return (
		<div className='bg-white p-15 shadow-[var(--shadow-thick)] border-b border-gray-200 overflow-hidden'>
			<div className='max-w-[1408px] mx-auto px-5'>
				<div className='grid md:grid-cols-3 lg:grid-cols-4 gap-4 py-4'>
					{data.map((dataItem, index) => (
						<div
							key={dataItem._id || index}
							className='hover:bg-gray-100 rounded'
						>
							<Link
								href={
									'title' in dataItem
										? `/products/${dataItem.id}`
										: `${item.href}/${dataItem.brandName}`
								}
								className='cursor-pointer block'
								onClick={onClose}
							>
								{renderItem(dataItem)}
							</Link>
						</div>
					))}
				</div>
				<div className='p-2 mt-4'>
					<Link
						href={item.href}
						className='block w-full text-center bg-gray-100 hover:bg-gray-200 py-2 rounded text-black'
						onClick={onClose}
					>
						<span className='flex gap-x-2 p-1 items-center justify-center'>
							Посмотреть все
							{item.apiEndpoint === 'brands'
								? ' бренды'
								: item.categoryName === 'new-arrivals'
								? ' новинки'
								: ' скидки'}
							<FaArrowRightLong />
						</span>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default DropdownMenu
