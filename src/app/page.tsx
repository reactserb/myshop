import Actions from '@/app/(products)/Actions'
import Articles from '@/app/(articles)/Articles'
import NewProducts from '@/app/(products)/NewProducts'
import AutoSlider from '@/components/slider/AutoSlider'

export default async function Home() {
	return (
		<main className='w-full mx-auto'>
			<AutoSlider />
			<div className='flex flex-col gap-y-20'>
				<Actions />
				<NewProducts />
				<Articles />
			</div>
		</main>
	)
}
