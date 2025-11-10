import ViewAllButton from '@/components/ViewAllButton'
import { BrandsSectionProps } from '@/lib/types/brandsSection'
import Link from 'next/link'
import Image from 'next/image'

const BrandsSection = ({
	title,
	viewAllButtons,
	brands,
	compact = false,
}: BrandsSectionProps) => {
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
					{viewAllButtons && (
						<ViewAllButton
							btnText={viewAllButtons.btnText}
							href={viewAllButtons.href}
						/>
					)}
				</div>
				{compact ? (
					<div className='relative'>
						<div
							className='block absolute right-0 top-0 bottom-0 w-30 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 
                   xl:hidden'
						></div>
						<ul className='flex flex-row flex-nowrap overflow-x-auto gap-10 px-5 xl:flex-wrap xl:overflow-x-visible xl:justify-around'>
							{brands.map((brand, index) => (
								<li
									key={brand._id}
									className={`block flex-shrink-0 xl:flex-shrink
									${index > 4 ? 'xl:hidden' : ''}`}
								>
									<Link
										href={`/brands/${brand.brandName}`}
										className='flex flex-col w-full items-center justify-between flex-grow relative'
									>
										<div className='relative w-50 h-40'>
											<Image
												src={brand.img}
												alt={brand.brandName}
												fill
												className='object-contain p-2'
												sizes='(max-width: 640px) 140px, 240px'
											/>
										</div>
									</Link>
								</li>
							))}
						</ul>
					</div>
				) : (
					<ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center'>
						{brands.map(brand => (
							<li key={brand._id}>
								<Link
									href={`/brands/${brand.brandName}`}
									className='flex flex-col w-full items-center justify-between flex-grow relative'
								>
									<div className='relative w-50 h-40'>
										<Image
											src={brand.img}
											alt={brand.brandName}
											fill
											className='object-contain p-2'
											sizes='(max-width: 640px) 140px, 240px'
										/>
									</div>
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	)
}
export default BrandsSection
