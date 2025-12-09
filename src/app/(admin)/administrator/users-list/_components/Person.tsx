import { LuCake } from 'react-icons/lu'
import { tableStyles } from '../../styles'
import { isBirthdaySoon } from '@/lib/utils/admin/birthdaySoon'
import { formatBirthday } from '@/lib/utils/admin/formatBirthday '

const Person = ({
	name,
	surname,
	birthday,
}: {
	name: string
	surname: string
	birthday: string
}) => {
	const birthdaySoon = isBirthdaySoon(birthday)
	return (
		<div
			className={`border-b border-gray-300 md:border-b-0 order-2 flex flex-row md:flex-col md:items-start gap-x-3 gap-y-2 ${tableStyles.colSpans.name} ${tableStyles.border.right}`}
		>
			<div className='text-xs lg:text-sm font-medium md:text-left'>
				{surname} {name}
			</div>
			{birthdaySoon && (
				<span className='inline-flex items-center gap-2 text-gray-400 text-sm md:justify-start'>
					<LuCake className='h-6 w-6' />
					<div className='mt-1'>{formatBirthday(birthday)}</div>
				</span>
			)}
		</div>
	)
}

export default Person
