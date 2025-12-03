'use client'

import { useState, useRef, useEffect } from 'react'
import { City } from '@/lib/types/city'
import citiesData from '../../../../data/russian-cities.json'
import { formStyles } from '../../styles'

interface LocationSelectProps {
	value: string
	onChangeAction: (value: string) => void
}

const LocationSelect = ({ value, onChangeAction }: LocationSelectProps) => {
	const [inputValue, setInputValue] = useState(value)
	const [suggestions, setSuggestions] = useState<City[]>([])
	const [isListOpen, setIsListOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	// Обработчик изменения ввода
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value.trimStart()
		setInputValue(newValue)
		// Если поле пустое, скрываем список
		if (newValue.length === 0) {
			setIsListOpen(false)
			onChangeAction('')
		} else {
			setIsListOpen(true)
		}
	}

	// Фильтрация данных при изменении ввода
	useEffect(() => {
		if (inputValue.length > 0 && isListOpen) {
			const filtered = (citiesData as City[])
				.filter(
					city =>
						// Ищем совпадения в имени города или субъекте (без учета регистра)
						city.name.toLowerCase().includes(inputValue.toLowerCase()) ||
						city.subject.toLowerCase().includes(inputValue.toLowerCase())
				)
				.slice(0, 10) // Ограничиваем количество подсказок до 10
			setSuggestions(filtered)
		} else {
			setSuggestions([])
		}
	}, [inputValue, isListOpen])

	// Обработчик выбора элемента из списка
	const handleSelectSuggestion = (city: City) => {
		const displayValue = `${city.subject}, ${city.name}`
		setInputValue(displayValue)
		onChangeAction(displayValue) // Обновляем значение в родительской форме
		setIsListOpen(false) // Закрываем список
		setSuggestions([]) // Очищаем подсказки
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
		<div className='relative' ref={containerRef}>
			<label htmlFor='location' className={formStyles.label}>
				Место проживания
			</label>
			<input
				type='text'
				id='location'
				value={inputValue}
				onChange={handleInputChange}
				onFocus={() => setIsListOpen(true)}
				className={formStyles.input}
				autoComplete='off'
			/>
			{isListOpen && suggestions.length > 0 && (
				<ul className='absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg'>
					{suggestions.map((city, index) => (
						<li
							key={index}
							onClick={() => handleSelectSuggestion(city)}
							className='p-3 cursor-pointer hover:bg-gray-100 flex items-center'
						>
							<span>{city.name}</span>
							<span className='text-xs text-gray-500 ml-3'>{city.subject}</span>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default LocationSelect
