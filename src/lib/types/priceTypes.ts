export interface FilterProps {
	basePath: string
	brandName?: string
	onCloseMenu?: () => void
	compact?: boolean
}

export interface SortProps {
	basePath: string
	onCloseMenu?: () => void
	compact?: boolean
}

export interface PriceRange {
	min: number
	max: number
}
