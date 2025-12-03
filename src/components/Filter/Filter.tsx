'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CONFIG } from '../../../config/config'
import { FilterProps, PriceRange } from '@/lib/types/priceTypes'
import ErrorComponent from '../ErrorComponent'
import MiniLoader from '../MiniLoader'
import {
	FilterProductSize,
	FilterProductSizeArray,
} from '@/lib/types/sizeOptions'
import { FilterProductBrand, FilterProductBrandArray } from '@/lib/types/brand'
import PriceFilterHeader from './PriceFilterHeader'
import FilterHeader from './FilterHeader'
import FilterPriceInputs from './FilterPriceInputs'
import FilterSlider from './FilterSlider'
import FilterSizeHeader from './FilterSizeHeader'
import FilterBrandHeader from './FilterBrandHeader'

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
			<FilterHeader
				isFilterBrandActive={isFilterBrandActive}
				isFilterPriceActive={isFilterPriceActive}
				isFilterSizeActive={isFilterSizeActive}
				onCloseMenu={onCloseMenu}
				basePath={basePath}
			/>
			<PriceFilterHeader
				isFilterPriceActive={isFilterPriceActive}
				resetPriceFilter={resetPriceFilter}
			/>
			<FilterPriceInputs
				priceRange={priceRange}
				inputValues={inputValues}
				handleInputChange={handleInputChange}
			/>
			<FilterSlider
				priceRange={priceRange}
				sliderValues={sliderValues}
				handleSliderChange={handleSliderChange}
			/>
			<FilterSizeHeader
				isFilterSizeActive={isFilterSizeActive}
				toggleSize={toggleSize}
				isSizeOpen={isSizeOpen}
				resetSizeFilter={resetSizeFilter}
				sortedSizes={sortedSizes}
				selectedSizes={selectedSizes}
				handleSizeChange={handleSizeChange}
			/>
			<FilterBrandHeader
				toggleBrand={toggleBrand}
				isBrandOpen={isBrandOpen}
				isFilterBrandActive={isFilterBrandActive}
				resetBrandFilter={resetBrandFilter}
				sortedBrands={sortedBrands}
				selectedBrands={selectedBrands}
				handleBrandChange={handleBrandChange}
			/>
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
