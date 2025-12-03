'use client'

import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import { formStyles } from '../styles'
import Tooltip from './Tooltip'
import { isPasswordValid } from '@/lib/utils/validation/passwordValid'

interface PasswordInputProps {
	id: string
	label: string
	value: string
	onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void
	showPassword: boolean
	togglePasswordVisibilityAction: () => void
	showRequirements?: boolean
	compareWith?: string
	isComparisonAllowed?: boolean
	inputClass?: string
}

const PasswordInput = ({
	id,
	label,
	value,
	onChangeAction,
	showPassword,
	togglePasswordVisibilityAction,
	showRequirements,
	compareWith,
	isComparisonAllowed = true,
	inputClass = '',
}: PasswordInputProps) => {
	const shouldShowTooltip = () => {
		if (showRequirements) {
			return value.length > 0 && !isPasswordValid(value)
		}

		if (compareWith) {
			return (
				isComparisonAllowed &&
				value.length > 0 &&
				compareWith.length > 0 &&
				value !== compareWith
			)
		}

		return false
	}

	const getTooltipText = () => {
		if (showRequirements) {
			return 'Пароль должен содержать: 8+ символов на латинице и цифры'
		}

		return 'Пароли пока не совпадают'
	}

	return (
		<div className='relative'>
			<label htmlFor={id} className={formStyles.label}>
				{label}
			</label>
			<div className='relative'>
				<input
					id={id}
					type={showPassword ? 'text' : 'password'}
					value={value}
					onChange={onChangeAction}
					className={`${formStyles.input} ${inputClass}`}
					autoComplete='off'
					readOnly
					onFocus={e => e.target.removeAttribute('readonly')}
				/>
				<button
					type='button'
					onClick={togglePasswordVisibilityAction}
					className='absolute text-xl right-3 top-1/2 transform -translate-y-1/2'
				>
					{showPassword ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
				</button>
			</div>
			{shouldShowTooltip() && <Tooltip text={getTooltipText()} />}
		</div>
	)
}
export default PasswordInput
