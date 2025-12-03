'use client'

import { useRouter } from 'next/navigation'
import { IoMdClose } from 'react-icons/io'

const CloseButton = () => {
	const router = useRouter()

	const handleClose = () => {
		router.replace('/')
	}
	return (
		<div className='flex justify-end'>
			<button
				onClick={handleClose}
				className='duration-300 cursor-pointer mb-8 text-3xl'
				aria-label='Закрыть'
			>
				<IoMdClose />
			</button>
		</div>
	)
}
export default CloseButton
