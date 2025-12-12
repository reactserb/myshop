export interface AddProductFormData {
	title: string
	description: string
	basePrice: string
	discountPercent: string
	article: string
	brand: string
	sizes: string[]
	categories: string[]
}

export interface AddProductApiResponse {
	success: boolean
	product?: {
		_id: string
		id: number
		img: string
		title: string
	}
	error?: string
}

export interface ImageUploadResponse {
	success: boolean
	product?: {
		id: number
		img: string
		filename: string
	}
	error?: string
}
