'use client'

import React, { createContext, useState, ReactNode } from 'react'

interface SearchOverlayContextType {
	isSearchOpen: boolean
	setIsSearchOpen: (isOpen: boolean) => void
}

export const SearchOverlayContext = createContext<
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
