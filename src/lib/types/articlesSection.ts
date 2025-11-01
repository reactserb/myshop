import { ArticleCardProps } from './article'

export interface ArticlesSectionProps {
	title: string
	viewAllButtons?: { btnText: string; href: string }
	articles: ArticleCardProps[]
	compact?: boolean
}
