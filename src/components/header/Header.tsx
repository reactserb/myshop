import LogoBlock from './LogoBlock'
import SearchBlock from './SearchBlock'
import UserBlock from './UserBlock'

const Header = () => {
	return (
		<header className='bg-white w-full flex gap-y-5 p-2 justify-between items-center'>
			<div className='flex gap-4 xl:gap-10 py-2 px-4 items-center'>
				<LogoBlock />
				<SearchBlock />
			</div>
			<UserBlock />
		</header>
	)
}
export default Header
