import { SearchOverlayContext } from '@/components/header/context/SearchOverlayContext'
import { useContext } from 'react'

export const useSearchOverlay = () => {
	const context = useContext(SearchOverlayContext)
	if (context === undefined) {
		throw new Error(
			'useSearchOverlay must be used within a SearchOverlayProvider'
		)
	}
	return context
}
