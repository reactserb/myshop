'use client'

import React, { createContext, useState, ReactNode, useContext } from 'react'

interface SearchOverlayContextType {
	isSearchOpen: boolean
	setIsSearchOpen: (isOpen: boolean) => void
}

const SearchOverlayContext = createContext<
	SearchOverlayContextType | undefined
>(undefined)

export const SearchOverlayProvider = ({
	children,
}: {
	children: ReactNode
}) => {
	const [isSearchOpen, setIsSearchOpen] = useState(false)

	return (
		<SearchOverlayContext.Provider value={{ isSearchOpen, setIsSearchOpen }}>
			{children}
		</SearchOverlayContext.Provider>
	)
}

export const useSearchOverlay = () => {
	const context = useContext(SearchOverlayContext)
	if (context === undefined) {
		throw new Error(
			'useSearchOverlay must be used within a SearchOverlayProvider'
		)
	}
	return context
}
