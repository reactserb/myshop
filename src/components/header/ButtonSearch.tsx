import { FiMenu } from 'react-icons/fi'

const ButtonSearch = () => {
	return (
		<button className='flex items-center cursor-pointer p-2 gap-2 rounded duration-300'>
			<FiMenu className='text-xl' />
			<span className='hidden lg:flex'>Каталог</span>
		</button>
	)
}
export default ButtonSearch
