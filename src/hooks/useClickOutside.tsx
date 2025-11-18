'use client'

import { useEffect } from 'react'

function useClickOutside<T extends HTMLElement>(
	ref: React.RefObject<T | null>,
	callback: () => void,
	exceptionSelector?: string
) {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node

			// 1. Проверяем, не является ли цель клика элементом для исключения
			if (exceptionSelector) {
				const closestException = (target as HTMLElement).closest(
					exceptionSelector
				)
				if (closestException) {
					return // Игнорируем клик, если он был внутри исключенного селектора
				}
			}

			// 2. Стандартная проверка: если клик вне основного рефа, вызываем колбэк
			if (ref.current && !ref.current.contains(target)) {
				callback()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [ref, callback, exceptionSelector])
}

export default useClickOutside
