export const getStatusColor = (status: string) => {
	switch (status) {
		case 'pending':
		case 'confirmed':
			return 'bg-green-300 text-green-700'
		case 'delivered':
			return 'bg-green-500 text-white'
		case 'cancelled':
			return 'bg-red-500 text-white'
		default:
			return 'bg-gray-100 text-gray-800'
	}
}
