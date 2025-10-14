import Profile from './Profile'
import TopMenu from './TopMenu'

const UserBlock = () => {
	return (
		<nav aria-label='Основное меню'>
			<div className='flex items-center'>
				<TopMenu />
				<Profile />
			</div>
		</nav>
	)
}
export default UserBlock
