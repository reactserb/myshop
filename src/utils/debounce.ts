export function debounce<F extends (...args: unknown[]) => unknown>(
	fn: F,
	delay: number
): (...args: Parameters<F>) => void {
	let timeout: number
	return function (...args: Parameters<F>) {
		window.clearInterval(timeout)
		timeout = window.setTimeout(() => fn(...args), delay)
	}
}
