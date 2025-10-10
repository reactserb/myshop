import ButtonSearch from './ButtonSearch'
import InputBlock from './InputBlock'

const SearchBlock = () => {
	return (
		<div className='flex gap-4 hidden md:flex'>
			<ButtonSearch />
			<InputBlock />
		</div>
	)
}
export default SearchBlock
