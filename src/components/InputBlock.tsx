import { GoSearch } from 'react-icons/go'

const InputBlock = () => {
	return (
		<div className='relative max-w-[1408px] m-auto'>
			<input
				placeholder='Найти товар'
				className='w-full bg-gray-100 h-10 rounded p-2 pr-10 focus:outline-none hover:bg-gray-200 text-base leading-[150%]'
			/>
			<button className='absolute top-2 right-7 cursor-pointer'>
				<GoSearch className='text-xl' />
			</button>
		</div>
	)
}
export default InputBlock
