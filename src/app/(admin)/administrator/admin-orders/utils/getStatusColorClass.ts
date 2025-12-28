export const getStatusColorClass = (
	statusLabel: string,
	isSelected: boolean = false
): string => {
	switch (statusLabel) {
		case 'Новый':
		case 'Доставляется':
			return isSelected ? 'bg-[#f3f2f1]' : 'text-[#414141]'
		case 'Собран':
			return isSelected ? 'bg-primary' : 'text-primary'
		case 'Подтвержден':
			return isSelected ? 'bg-[#008c49]' : 'text-[#008c49]'
		case 'Не подтвержден':
			return isSelected ? 'bg-[#fca21c]' : 'text-[#fca21c]'
		case 'Возврат':
			return isSelected ? 'bg-[#d80000]' : 'text-[#d80000]'
		default:
			return isSelected ? 'bg-[#f3f2f1]' : 'text-[#414141]'
	}
}
