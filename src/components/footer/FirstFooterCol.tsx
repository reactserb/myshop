import { FaVk } from 'react-icons/fa'
import { RiTelegram2Fill } from 'react-icons/ri'
import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'

const FirstFooterCol = () => {
	return (
		<div className='flex flex-col items-center sm:items-baseline gap-y-2'>
			<div className='text-gray-400'>Социальные сети</div>
			<ul className='flex flex-col items-center sm:items-baseline gap-y-2'>
				<li className='flex'>
					<Link
						href='#'
						className='group flex items-center gap-x-1 cursor-pointer'
					>
						<FaVk className='text-gray-400 text-xl group-hover:text-black' />
						<span>Вконтакте</span>
					</Link>
				</li>
				<li className='flex'>
					<Link
						href='#'
						className='group flex items-center gap-x-1 cursor-pointer'
					>
						<RiTelegram2Fill className='text-gray-400 text-xl group-hover:text-black' />
						<span>Телеграм</span>
					</Link>
				</li>
				<li className='flex'>
					<Link
						href='#'
						className='group flex items-center gap-x-1 cursor-pointer'
					>
						<FaWhatsapp className='text-gray-400 text-xl group-hover:text-black' />
						<span>WhatsApp</span>
					</Link>
				</li>
			</ul>
		</div>
	)
}
export default FirstFooterCol
