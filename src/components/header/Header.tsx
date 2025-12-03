import LogoBlock from './LogoBlock'
import CatalogHeader from './CatalogHeader'
import UserBlock from './UserBlock'
import { SearchOverlayProvider } from './context/SearchOverlayContext'

const Header = () => {
	return (
		<SearchOverlayProvider>
			<header className='bg-white w-full fixed top-0 left-0 right-0 z-[1000]'>
				<div className='flex py-2 px-4 justify-between items-center max-w-[1408px] mx-auto'>
					<div className='flex flex-row-reverse md:flex-row gap-x-10 py-2 items-center '>
						<LogoBlock />
						<CatalogHeader />
					</div>
					<UserBlock />
				</div>
			</header>
		</SearchOverlayProvider>
	)
}
export default Header
