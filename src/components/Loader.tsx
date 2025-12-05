import { LoaderProps } from '@/lib/types/loader'

const Loader = ({ text = '', className = '' }: LoaderProps) => {
	return (
		<div
			className={`flex flex-col items-center justify-center w-full h-full gap-3 ${className}`}
		>
			<div className='w-12 h-12 border-4 border-gray-200 border-b-black border-r-black border-solid rounded-full animate-spin'></div>

			{text && <p>Загрузка {text}...</p>}
		</div>
	)
}
export default Loader
