'use client'

import { SortProps } from '@/lib/types/priceTypes'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'
import { BiSort } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'

export const sortOptions = [
	{ value: 'default', label: 'По умолчанию' },
	{ value: 'price_asc', label: 'По возрастанию цены' },
	{ value: 'price_desc', label: 'По убыванию цены' },
]

const Sorter = ({ basePath, onCloseMenu, compact }: SortProps) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const pathname = usePathname()

	const [isOpen, setIsOpen] = useState(false)

	const currentSortValue = searchParams.get('sort') || 'default'

	// Получение текста для отображения в заголовке
	let currentLabel =
		sortOptions.find(option => option.value === currentSortValue)?.label ||
		'Сортировка'

	if (currentSortValue === 'default') {
		currentLabel = 'Сортировка'
	}

	//  Функция для обновления параметра URL
	const handleSortChange = useCallback(
		(value: string) => {
			setIsOpen(false) // Закрываем меню

			const params = new URLSearchParams(searchParams.toString())
			params.delete('page')

			if (value === 'default') {
				params.delete('sort')
			} else {
				params.set('sort', value)
			}

			router.push(`${basePath || pathname}?${params.toString()}`)

			if (onCloseMenu) {
				onCloseMenu()
			}
		},
		[searchParams, router, pathname, basePath, onCloseMenu]
	)

	if (compact) {
		return (
			<div className='flex flex-col px-4 mt-10'>
				<div className='flex items-center gap-x-1 text-md mb-10'>
					<BiSort className='text-xl' />
					<span>Сортировка</span>
				</div>

				<div className='flex flex-col gap-y-1'>
					{sortOptions.map(option => {
						const isSelected = currentSortValue === option.value
						return (
							<button
								key={option.value}
								onClick={() => handleSortChange(option.value)}
								className={`
                                py-2 px-0 text-md whitespace-nowrap text-left transition-colors duration-150 relative
                                ${
																	isSelected
																		? 'text-gray-700 font-bold'
																		: 'text-gray-500 hover:text-gray-700 font-normal'
																}
                            `}
								role='menuitem'
							>
								<span>{option.label}</span>
								{isSelected && (
									<span
										className='absolute left-[-1rem] top-1/2 transform -translate-y-1/2 
                                               w-2 h-2 bg-gray-900 rounded-full'
									/>
								)}
							</button>
						)
					})}
				</div>
			</div>
		)
	}

	return (
		<div
			className={`relative inline-block`}
			onMouseLeave={() => {
				if (!compact) {
					setIsOpen(false)
				}
			}}
		>
			{/* Кнопка открытия/закрытия */}
			<button
				type='button'
				// Удаляем лишний класс 'menu-drawer-ignore' с кнопки в десктопном режиме,
				// так как он здесь не нужен (MenuDrawer не используется)
				className={`inline-flex items-center w-56 rounded px-4 py-2 bg-white font-medium ${
					compact // compact всегда false в этой ветке
						? 'mt-10 text-base text-black'
						: 'border border-gray-300 text-sm text-gray-700'
				}`}
				onClick={() => setIsOpen(!isOpen)}
				aria-expanded={isOpen}
				aria-haspopup='true'
			>
				{currentLabel}
				<IoIosArrowDown
					className={`-mr-1 ml-2 h-4 w-4 transition-transform duration-200 ${
						isOpen ? 'transform rotate-180' : ''
					}`}
					aria-hidden='true'
				/>
			</button>

			{/* Выпадающее меню */}
			{isOpen && (
				<div
					// Удаляем лишний класс 'menu-drawer-ignore' в десктопном режиме
					className={`absolute left-0 w-56 border-x-1 border-gray-300 bg-white z-30`}
				>
					<div
						role='menu'
						aria-orientation='vertical'
						aria-label='options-menu'
					>
						{sortOptions.map(option => (
							<button
								key={option.value}
								onClick={() => handleSortChange(option.value)}
								className={`block w-full text-left px-4 py-2 
                                 ${
																		currentSortValue === option.value
																			? 'bg-gray-100 text-gray-600 font-semibold'
																			: 'text-gray-400 border-b-1 border-b-gray-300 hover:bg-gray-100 hover:text-gray-600'
																	}
                                `}
								role='menuitem'
							>
								{option.label}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default Sorter
