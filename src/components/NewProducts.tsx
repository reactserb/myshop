import { IoIosArrowForward } from 'react-icons/io'
import database from '../data/databace.json'
import ProductCard from './ProductCard'
import Link from 'next/link'

const NewProducts = () => {
	const newProducts = database.products.filter(({ categories }) =>
		categories.includes('new')
	)

	return (
		<section>
			<div className='flex flex-col justify-center'>
				<div className='flex flex-row justify-between items-center mb-5 px-2'>
					<h2 className='text-lg sm:text-xl'>Новинки</h2>
					<Link
						href='#'
						className='flex flex-row items-center text-left gap-x-2 cursor-pointer'
					>
						<p className='text-sm sm:text-base text-center'>Все новинки</p>
						<IoIosArrowForward className='text-xl' />
					</Link>
				</div>
				<ul className='flex flex-row flex-wrap justify-around gap-4'>
					{newProducts.slice(0, 4).map((item, index) => (
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
export default NewProducts
