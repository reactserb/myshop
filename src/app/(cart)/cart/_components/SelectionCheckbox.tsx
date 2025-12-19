'use client'

import { memo } from 'react'
import SelectedIcon from './SelectdIcon'

interface SelectionCheckboxProps {
	isSelected: boolean
	onSelectionChange: (
		productId: string,
		size: string,
		isSelected: boolean
	) => void
	productId: string
	size: string
}

const SelectionCheckbox = memo(function SelectionCheckbox({
	isSelected,
	onSelectionChange,
	productId,
	size,
}: SelectionCheckboxProps) {
	return (
		<label className='flex items-center cursor-pointer z-50'>
			<input
				type='checkbox'
				checked={isSelected}
				onChange={e => onSelectionChange(productId, size, e.target.checked)}
				className='hidden'
			/>
			<span
				className={`
          w-6 h-6 border-2 rounded flex items-center justify-center duration-300
          ${isSelected ? 'bg-gray-400 border-gray-400' : 'bg-white border-gray-400'}
        `}
			>
				{isSelected && <SelectedIcon />}
			</span>
		</label>
	)
})

export default SelectionCheckbox
