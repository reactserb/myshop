import { IoIosArrowForward } from 'react-icons/io'
import database from '../data/databace.json'
import ProductCard from './ProductCard'

const Actions = () => {
	const actionProducts = database.products.filter(({ categories }) =>
		categories.includes('discount')
	)

	return (
		<section>
			<div className='flex flex-col justify-center'>
				<div className='flex flex-row justify-between items-center mb-5'>
					<h2 className='text-2xl font-bold'>Скидки</h2>
					<button className='flex flex-row items-center text-left gap-x-2 cursor-pointer'>
						<p className='text-base text-center'>Все скидки</p>
						<IoIosArrowForward className='text-xl' />
					</button>
				</div>
				<ul className='flex flex-row flex-wrap justify-around gap-4'>
					{actionProducts.slice(0, 4).map((item, index) => (
						<li
							key={item.id}
							className={`
                                block
                                ${index >= 2 ? 'hidden md:block' : ''}
                                ${index >= 3 ? 'md:hidden lg:block' : ''}
							`}
						>
							{<ProductCard {...item} />}
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
export default Actions
