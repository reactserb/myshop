export const isPasswordValid = (val: string) => {
	return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(val)
}
