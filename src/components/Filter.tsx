'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CONFIG } from '../../config/config'
import { FilterProps, PriceRange } from '@/lib/types/priceTypes'
import ErrorComponent from './ErrorComponent'
import MiniLoader from './MiniLoader'
import { formatPriceWithSpaces } from '@/lib/utils/price/formatPriceWithSpaces'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import {
	FilterProductSize,
	FilterProductSizeArray,
} from '@/lib/types/sizeOptions'
import { FilterProductBrand, FilterProductBrandArray } from '@/lib/types/brand'
import Link from 'next/link'
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from 'react-icons/io'
import { IoFilter } from 'react-icons/io5'

const Filter = ({ basePath, brandName, onCloseMenu, compact }: FilterProps) => {
	const searchParams = useSearchParams()

	const urlPriceFrom = searchParams.get('priceFrom')
		? parseInt(searchParams.get('priceFrom')!)
		: null

	const urlPriceTo = searchParams.get('priceTo')
		? parseInt(searchParams.get('priceTo')!)
		: null

	const router = useRouter()

	const [inputValues, setInputValues] = useState({
		from: urlPriceFrom,

		to: urlPriceTo,
	})

	const [priceRange, setPriceRange] = useState<PriceRange>(
		CONFIG.FALLBACK_PRICE_RANGE
	)

	const getInitialSizesFromUrl = useCallback(() => {
		return searchParams.getAll('sizes')
	}, [searchParams])

	const urlSizes = getInitialSizesFromUrl()

	const getInitialBrandsFromUrl = useCallback(() => {
		return searchParams.getAll('brands')
	}, [searchParams])

	const urlBrands = getInitialBrandsFromUrl()

	const [sizes, setSizes] = useState<FilterProductSizeArray>([])

	const [selectedSizes, setSelectedSizes] =
		useState<FilterProductSizeArray>(urlSizes)

	const [brands, setBrands] = useState<FilterProductBrandArray>([])

	const [selectedBrands, setSelectedBrands] =
		useState<FilterProductSizeArray>(urlBrands)

	const [isSizeOpen, setIsSizeOpen] = useState(false)

	const [isBrandOpen, setIsBrandOpen] = useState(false)

	const [error, setError] = useState<{
		error: Error

		userMessage: string
	} | null>(null)

	const [isLoading, setIsLoading] = useState(true)

	const sortedSizes = useMemo(() => {
		const sizesCopy = [...sizes]

		const selectedSizesSet = new Set(urlSizes)

		sizesCopy.sort((a, b) => {
			const aIsSelected = selectedSizesSet.has(a)

			const bIsSelected = selectedSizesSet.has(b)

			if (aIsSelected === bIsSelected) {
				return String(a).localeCompare(String(b), undefined, {
					numeric: true,

					sensitivity: 'base',
				})
			}

			if (aIsSelected && !bIsSelected) {
				return -1
			}

			if (bIsSelected && !aIsSelected) {
				return 1
			}

			return 0
		})

		return sizesCopy
	}, [sizes, urlSizes])

	const sortedBrands = useMemo(() => {
		const brandsCopy = [...brands]

		const selectedBrandsSet = new Set(urlBrands)

		brandsCopy.sort((a, b) => {
			const aIsSelected = selectedBrandsSet.has(a)

			const bIsSelected = selectedBrandsSet.has(b)

			if (aIsSelected === bIsSelected) {
				return String(a).localeCompare(String(b), undefined, {
					numeric: true,

					sensitivity: 'base',
				})
			}

			if (aIsSelected && !bIsSelected) {
				return -1
			}

			if (bIsSelected && !aIsSelected) {
				return 1
			}

			return 0
		})

		return brandsCopy
	}, [brands, urlBrands])

	const fetchData = useCallback(async () => {
		if (
			priceRange.min !== CONFIG.FALLBACK_PRICE_RANGE.min &&
			priceRange.max !== CONFIG.FALLBACK_PRICE_RANGE.max
		) {
			return
		}

		setIsLoading(true)

		setError(null)

		try {
			const params = new URLSearchParams()

			if (brandName) {
				params.set('brandName', brandName)
			} else {
				params.set('category', basePath)
			}

			params.set('getDataOnly', 'true')

			const response = await fetch(`/api/filter?${params.toString()}`)

			const data = await response.json()

			const receivedRange = data.priceRange || CONFIG.FALLBACK_PRICE_RANGE

			setSizes(data.sizes)

			setBrands(data.brands)

			setPriceRange({
				min: Math.floor(parseInt(receivedRange.min)),

				max: Math.ceil(parseInt(receivedRange.max)),
			})

			setInputValues({
				from: urlPriceFrom || receivedRange.min,

				to: urlPriceTo || receivedRange.max,
			})
		} catch (error) {
			setError({
				error: error instanceof Error ? error : new Error('Неизвестная ошибка'),

				userMessage: 'Ошибка: не удалось загрузить результаты фильтрации',
			})

			setPriceRange(CONFIG.FALLBACK_PRICE_RANGE)

			setInputValues({
				from: CONFIG.FALLBACK_PRICE_RANGE.min,

				to: CONFIG.FALLBACK_PRICE_RANGE.max,
			})
		} finally {
			setIsLoading(false)
		}
	}, [
		urlPriceFrom,

		urlPriceTo,

		basePath,

		brandName,

		priceRange.min,

		priceRange.max,
	])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	// Для сброса выбранных позиций после общего сброса:

	useEffect(() => {
		const newPriceFromUrl = searchParams.get('priceFrom')

		const newPriceToUrl = searchParams.get('priceTo')

		const newFromValue = newPriceFromUrl ? parseInt(newPriceFromUrl) : null

		const newToValue = newPriceToUrl ? parseInt(newPriceToUrl) : null

		setInputValues(prevInputValues => {
			if (
				newFromValue !== prevInputValues.from ||
				newToValue !== prevInputValues.to
			) {
				return { from: newFromValue, to: newToValue }
			}

			return prevInputValues
		})

		const newUrlSizes = searchParams.getAll('sizes')

		setSelectedSizes(prevSelectedSizes => {
			if (JSON.stringify(newUrlSizes) !== JSON.stringify(prevSelectedSizes)) {
				return newUrlSizes
			}

			return prevSelectedSizes
		})

		const newUrlBrands = searchParams.getAll('brands')

		setSelectedBrands(prevSelectedBrands => {
			if (JSON.stringify(newUrlBrands) !== JSON.stringify(prevSelectedBrands)) {
				return newUrlBrands
			}

			return prevSelectedBrands
		})
	}, [searchParams, setInputValues, setSelectedSizes, setSelectedBrands])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		applyFilter()
	}

	const applyFilter = useCallback(() => {
		const params = new URLSearchParams(searchParams.toString())

		let fromValue = Math.max(priceRange.min, inputValues.from || priceRange.min)

		let toValue = Math.min(priceRange.max, inputValues.to || priceRange.max)

		if (fromValue > toValue) [fromValue, toValue] = [toValue, fromValue]

		params.delete('page')

		const isDefaultFrom = fromValue === priceRange.min

		const isDefaultTo = toValue === priceRange.max

		if (isDefaultFrom && isDefaultTo) {
			params.delete('priceFrom')

			params.delete('priceTo')
		} else {
			params.set('priceFrom', fromValue.toString())

			params.set('priceTo', toValue.toString())
		}

		params.delete('sizes')

		params.delete('brands')

		selectedSizes.forEach(size => {
			params.append('sizes', size.toString())
		})

		selectedBrands.forEach(brand => {
			params.append('brands', brand.toString())
		})

		router.push(`${basePath}?${params.toString()}`)

		if (onCloseMenu) {
			onCloseMenu()
		}
	}, [
		inputValues,

		priceRange,

		searchParams,

		router,

		basePath,

		selectedSizes,

		selectedBrands,

		onCloseMenu,
	])

	const sliderValues = [
		inputValues.from || priceRange.min,

		inputValues.to || priceRange.max,
	]

	const handleSliderChange = (values: number | number[]) => {
		if (Array.isArray(values)) {
			setInputValues({
				from: values[0],

				to: values[1],
			})
		}
	}

	const toggleSize = useCallback(() => {
		setIsSizeOpen(prev => !prev)
	}, [])

	const toggleBrand = useCallback(() => {
		setIsBrandOpen(prev => !prev)
	}, [])

	const resetPriceFilter = useCallback(() => {
		setInputValues({
			from: priceRange.min,

			to: priceRange.max,
		})

		const params = new URLSearchParams(searchParams.toString())

		params.delete('priceFrom')

		params.delete('priceTo')

		params.delete('page')

		router.push(`${basePath}?${params.toString()}`)
	}, [setInputValues, priceRange, searchParams, basePath, router])

	const resetSizeFilter = useCallback(() => {
		setSelectedSizes([])

		setIsSizeOpen(false)

		const params = new URLSearchParams(searchParams.toString())

		params.delete('sizes')

		params.delete('page')

		router.push(`${basePath}?${params.toString()}`)
	}, [setSelectedSizes, searchParams, basePath, router])

	const resetBrandFilter = useCallback(() => {
		setSelectedBrands([])

		setIsBrandOpen(false)

		const params = new URLSearchParams(searchParams.toString())

		params.delete('brands')

		params.delete('page')

		router.push(`${basePath}?${params.toString()}`)
	}, [setSelectedBrands, searchParams, basePath, router])

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target

			const cleanValue = value.replace(/\D/g, '')

			const numericValue = cleanValue === '' ? null : parseInt(cleanValue, 10)

			setInputValues(prev => ({ ...prev, [name]: numericValue }))
		},

		[]
	)

	const handleSizeChange = useCallback(
		(size: FilterProductSize, isChecked: boolean) => {
			setSelectedSizes(prevSelected => {
				if (isChecked) {
					if (!prevSelected.includes(size)) {
						return [...prevSelected, size]
					}
				} else {
					return prevSelected.filter(item => item !== size)
				}

				return prevSelected
			})
		},

		[]
	)

	const handleBrandChange = useCallback(
		(brand: FilterProductBrand, isChecked: boolean) => {
			setSelectedBrands(prevSelected => {
				if (isChecked) {
					if (!prevSelected.includes(brand)) {
						return [...prevSelected, brand]
					}
				} else {
					return prevSelected.filter(item => item !== brand)
				}

				return prevSelected
			})
		},

		[]
	)

	const isFilterPriceActive =
		searchParams.has('priceFrom') || searchParams.has('priceTo')

	const isFilterSizeActive = searchParams.has('sizes')

	const isFilterBrandActive = searchParams.has('brands')

	if (isLoading) {
		return <MiniLoader />
	}

	if (error) {
		return (
			<ErrorComponent error={error.error} userMessage={error.userMessage} />
		)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={`flex flex-col gap-y-10 max-w-[220px] ${
				compact ? 'mt-10' : ''
			}`}
		>
			<div>
				{isFilterBrandActive || isFilterPriceActive || isFilterSizeActive ? (
					<Link href={`${basePath}`} onClick={onCloseMenu}>
						<div className='flex gap-x-2 items-center group'>
							<IoMdClose className='text-3xl bg-gray-200 p-1 rounded-2xl group-hover:opacity-50' />

							<span className='group-hover:opacity-50 pt-1'>
								Сбросить фильтр
							</span>
						</div>
					</Link>
				) : (
					<div className='flex items-center gap-x-2 text-md'>
						<IoFilter className='text-xl' />

						<span>Фильтр</span>
					</div>
				)}
			</div>

			<div className='flex justify-between items-center'>
				<p className='text-base'>Цена</p>

				{isFilterPriceActive && (
					<button
						type='button'
						onClick={resetPriceFilter}
						className='text-sm opacity-50 hover:opacity-100 cursor-pointer'
					>
						Сбросить
					</button>
				)}
			</div>

			<div className='flex gap-x-2 items-center justify-between'>
				<div className='flex flex-col justify-between'>
					<span className='opacity-50 text-sm'>От</span>

					<div className='flex items-center gap-x-1'>
						<span className='opacity-50 text-base'>₽</span>

						<input
							type='text'
							name='from'
							value={
								inputValues.from !== null
									? formatPriceWithSpaces(inputValues.from)
									: ''
							}
							placeholder={`${formatPriceWithSpaces(priceRange.min)}`}
							onChange={handleInputChange}
							className='h-10 w-[85px] opacity-75 outline-none'
						/>
					</div>
				</div>

				<div className='flex flex-col justify-between'>
					<span className='opacity-50 text-sm'>До</span>

					<div className='flex items-center gap-x-1'>
						<span className='opacity-50 text-base'>₽</span>

						<input
							type='text'
							name='to'
							value={
								inputValues.to !== null
									? formatPriceWithSpaces(inputValues.to)
									: ''
							}
							placeholder={`${formatPriceWithSpaces(priceRange.max)}`}
							onChange={handleInputChange}
							className='h-10 w-[85px] opacity-75 outline-none'
						/>
					</div>
				</div>
			</div>

			<div className='w-[200px] px-2 mx-auto'>
				<Slider
					range
					min={priceRange.min}
					max={priceRange.max}
					value={sliderValues}
					onChange={handleSliderChange}
					styles={{
						track: { backgroundColor: '#000' },

						handle: {
							backgroundColor: '#000',

							opacity: '100%',

							borderRadius: '35%',

							border: '4px solid #fff',

							width: 20,

							height: 20,

							cursor: 'pointer',

							marginTop: -8,

							boxShadow: 'none',
						},

						rail: { backgroundColor: '#000', opacity: '25%' },
					}}
				/>
			</div>

			<div
				className='flex justify-between items-center cursor-pointer'
				onClick={toggleSize}
			>
				<div className='flex items-center gap-x-1'>
					<p className='text-base'>Размер</p>

					<span className='transition-transform duration-300'>
						{isSizeOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
					</span>
				</div>

				{isFilterSizeActive && (
					<button
						type='button'
						onClick={e => {
							e.stopPropagation()

							resetSizeFilter()
						}}
						className='text-sm opacity-50 hover:opacity-100 cursor-pointer'
					>
						Сбросить
					</button>
				)}
			</div>

			{isSizeOpen && (
				<div className='max-h-[200px] overflow-y-auto pr-2'>
					<ul className='space-y-3'>
						{sortedSizes.map(size => (
							<li key={size}>
								<label className='flex items-center space-x-3 cursor-pointer'>
									<input
										type='checkbox'
										className='h-5 w-5 rounded border-gray-300 accent-black'
										checked={selectedSizes.includes(size)}
										onChange={e => handleSizeChange(size, e.target.checked)}
									/>

									<span className='text-gray-700'>
										{typeof size === 'string' ? size.toUpperCase() : size}
									</span>
								</label>
							</li>
						))}
					</ul>
				</div>
			)}

			<div
				className='flex justify-between items-center cursor-pointer'
				onClick={toggleBrand}
			>
				<div className='flex items-center gap-x-1'>
					<p className='text-base'>Бренд</p>

					<span className='transition-transform duration-300'>
						{isBrandOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
					</span>
				</div>

				{isFilterBrandActive && (
					<button
						type='button'
						onClick={e => {
							e.stopPropagation()

							resetBrandFilter()
						}}
						className='text-sm opacity-50 hover:opacity-100 cursor-pointer'
					>
						Сбросить
					</button>
				)}
			</div>

			{isBrandOpen && (
				<div className='max-h-[200px] overflow-y-auto pr-2'>
					<ul className='space-y-3'>
						{sortedBrands.map(brand => (
							<li key={brand}>
								<label className='flex items-center space-x-3 cursor-pointer'>
									<input
										type='checkbox'
										className='h-5 w-5 rounded border-gray-300 accent-black'
										checked={selectedBrands.includes(brand)}
										onChange={e => handleBrandChange(brand, e.target.checked)}
									/>

									<span className='text-gray-700'>{brand}</span>
								</label>
							</li>
						))}
					</ul>
				</div>
			)}

			<button
				type='submit'
				className='cursor-pointer bg-gray-200 hover:bg-gray-300 text-sm rounded-sm p-2'
			>
				Применить
			</button>
		</form>
	)
}

export default Filter
