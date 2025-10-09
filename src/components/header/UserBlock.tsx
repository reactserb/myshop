import Profile from './Profile'
import TopMenu from './TopMenu'

const UserBlock = () => {
	return (
		<nav aria-label='Основное меню'>
			<div className='flex gap-x-2'>
				<TopMenu />
				<Profile />
			</div>
		</nav>
	)
}
export default UserBlock
