'use client'

import { PaginationProps } from '@/types/paginationProps'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md'

const createdPageURL = (
	basePath: string,
	params: URLSearchParams,
	page: number
) => {
	const newParams = new URLSearchParams(params)
	newParams.set('page', page.toString())

	return `${basePath}?${newParams.toString()}`
}

const getVisiblePages = (totalPages: number, currentPage: number) => {
	if (totalPages <= 5) {
		return Array.from({ length: totalPages }, (_, i) => i + 1)
	}

	let start = Math.max(1, currentPage - 2)
	let end = Math.min(totalPages, currentPage + 2)

	if (currentPage <= 3) {
		end = 5
	} else if (currentPage >= totalPages - 2) {
		start = totalPages - 4
	}

	const pages: (number | string)[] = []

	for (let i = start; i <= end; i++) {
		pages.push(i)
	}

	return pages
}

const Pagination = ({
	totalItems,
	currentPage,
	basePath,
	itemsPerPage,
	searchQuery,
}: PaginationProps) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage)
	const params = new URLSearchParams(searchQuery)

	const visiblePages = getVisiblePages(totalPages, currentPage)

	const buttonSize =
		'w-7 h-7 text-xs sm:text-base sm:w-10 md:h-10 flex items-center justify-center rounded duration-300'
	const buttonActive = 'bg-gray-200 hover:bg-gray-300'
	const buttonFocus = 'bg-gray-700 text-white'
	const buttonDisabled = 'opacity-0 cursor-default'

	return (
		<div className='flex flex-1 justify-center mt-8 mb-12'>
			<nav className='flex flex-wrap gap-2 md:gap-4 items-center'>
				<Link
					href={createdPageURL(basePath, params, 1)}
					className={`${buttonSize} ${
						currentPage === 1 ? buttonDisabled : buttonActive
					}`}
				>
					<MdKeyboardDoubleArrowLeft />
				</Link>
				<Link
					href={createdPageURL(basePath, params, currentPage - 1)}
					className={`${buttonSize} ${
						currentPage === 1 ? buttonDisabled : buttonActive
					}`}
				>
					<MdKeyboardArrowLeft />
				</Link>
				{visiblePages.map(page => {
					return (
						<Link
							key={page}
							href={createdPageURL(basePath, params, page as number)}
							className={`${buttonSize} ${buttonActive} ${
								page === currentPage ? buttonFocus : ''
							}`}
						>
							{page}
						</Link>
					)
				})}
				<Link
					href={createdPageURL(basePath, params, currentPage + 1)}
					className={`${buttonSize} ${
						currentPage === totalPages ? buttonDisabled : buttonActive
					}`}
				>
					<MdKeyboardArrowRight />
				</Link>
				<Link
					href={createdPageURL(basePath, params, totalPages)}
					className={`${buttonSize} ${
						currentPage === totalPages ? buttonDisabled : buttonActive
					}`}
				>
					<MdKeyboardDoubleArrowRight />
				</Link>
			</nav>
		</div>
	)
}
export default Pagination
