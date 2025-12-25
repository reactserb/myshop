import { ProductCardProps } from './product'

export interface ProductsSectionProps {
	title?: string
	viewAllButtons?: { btnText: string; href: string }
	products: ProductCardProps[]
	compact?: boolean
	favorites?: boolean
	isOrderPage?: boolean
	applyIndexStyles?: boolean
}
