import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'

interface OrderActionsProps {
	showOrderDetails: boolean
	onToggleDetails: () => void
}

export const OrderActions: React.FC<OrderActionsProps> = ({
	showOrderDetails,
	onToggleDetails,
}) => {
	return (
		<div className='flex justify-center'>
			<button
				className='bg-gray-200 w-55 h-12 px-2 flex justify-center text-bases items-center gap-2 rounded duration-300 cursor-pointer hover:scale-105'
				onClick={onToggleDetails}
			>
				{showOrderDetails ? (
					<>
						<MdOutlineVisibilityOff className='text-xl' />
						Подробности заказа
					</>
				) : (
					<>
						<MdOutlineVisibility className='text-xl' />
						Подробности заказа
					</>
				)}
			</button>
		</div>
	)
}
