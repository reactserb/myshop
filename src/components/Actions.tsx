import { IoIosArrowForward } from 'react-icons/io'
import database from '../data/databace.json'
import ProductCard from './ProductCard'
import Link from 'next/link'

const Actions = () => {
	const actionProducts = database.products.filter(({ categories }) =>
		categories.includes('discount')
	)

	return (
		<section>
			<div className='flex flex-col justify-center border-b-1 border-gray-200 shadow-[var(--shadow-thick)] sm:shadow-none sm:border-none'>
				<div className='flex flex-row justify-between items-center mb-5 px-5'>
					<h2 className='text-lg sm:text-xl'>Скидки</h2>
					<Link
						href='#'
						className='flex flex-row items-center text-left gap-x-1 cursor-pointer'
					>
						<p className='text-sm sm:text-base text-center'>Все скидки</p>
						<IoIosArrowForward className='text-lg lg:text-xl' />
					</Link>
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
