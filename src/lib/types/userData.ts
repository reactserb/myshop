export type UserRole = 'user' | 'admin' | 'manager'

export interface UserData {
	id: string
	name: string
	surname: string
	email: string
	phoneNumber: string
	role: UserRole
	birthdayDate: string
	location: string
	gender: string
	createdAt: string
	updatedAt: string
	emailVerified: boolean
	phoneNumberVerified: boolean
}
