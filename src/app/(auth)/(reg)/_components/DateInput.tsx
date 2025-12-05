'use client'

import { useState } from 'react'
import { formStyles } from '../../styles'
import Tooltip from '../../_components/Tooltip'
import { validateBirthDate } from '@/lib/utils/validation/validateBirthDate'
import { IoCalendarClearOutline } from 'react-icons/io5'

interface DateInputProps {
	value: string
	onChangeAction: (value: string) => void
}

const DateInput = ({ value, onChangeAction }: DateInputProps) => {
	const [showTooltip, setShowTooltip] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const formDate = (input: string): string => {
		const cleaned = input.replace(/\D/g, '')
		let formatted = ''
		if (cleaned.length > 0) formatted = cleaned.slice(0, 2)
		if (cleaned.length > 2) formatted += '.' + cleaned.slice(2, 4)
		if (cleaned.length > 4) formatted += '.' + cleaned.slice(4, 8)
		return formatted
	}
	const handleDateChange = (formattedDate: string) => {
		const validation = validateBirthDate(formattedDate)
		setError(validation.error || null)
		setShowTooltip(!!validation.error)
		onChangeAction(formattedDate)
	}
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = formDate(e.target.value)
		handleDateChange(formatted)
	}

	return (
		<div className='relative'>
			<label htmlFor='birthdayDate' className={formStyles.label}>
				Дата рождения
			</label>
			<div className='relative'>
				<input
					type='text'
					id='birthdayDate'
					value={value}
					onChange={handleInputChange}
					placeholder='дд.мм.гггг.'
					className={`${formStyles.input} pr-8`}
					maxLength={10}
					onFocus={() => setShowTooltip(true)}
					onBlur={() => setShowTooltip(false)}
				/>
			</div>
			{showTooltip && error && <Tooltip text={error} />}
		</div>
	)
}
export default DateInput
