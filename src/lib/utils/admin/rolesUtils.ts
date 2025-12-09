import { UserRole } from '@/lib/types/userData'

export const getRoleStyles = (role: UserRole) => {
	switch (role) {
		case 'admin':
			return 'bg-red-100 text-red-600'
		case 'manager':
			return 'bg-green-100 text-green-600'
		default:
			return 'bg-gray-100 text-gray-600'
	}
}

export const getRoleLabel = (role: UserRole) => {
	switch (role) {
		case 'admin':
			return 'Администратор'
		case 'manager':
			return 'Менеджер'
		default:
			return 'Пользователь'
	}
}
