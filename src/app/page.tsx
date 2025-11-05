import Actions from '@/app/(products)/Actions'
import Articles from '@/app/(articles)/Articles'
import NewProducts from '@/app/(products)/NewProducts'
import AutoSlider from '@/components/slider/AutoSlider'
import { Suspense } from 'react'
import Loader from '@/components/Loader'

export default async function Home() {
	return (
		<main className='w-full mx-auto'>
			<AutoSlider />
			<div className='flex flex-col gap-y-20'>
				{[
					{ component: <Actions />, text: 'скидок' },
					{ component: <NewProducts />, text: 'новинок' },
					{ component: <Articles />, text: 'статей' },
				].map((item, index) => (
					<Suspense key={index} fallback={<Loader text={item.text} />}>
						{item.component}
					</Suspense>
				))}
			</div>
		</main>
	)
}
