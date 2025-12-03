import { AiOutlineExclamationCircle } from 'react-icons/ai'

const Tooltip = ({
	text,
	position = 'bottom',
}: {
	text: string
	position?: 'top' | 'bottom'
}) => {
	return (
		<div
			className={`absolute left-0 mt-2 w-full transition-all duration-300 ease-in-out ${
				position === 'top' ? '-top-12' : ''
			}`}
		>
			<div
				className={`relative bg-[#d80000] text-white text-sm p-2 rounded max-w-65 mx-auto flex items-center z-50 opacity-0 animate-fadeIn ${
					position === 'bottom' ? 'mb-2' : 'mt-1'
				}`}
			>
				<AiOutlineExclamationCircle
					className={`text-2xl mr-2 flex-shrink-0 ${position === 'bottom' ? 'mr-4' : 'mx-4'}`}
				/>
				{/* Треугольник внизу, если position="top" */}
				{position === 'top' ? (
					<div
						className='absolute left-1/2 -bottom-0.75 transform -translate-x-1/2 w-0 h-0 
                     border-l-[6px] border-r-[6px] border-t-[4px] 
                     border-l-transparent border-r-transparent border-t-[#d80000]'
					></div>
				) : (
					// Треугольник вверху (по умолчанию)
					<div
						className='absolute left-1/2 -top-0.75 transform -translate-x-1/2 w-0 h-0 
                     border-l-[6px] border-r-[6px] border-b-[4px] 
                     border-l-transparent border-r-transparent border-b-[#d80000]'
					></div>
				)}
				{text}
			</div>
		</div>
	)
}
export default Tooltip
