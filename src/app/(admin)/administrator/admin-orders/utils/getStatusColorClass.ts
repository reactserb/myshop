export const getStatusColorClass = (
	statusLabel: string,
	isSelected: boolean = false
): string => {
	switch (statusLabel) {
		case 'Новый':
		case 'Доставляется':
			return isSelected ? 'bg-[#f3f2f1]' : 'text-[#414141]'
		case 'Подтвержден':
			return isSelected ? 'bg-[#008c49]' : 'text-[#008c49]'
		case 'Не подтвержден':
			return isSelected ? 'bg-[#fca21c]' : 'text-[#fca21c]'
		case 'Не оплачен':
			return isSelected ? 'bg-[#d80000]' : 'text-[#d80000]'
		case 'Возврат':
			return isSelected ? 'bg-[#d80000]' : 'text-[#d80000]'
		default:
			return isSelected ? 'bg-[#f3f2f1]' : 'text-[#414141]'
	}
}
