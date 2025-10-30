import { IoIosArrowForward } from 'react-icons/io'
import Link from 'next/link'

const ViewAllButton = ({
	btnText,
	href,
}: {
	btnText: string
	href: string
}) => {
	return (
		<Link
			href={href}
			className='flex flex-row items-center text-left gap-x-1 cursor-pointer'
		>
			<p className='text-md sm:text-xl text-center hover:opacity-75'>
				{btnText}
			</p>
			<IoIosArrowForward />
		</Link>
	)
}
export default ViewAllButton
