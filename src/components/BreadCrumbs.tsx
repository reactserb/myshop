'use client'

import { TRANSLATIONS } from '@/lib/utils/translations'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BreadCrumbs = () => {
	const pathname = usePathname()

	if (pathname === '/' || pathname === '/search') return null

	const pathSegments = pathname.split('/').filter(segment => segment !== '')

	const breadcrumbs = pathSegments.map((seg, index) => {
		const href = '/' + pathSegments.slice(0, index + 1)
		return {
			label: TRANSLATIONS[seg] || seg,
			href,
			isLast: index === pathSegments.length - 1,
		}
	})

	breadcrumbs.unshift({
		label: 'Главная',
		href: '/',
		isLast: false,
	})

	return (
		<nav className='hidden lg:flex mb-15 pl-10'>
			<ol className='flex items-center gap-3'>
				{breadcrumbs.map((item, index) => (
					<li key={index} className='flex itms-center gap-3'>
						<div
							className={
								item.isLast ? 'opacity-50' : 'cursor-pointer hover:opacity-75'
							}
						>
							{item.isLast ? (
								item.label
							) : (
								<Link href={item.href}>{item.label}</Link>
							)}
						</div>
						{!item.isLast && <div className='opacity-50'>/</div>}
					</li>
				))}
			</ol>
		</nav>
	)
}
export default BreadCrumbs
