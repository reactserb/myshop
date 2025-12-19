'use client'

import { memo } from 'react'

const DiscountBadge = memo(function DiscountBadge({
	discountPercent,
}: {
	discountPercent: number
}) {
	return (
		<div className='bg-yellow-200 max-w-20 rounded py-1 px-2 flex justify-center items-center text-xs'>
			-{discountPercent}%
		</div>
	)
})

export default DiscountBadge
