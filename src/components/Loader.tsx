import { LoaderProps } from '@/lib/types/loader'

export const Loader = ({ text = '', className = '' }: LoaderProps) => {
	return (
		<div
			className={`flex flex-col items-center justify-center gap-3 ${className}`}
		>
			<div className='relative w-12 h-12'>
				<div className='w-full h-full border-4 border-black-500 border-t-transparent rounded-full animate-spin absolute'></div>
				<div className='w-full h-full border-4 border-black-500 border-t-transparent rounded-full animate-spin-reverse absolute'></div>
			</div>
			{text && <p>Загрузка {text}...</p>}
		</div>
	)
}
export default Loader
