import Actions from '@/components/Actions'
import Articles from '@/components/Articles'
import NewProducts from '@/components/NewProducts'
import AutoSlider from '@/components/slider/AutoSlider'

export default function Home() {
	return (
		<main className='w-full mx-auto mb-20'>
			<AutoSlider />
			<div className='flex flex-col gap-y-20'>
				<Actions />
				<NewProducts />
				<Articles />
			</div>
		</main>
	)
}
