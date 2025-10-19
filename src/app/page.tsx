import Actions from '@/components/Actions'
import Articles from '@/components/Articles'
import NewProducts from '@/components/NewProducts'
import { SearchWrapper } from '@/components/SearchWrapper'
import AutoSlider from '@/components/slider/AutoSlider'

export default async function Home({
	searchParams,
}: {
	searchParams: { showSearch?: string }
}) {
	const { showSearch } = await searchParams
	const isSearchVisible = showSearch === 'true'

	return (
		<main className='w-full mx-auto mb-20'>
			<SearchWrapper isSearchVisible={isSearchVisible} />
			<AutoSlider />
			<div className='flex flex-col gap-y-20'>
				<Actions />
				<NewProducts />
				<Articles />
			</div>
		</main>
	)
}
