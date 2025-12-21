import { formStyles } from '@/app/(auth)/styles'
import { DeliveryAddress as DeliveryAddressType } from '@/lib/types/order'
import citiesData from '../../../../data/russian-cities.json'
import { additionalStyles, labelStyles } from './style'
import { useEffect, useRef, useState } from 'react'
import { City } from '@/lib/types/city'

interface DeliveryAddressProps {
	formData: DeliveryAddressType
	onFormDataChange: (field: keyof DeliveryAddressType, value: string) => void
}

const DeliveryAddress = ({
	formData,
	onFormDataChange,
}: DeliveryAddressProps) => {
	const [suggestions, setSuggestions] = useState<City[]>([])
	const [isListOpen, setIsListOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	// Фильтрация данных при изменении ввода
	useEffect(() => {
		if (formData.city.length > 0 && isListOpen) {
			const filtered = (citiesData as City[])
				.filter(
					city =>
						// Ищем совпадения в имени города или субъекте (без учета регистра)
						city.name
							.toLowerCase()
							.includes(formData.city.trim().trim().toLowerCase()) ||
						city.subject
							.toLowerCase()
							.includes(formData.city.trim().toLowerCase())
				)
				.slice(0, 10) // Ограничиваем количество подсказок до 10
			setSuggestions(filtered)
		} else {
			setSuggestions([])
		}
	}, [formData.city, isListOpen])

	// Обработчик выбора элемента из списка
	const handleSelectSuggestion = (city: City) => {
		const displayValue = `${city.subject}, ${city.name}`

		onFormDataChange('city', displayValue)
		setIsListOpen(false)
		setSuggestions([])
	}

	// Закрываем список при клике вне компонента
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsListOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<>
			<h2 className='text-2xl xl:text-4xl font-bold mb-6'>Куда</h2>
			<div className='flex flex-col gap-y-4 xl:flex-row xl:flex-nowrap md:gap-x-8 xl:gap-x-10'>
				<div className='flex flex-col gap-y-4 md:flex-row md:w-full md:justify-between md:gap-x-8'>
					<div className='md:flex-1 ' ref={containerRef}>
						<label className={labelStyles}>Населенный пункт *</label>
						<input
							type='text'
							value={formData.city}
							onChange={e => onFormDataChange('city', e.target.value)}
							onFocus={() => setIsListOpen(true)}
							className={`${formStyles.input} ${additionalStyles}`}
							autoComplete='off'
						/>
						{isListOpen && suggestions.length > 0 && (
							<ul className='absolute z-10 min-w-[225px] bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg'>
								{suggestions.map((city, index) => (
									<li
										key={`${city.name}-${city.subject}-${index}`}
										onClick={e => {
											e.stopPropagation()
											handleSelectSuggestion(city)
										}}
										className='p-3 cursor-pointer hover:bg-gray-100 flex items-center'
									>
										<span>{city.name}</span>
										<span className='text-xs text-gray-500 ml-3'>
											{city.subject}
										</span>
									</li>
								))}
							</ul>
						)}
					</div>

					<div className='md:flex-1'>
						<label className={labelStyles}>Улица *</label>
						<input
							type='text'
							value={formData.street}
							onChange={e => onFormDataChange('street', e.target.value)}
							className={`${formStyles.input} ${additionalStyles}`}
							required
						/>
					</div>
				</div>

				<div className='flex flex-row gap-x-4 md:gap-x-8 xl:gap-x-10'>
					<div className='flex-1'>
						<label className={labelStyles}>Дом *</label>
						<input
							type='text'
							value={formData.house}
							onChange={e => onFormDataChange('house', e.target.value)}
							className={`${formStyles.input} ${additionalStyles} [&&]:min-w-[67px]`}
							required
						/>
					</div>

					<div className='flex-1'>
						<label className={labelStyles}>Квартира</label>
						<input
							type='text'
							value={formData.apartment}
							onChange={e => onFormDataChange('apartment', e.target.value)}
							className={`${formStyles.input} ${additionalStyles}`}
						/>
					</div>
				</div>
			</div>
			<div>
				<label className={labelStyles}>Дополнительно</label>
				<textarea
					value={formData.additional}
					onChange={e => onFormDataChange('additional', e.target.value)}
					className={`${formStyles.input} ${additionalStyles} min-h-32 max-h-32 md:resize-vertical md:h-12 md:min-h-[48px] md:max-h-32 md:cursor-ns-resize`}
					rows={1}
				/>
			</div>
		</>
	)
}

export default DeliveryAddress
