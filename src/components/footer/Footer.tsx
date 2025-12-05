import FirstFooterCol from './FirstFooterCol'
import SecondFooterCol from './SecondFooterCol'
import ThirdFooterCol from './ThirdFooterCol'

const Footer = () => {
	return (
		<footer className='bg-white border-t-1 border-gray-200 pt-10 pb-12 lg:pb-5'>
			<div className='flex flex-col gap-y-5 pb-10 items-center m-auto max-w-[1408px] w-full sm:items-baseline sm:flex-row sm:flex-wrap py-2 px-4 sm:justify-around'>
				<FirstFooterCol />
				<SecondFooterCol />
				<ThirdFooterCol />
			</div>
			<div className='w-full text-center'>
				<span className='text-gray-500 text-sm uppercase'>
					© Unknown, {new Date().getFullYear()}
				</span>
			</div>
		</footer>
	)
}
export default Footer
