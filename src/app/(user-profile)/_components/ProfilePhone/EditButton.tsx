import { profileStyles } from '@/app/(auth)/styles'
import { MdOutlineEdit } from 'react-icons/md'

const EditButton = ({ onEdit }: { onEdit: () => void }) => {
	return (
		<button onClick={onEdit} className={profileStyles.editButton}>
			<MdOutlineEdit className='h-4 w-4 mr-1' />
			Редактировать
		</button>
	)
}

export default EditButton
