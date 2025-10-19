'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useClickOutside } from '@/hooks/useClickOutside'
import InputBlock from './InputBlock'
import { useEffect } from 'react'

interface SearchWrapperProps {
	isSearchVisible: boolean
}

export const SearchWrapper: React.FC<SearchWrapperProps> = ({
	isSearchVisible,
}) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const closeSearch = () => {
		const newSearchParams = new URLSearchParams(searchParams.toString())
		newSearchParams.delete('showSearch')
		router.replace(`?${newSearchParams.toString()}`, { scroll: false })
	}

	const searchRef = useClickOutside<HTMLDivElement>(() => {
		if (isSearchVisible) {
			closeSearch()
		}
	})

	// Блок с useEffect для обработки клавиши Escape
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isSearchVisible) {
				closeSearch()
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [isSearchVisible, closeSearch]) // Добавляем зависимости

	return (
		<div
			ref={searchRef}
			className={`border-b-1 border-gray-200 shadow-[var(--shadow-thick)] fixed top-0 right-0 left-0 z-10000 bg-white mt-20 pt-10 pb-20 sm:pb-30 md:pb-40 px-5 transition-all duration-300 ease-in ${
				isSearchVisible
					? 'opacity-100 visible translate-y-0'
					: 'opacity-0 invisible -translate-y-full'
			}`}
		>
			<InputBlock />
		</div>
	)
}
