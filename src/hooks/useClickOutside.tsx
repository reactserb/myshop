'use client'

import { useEffect } from 'react'

function useClickOutside<T extends HTMLElement>(
	ref: React.RefObject<T | null>,
	callback: () => void
) {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [ref, callback])
}

export default useClickOutside
