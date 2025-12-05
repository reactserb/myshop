'use client'

import { SearchProduct } from '@/lib/types/searchProduct'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { GoSearch } from 'react-icons/go'
import HighlightText from '../HighlightText'
import { useRouter } from 'next/navigation'
import { FaArrowRightLong } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import MiniLoader from '../MiniLoader'
import useClickOutside from '@/hooks/useClickOutside'
import useEscapeKey from '@/hooks/useEscapeKey'

const InputSearchBlock = ({ handleClose }: { handleClose: () => void }) => {
	const inputRef = useRef<HTMLDivElement | null>(null)
	const [isOpen, setIsOpen] = useState(false)
	const [query, setQuery] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [searchProducts, setSearchProducts] = useState<SearchProduct[]>([])
	const router = useRouter()

	useEffect(() => {
		const fetchSearchData = async () => {
			if (query.length > 0) {
				try {
					setIsLoading(true)
					setError(null)
					const response = await fetch(`api/search?query=${query}`)
					const data = await response.json()
					setSearchProducts(data)
				} catch (error) {
					console.error('Не найден товар', error)
					setError('Не найден товар')
					setSearchProducts([])
				} finally {
					setIsLoading(false)
				}
			} else {
				setSearchProducts([])
				setError(null)
			}
		}
		const debounceTimer = setTimeout(fetchSearchData, 300)
		return () => clearTimeout(debounceTimer)
	}, [query])

	const handleCloseAnimation = () => {
		handleClose()
	}

	const handleInputFocus = () => setIsOpen(true)

	const resetSearch = () => {
		handleCloseAnimation()
		setQuery('')
	}

	const handleSearch = () => {
		if (query.trim()) {
			router.push(`/search?q=${encodeURIComponent(query)}`)
			handleCloseAnimation()
		}
	}

	useClickOutside(inputRef, handleCloseAnimation)

	useEscapeKey(handleCloseAnimation)

	return (
		<motion.div
			ref={inputRef}
			initial={{ y: '-100%', opacity: 0 }} // Изначальное состояние (скрыто сверху)
			animate={{ y: '0%', opacity: 1 }} // Состояние при появлении (видимо)
			exit={{ y: '-100%', opacity: 0 }} // Состояние при скрытии (уходит вверх)
			transition={{ duration: 0.3, ease: 'easeOut' }} // Плавный переход за 300ms
			className={`
				border-b-1 border-gray-200 shadow-[var(--shadow-thick)] fixed top-20 right-0 left-0 z-[1000] bg-white
				pt-10 pb-20 sm:pb-30 md:pb-40 px-5
			`}
		>
			<div className='relative max-w-[1408px] m-auto'>
				<form
					onSubmit={e => {
						e.preventDefault()
						handleSearch()
					}}
				>
					<div className='flex gap-2 items-center mb-5'>
						<input
							type='search'
							name='search'
							value={query}
							placeholder='Найти товар'
							spellCheck={false}
							autoComplete='off'
							onFocus={handleInputFocus}
							onChange={e => setQuery(e.target.value)}
							className='w-full bg-gray-100 h-10 p-2 rounded pl-10 focus:outline-none focus:text-black hover:bg-gray-200 leading-[150%]'
						/>
						{query.length > 0 && (
							<button
								type='submit'
								className='bg-black px-4 py-2 rounded text-white cursor-pointer'
							>
								Найти
							</button>
						)}
					</div>
					<GoSearch className='absolute top-2 left-2 text-xl opacity-75 cursor-default' />
				</form>

				{isOpen && (
					<div className='break-words max-h-[70vh] overflow-y-auto'>
						{error ? (
							<div className='p-4 text-red-500 text-center text-sm'>
								{error}
								<button
									onClick={() => {
										setError(null)
										setQuery('')
									}}
									className='text-blue-500 hover:text-blue-700 cursor-pointer'
								>
									Повторить
								</button>
							</div>
						) : isLoading ? (
							<div className='p-4 bg-white text-black flex justify-center items-center h-32'>
								<MiniLoader />
							</div>
						) : searchProducts.length > 0 ? (
							<>
								<ul className='p-2 flex flex-col gap-2 text-black'>
									{searchProducts.map(prod => (
										<li
											key={prod._id}
											className='flex items-center justify-between hover:bg-gray-100 p-1 rounded'
											onClick={resetSearch}
										>
											<Link
												prefetch={false}
												href={`/products/${prod.id}`}
												className='cursor-pointer flex gap-x-2 flex-grow'
											>
												<HighlightText
													text={prod.description}
													highlight={query}
												/>
												<HighlightText text={prod.title} highlight={query} />
											</Link>

											<Image
												src={prod.img}
												alt='Фото товара'
												width={72}
												height={72}
												className='ml-4 flex-shrink-0'
											/>
										</li>
									))}
								</ul>
								{searchProducts.length === 4 && (
									<div className='p-2 mt-2'>
										<button
											onClick={handleSearch}
											className='block w-full text-center bg-gray-100 hover:bg-gray-200 py-2 rounded text-black'
										>
											<span className='flex gap-x-2 p-2 items-center justify-center opacity-75'>
												Посмотреть все результаты поиска
												<FaArrowRightLong className='opacity-75' />
											</span>
										</button>
									</div>
								)}
							</>
						) : query.length > 0 ? (
							<div className='p-4'>Ничего не найдено</div>
						) : (
							<div className='p-4'>Введите поиск</div>
						)}
					</div>
				)}
			</div>
		</motion.div>
	)
}
export default InputSearchBlock
