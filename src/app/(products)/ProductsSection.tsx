import ProductCard from '@/components/ProductCard'
import ViewAllButton from '@/components/ViewAllButton'
import { ProductsSectionProps } from '@/types/productsSection'

const ProductsSection = ({
	title,
	viewAllButtons,
	products,
	compact = false,
}: ProductsSectionProps) => {
	return (
		<section>
			<div
				className={`flex flex-col ${
					compact
						? 'justify-center border-b-1 border-gray-200 shadow-[var(--shadow-thick)] sm:shadow-none sm:border-none'
						: ''
				}`}
			>
				<div className='flex flex-row justify-between items-center mb-5 px-5'>
					<h2 className='text-md sm:text-xl'>{title}</h2>
					<ViewAllButton
						btnText={viewAllButtons.btnText}
						href={viewAllButtons.href}
					/>
				</div>
				{compact ? (
					<ul className='flex flex-row flex-wrap justify-around gap-4'>
						{products.slice(0, 4).map((item, index) => (
							<li
								key={item._id}
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
				) : (
					<ul className='grid grid-cols-1 450px:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center'>
						{products.map(item => (
							<li key={item._id}>{<ProductCard {...item} />}</li>
						))}
					</ul>
				)}
			</div>
		</section>
	)
}
export default ProductsSection
