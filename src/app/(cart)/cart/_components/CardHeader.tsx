const CartHeader = ({ itemCount }: { itemCount: number }) => {
	return (
		<div className='relative w-full max-w-[336px] md:w-[336px] mb-5 h-24 flex items-center gap-x-2'>
			<h1 className='text-4xl md:text-5xl xl:text-[64px] font-bold'>Корзина</h1>
			{itemCount > 0 && (
				<div className='bg-gray-500 rounded -mt-10 px-2 py-1'>
					<span className='text-base text-white'>{itemCount}</span>
				</div>
			)}
		</div>
	)
}

export default CartHeader
