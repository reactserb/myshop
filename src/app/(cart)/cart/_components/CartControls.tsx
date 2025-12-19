import { LuMinus, LuPlus } from 'react-icons/lu'

interface CartControlsProps {
	isAllSelected: boolean
	selectedItemsCount: number
	onSelectAll: () => void
	onDeselectAll: () => void
	onRemoveSelected: () => void
}

const CartControls = ({
	isAllSelected,
	selectedItemsCount,
	onSelectAll,
	onDeselectAll,
	onRemoveSelected,
}: CartControlsProps) => {
	return (
		<div className='flex items-center gap-x-10 mb-4 xl:mb-6'>
			<label className='flex items-center gap-2 cursor-pointer'>
				<input
					type='checkbox'
					checked={isAllSelected}
					onChange={e => (e.target.checked ? onSelectAll() : onDeselectAll())}
					className='hidden'
				/>
				<div className='w-6 h-6 bg-gray-400 text-white rounded flex items-center justify-center duration-300'>
					{isAllSelected ? (
						<LuMinus className='text-xl' />
					) : (
						<LuPlus className='text-xl' />
					)}
				</div>
				<span className='text-xs'>Выделить все</span>
			</label>

			{selectedItemsCount > 0 && (
				<button
					onClick={onRemoveSelected}
					className='text-red-500 hover:underline text-xs cursor-pointer'
				>
					Удалить выбранные
				</button>
			)}
		</div>
	)
}

export default CartControls
