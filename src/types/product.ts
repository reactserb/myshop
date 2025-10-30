export interface ProductCardProps {
	_id: number
	img: string
	title: string
	description: string
	basePrice: number
	discountPercent: number
	sizes: string[] | number[]
}
