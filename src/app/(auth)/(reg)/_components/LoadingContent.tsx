import { LuRotateCw } from 'react-icons/lu'

export const LoadingContent = ({
	title,
}: {
	title: string | React.ReactNode
}) => {
	return (
		<div className='flex flex-col items-center justify-center space-y-4'>
			<div className='relative'>
				<LuRotateCw className='h-10 w-10 text-gray-500 animate-spin' />
				<div className='absolute inset-0 rounded-full border-2 border-gray-500 border-opacity-20 animate-ping'></div>
			</div>
			<div className='text-center text-gray-600 space-y-2'>
				<h3 className='text-xl font-semibold text-gray-600 break-all'>
					{title}
				</h3>
				<p>Пожалуйста, подождите...</p>
			</div>
		</div>
	)
}
