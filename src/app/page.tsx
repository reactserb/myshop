import Actions from '@/components/Actions'
import AutoSlider from '@/components/slider/AutoSlider'

export default function Home() {
	return (
		<main className='w-full mx-auto mb-20'>
			<AutoSlider />
			<div className='flex flex-col gap-y-20'>
				<Actions />
			</div>
		</main>
	)
}
