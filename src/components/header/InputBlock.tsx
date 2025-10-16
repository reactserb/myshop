import { GoSearch } from 'react-icons/go'

const InputBlock = () => {
	return (
		<div className='relative hidden md:flex'>
			<input
				placeholder='Найти товар'
				className='w-full h-10 rounded p-2 pr-10 outline outline-gray-300 hover:outline-gray-400 focus:outline-black text-base leading-[150%]'
			/>
			<button className='absolute top-2 right-2 cursor-pointer'>
				<GoSearch className='text-xl' />
			</button>
		</div>
	)
}
export default InputBlock
