export const calculateFinalPrice = (price: number, discount: number): number =>
	price * ((100 - discount) / 100)
