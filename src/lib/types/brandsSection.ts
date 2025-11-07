import { BrandProps } from './brand'

export interface BrandsSectionProps {
	title: string
	viewAllButtons?: { btnText: string; href: string }
	brands: BrandProps[]
	compact?: boolean
}
