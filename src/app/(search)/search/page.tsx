import { Suspense } from 'react'
import SearchContent from './SearchContent'
import Loader from '@/components/Loader'

const SearchPage = () => {
	return (
		<Suspense fallback={<Loader text='поиска' className='min-h-screen' />}>
			<SearchContent />
		</Suspense>
	)
}

export default SearchPage
