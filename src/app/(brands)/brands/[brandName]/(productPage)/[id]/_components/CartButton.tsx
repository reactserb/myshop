import { LuShoppingCart } from 'react-icons/lu'

const CartButton = () => {
	return (
		<button className='mb-2 max-w-[300px] mx-auto h-15 bg-gray-500 text-white text-sm md:text-lg py-4 pl-15 pr-8 md:pl-15 flex justify-center items-center rounded duration-300 hover:opacity-75 cursor-pointer relative'>
			<LuShoppingCart className='w-6 h-6 absolute left-4' />
			<p className='text-center'>Добавить в корзину</p>
		</button>
	)
}

export default CartButton
