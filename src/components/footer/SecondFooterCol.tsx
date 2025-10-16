import Link from 'next/link'

const SecondFooterCol = () => {
	return (
		<div className='flex flex-col items-center sm:items-baseline gap-y-2 sm:gap-y-4'>
			<div className='text-gray-400'>Поддержка</div>
			<ul className='flex flex-col items-center sm:items-baseline gap-y-2 sm:gap-y-4'>
				<li>
					<Link href='#' className='group relative'>
						<span className='after:block after:absolute after:-bottom-1 after:w-0 after:h-px after:bg-black after:content-[""] after:left-0 after:transition-all after:duration-300 group-hover:after:w-full '>
							Доставка и оплата
						</span>
					</Link>
				</li>
				<li>
					<Link href='#' className='group relative'>
						<span className='after:block after:absolute after:-bottom-1 after:w-0 after:h-px after:bg-black after:content-[""] after:left-0 after:transition-all after:duration-300 group-hover:after:w-full'>
							Возврат
						</span>
					</Link>
				</li>
			</ul>
		</div>
	)
}
export default SecondFooterCol
