import ProductCard from '@/components/ProductCard'
import ViewAllButton from '@/components/ViewAllButton'
import { ProductsSectionProps } from '@/lib/types/productsSection'

const ProductsSection = ({
	title,
	viewAllButtons,
	products,
	compact = false,
}: ProductsSectionProps) => {
	const productsFound = products && products.length > 0
	return (
		<section>
			<div
				className={`flex flex-col gap-y-3 ${
					compact
						? 'justify-center border-b-1 border-gray-200 shadow-[var(--shadow-thick)] sm:shadow-none sm:border-none'
						: ''
				}`}
			>
				<div className='flex flex-row justify-between items-center px-5'>
					<h2 className={`${compact ? '' : 'hidden lg:block'} text-xl`}>
						{title}
					</h2>
					{viewAllButtons && (
						<ViewAllButton
							btnText={viewAllButtons.btnText}
							href={viewAllButtons.href}
						/>
					)}
				</div>
				{productsFound ? (
					<>
						{compact ? (
							<div className='relative'>
								<div
									className='block absolute right-0 top-0 bottom-0 w-30 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 
                   xl:hidden'
								></div>
								<ul className='flex flex-row flex-nowrap overflow-x-auto gap-10 px-5 xl:flex-wrap xl:overflow-x-visible xl:justify-around'>
									{products.map((item, index) => (
										<li
											key={item._id}
											className={`
                                block w-60 flex-shrink-0 
                    			${index > 3 ? 'xl:hidden' : ''}
                            `}
										>
											{<ProductCard {...item} />}
										</li>
									))}
								</ul>
							</div>
						) : (
							<ul className='grid grid-cols-1 450px:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center'>
								{products.map(item => (
									<li key={item._id}>{<ProductCard {...item} />}</li>
								))}
							</ul>
						)}
					</>
				) : (
					<div className='p-5 text-center text-gray-500'>Товары не найдены</div>
				)}
			</div>
		</section>
	)
}
export default ProductsSection
