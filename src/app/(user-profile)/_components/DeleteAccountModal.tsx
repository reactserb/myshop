'use client'

interface DeleteAccountModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	error?: string | null
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	error,
}) => {
	if (!isOpen) return null

	return (
		<div className='fixed inset-0 bg-[#ffffffcc] backdrop-blur-sm flex items-center justify-center z-[150]'>
			<div className='bg-white border-1 border-gray-500 rounded p-6 w-96'>
				<h3 className='text-xl font-bold mb-4'>Подтверждение удаления</h3>

				{error && (
					<div className='mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded text-sm'>
						{error}
					</div>
				)}

				<p className='text-gray-600 mb-6'>
					Вы уверены, что хотите удалить свой аккаунт? Это действие нельзя
					отменить.
				</p>

				<div className='flex justify-end gap-3'>
					<button
						onClick={onClose}
						className='flex-1 bg-gray-200 border-none rounded flex hover:bg-gray-500 p-2 justify-center items-center duration-300 cursor-pointer'
					>
						Отмена
					</button>
					<button
						onClick={onConfirm}
						className='flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 duration-300 cursor-pointer'
					>
						Удалить
					</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteAccountModal
