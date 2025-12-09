import { tableStyles } from '../../styles'

const Email = ({
	email,
	emailVerified,
}: {
	email: string
	emailVerified: boolean
}) => {
	return (
		<div
			className={`border-b border-gray-300 md:border-b-0 order-4 gap-2 ${tableStyles.colSpans.email} ${tableStyles.border.right}`}
		>
			<div className='text-xs font-semibold flex md:hidden'>Email:</div>
			<div
				className={`text-xs break-all flex items-center ${
					emailVerified ? 'text-green-600' : 'text-red-600'
				}`}
			>
				{email}
			</div>
		</div>
	)
}

export default Email
