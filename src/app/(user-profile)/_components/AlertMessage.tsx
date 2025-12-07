import { ReactNode } from 'react'
import { IoAlertCircleOutline } from 'react-icons/io5'

interface AlertMessageProps {
	type: 'success' | 'warning' | 'error'
	message: ReactNode
}

const AlertMessage = ({ type, message }: AlertMessageProps) => {
	const styles = {
		success: 'bg-green-50 text-green-500',
		warning: 'bg-amber-50 text-amber-700',
		error: 'bg-red-100 text-red-700',
	}

	return (
		<div className={`flex items-center px-3 py-2 rounded mt-3 ${styles[type]}`}>
			<IoAlertCircleOutline className='h-4 w-4 mr-2 flex-shrink-0' />
			<span className='text-sm'>{message}</span>
		</div>
	)
}

export default AlertMessage
