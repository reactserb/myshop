export const getEnglishStatuses = (russianStatus: string) => {
	switch (russianStatus) {
		case 'Подтвержден':
			return { status: 'confirmed', paymentStatus: 'paid' }
		case 'Не подтвержден':
			return { status: 'cancelled', paymentStatus: 'failed' }
		case 'Новый':
			return { status: 'pending', paymentStatus: 'waiting' }
		case 'Не оплачен':
			return { status: 'pending', paymentStatus: 'failed' }
	}

	// Базовые статусы (не влияют на paymentStatus)
	const statusMap: { [key: string]: string } = {
		Новый: 'pending',
		Возврат: 'refund',
		Отправлен: 'delivering',
		Подтвержден: 'confirmed',
		Доставлен: 'delivered',
		'Не подтвержден': 'cancelled',
	}

	return { status: statusMap[russianStatus] || 'pending' }
}
