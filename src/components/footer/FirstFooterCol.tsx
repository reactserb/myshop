import { FaVk } from 'react-icons/fa'
import { RiTelegram2Fill } from 'react-icons/ri'
import { FaWhatsapp } from 'react-icons/fa'

const FirstFooterCol = () => {
	return (
		<div className='flex flex-col items-center sm:items-baseline gap-y-2 sm:gap-y-4'>
			<div className='text-gray-400'>Социальные сети</div>
			<ul className='flex flex-col items-center sm:items-baseline gap-y-2 sm:gap-y-4'>
				<li className='flex'>
					<a
						href='https://vk.com'
						className='group flex items-center gap-x-1 cursor-pointer'
						target='_blank'
						rel='noopener noreferrer'
					>
						<FaVk className='text-gray-400 text-xl group-hover:text-blue-400' />
						<span>Вконтакте</span>
					</a>
				</li>
				<li className='flex'>
					<a
						href='https://t.me'
						className='group flex items-center gap-x-1 cursor-pointer'
						target='_blank'
						rel='noopener noreferrer'
					>
						<RiTelegram2Fill className='text-gray-400 text-xl group-hover:text-blue-600' />
						<span>Телеграм</span>
					</a>
				</li>
				<li className='flex'>
					<a
						href='https://wa.me'
						className='group flex items-center gap-x-1 cursor-pointer'
						target='_blank'
						rel='noopener noreferrer'
					>
						<FaWhatsapp className='text-gray-400 text-xl group-hover:text-green-600' />
						<span>WhatsApp</span>
					</a>
				</li>
			</ul>
		</div>
	)
}
export default FirstFooterCol
