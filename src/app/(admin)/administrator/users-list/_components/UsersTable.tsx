import { UserData } from '@/lib/types/userData'
import TableRow from './TableRow'
import TableHeader from './TableHeader'
import { getShortDecimalId } from '@/lib/utils/admin/shortDecimalId'
import { calculateAge } from '@/lib/utils/admin/calculateAge'
import Pagination from './Pagination'

interface UsersTableProps {
	users: UserData[]
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
	sortBy: string
	sortDirection: 'asc' | 'desc'
	onSort: (field: string, direction: 'asc' | 'desc') => void
}

const UsersTable = ({
	users,
	currentPage,
	totalPages,
	onPageChange,
	sortBy,
	sortDirection,
	onSort,
}: UsersTableProps) => {
	return (
		<div className='bg-white rounded border border-gray-500 overflow-hidden mt-4'>
			<TableHeader
				sortBy={sortBy}
				sortDirection={sortDirection}
				onSort={onSort}
			/>
			<div className='divide-y divide-gray-500 flex flex-col border-b border-gray-500'>
				{users.map(user => (
					<TableRow key={user.id} user={user} />
				))}
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={onPageChange}
			/>
		</div>
	)
}

export default UsersTable
