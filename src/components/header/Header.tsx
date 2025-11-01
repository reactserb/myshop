import LogoBlock from './LogoBlock'
import CatalogHeader from './CatalogHeader'
import UserBlock from './UserBlock'

const Header = () => {
	return (
		<header className='bg-white w-full flex py-2 px-4 justify-between items-center max-w-[1408px] m-auto fixed top-0 right-0 left-0 z-[10000]'>
			<div className='flex flex-row-reverse md:flex-row gap-10 py-2 items-center '>
				<LogoBlock />
				<CatalogHeader />
			</div>
			<UserBlock />
		</header>
	)
}
export default Header
