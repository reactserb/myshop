import { getDB } from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'
import { CONFIG } from '../../../../config/config'

export async function GET(request: Request) {
	try {
		const db = await getDB()
		const url = new URL(request.url)

		const articlesLimit = url.searchParams.get('articlesLimit')
		const startId = parseInt(url.searchParams.get('startIndex') || '0')
		const perPage = parseInt(
			url.searchParams.get('perPage') ||
				CONFIG.ITEMS_PER_PAGE_MAIN_ARTICLES.toString()
		)

		if (articlesLimit) {
			const limit = parseInt(articlesLimit)

			const articles = await db
				.collection('articles')
				.find()
				.sort({ createdAt: -1 })
				.limit(limit)
				.toArray()

			return NextResponse.json(articles)
		}

		const totalCount = await db.collection('articles').countDocuments()

		const articles = await db
			.collection('articles')
			.find()
			.sort({ createdAt: -1 })
			.skip(startId)
			.limit(perPage)
			.toArray()

		return NextResponse.json({ articles, totalCount })
	} catch (error) {
		console.error('Error fetching articles:', error)

		return NextResponse.json(
			{ message: 'Error to fetch articles' },
			{ status: 500 }
		)
	}
}
