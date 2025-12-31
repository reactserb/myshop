import ErrorComponent from '@/components/ErrorComponent'
import { ArticleCardProps } from '@/lib/types/article'
import ArticlePageContent from './ArticlePageContent'
import { getArticle } from './getArticle'
import { Metadata } from 'next'

export async function generateMetadata({
	params,
	searchParams,
}: PageProps): Promise<Metadata> {
	const { id } = await params
	try {
		const article = await getArticle(id)

		return {
			title: `${article.title}`,
			description: `Читайте ${article.title}`,
			openGraph: {
				title: article.title,
				description: `Читайте статью: ${article.title}`,
				images: article.img ? [article.img[0]] : [],
			},
		}
	} catch {
		const sp = await searchParams
		const fallbackTitleRaw = sp.desc ?? `Статья № ${id}`
		const articleTitle = decodeURIComponent(String(fallbackTitleRaw))

		return {
			title: articleTitle,
			description: `Читайте ${articleTitle}.`,
			openGraph: {
				title: articleTitle,
				description: `Читайте ${articleTitle}.`,
				images: [],
			},
		}
	}
}

interface PageProps {
	params: Promise<{ id: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const ArticlePage = async ({ params }: PageProps) => {
	let article: ArticleCardProps
	const articleId = (await params).id

	try {
		article = await getArticle(articleId)
	} catch (error) {
		return (
			<ErrorComponent
				error={error instanceof Error ? error : new Error(String(error))}
				userMessage='Не удалось загрузить статью'
			/>
		)
	}

	if (!article) {
		return (
			<ErrorComponent
				error={new Error('Статья не найдена')}
				userMessage='Статья не найдена'
			/>
		)
	}

	return <ArticlePageContent article={article} />
}

export default ArticlePage
