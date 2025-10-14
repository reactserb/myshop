import LogoBlock from './LogoBlock'
import SearchBlock from './SearchBlock'
import UserBlock from './UserBlock'

const Header = () => {
	return (
		<header className='bg-white w-full flex gap-y-5 py-2 px-4 justify-between items-center'>
			<div className='flex flex-row-reverse sm:flex-row gap-4 xl:gap-10 py-2 items-center '>
				<LogoBlock />
				<SearchBlock />
			</div>
			<UserBlock />
		</header>
	)
}
export default Header
