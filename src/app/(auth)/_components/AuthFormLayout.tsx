import { ReactNode } from 'react'
import CloseButton from './CloseButton'

type AuthFormVariant = 'register' | 'default'

export const AuthFormLayout = ({
	children,
	variant = 'default',
}: {
	children: ReactNode
	variant?: AuthFormVariant
}) => {
	return (
		<div className='fixed inset-0 z-[10000] flex bg-[#e3e3e3cc] min-h-screen text-gray-600 overflow-y-auto'>
			<div
				className={`${
					variant === 'register' ? 'max-w-[687px]' : 'max-w-[420px]'
				} bg-white w-full p-5 m-auto`}
			>
				<CloseButton />
				<div className='pt-18 pb-10 overflow-y-auto flex-1'>{children}</div>
			</div>
		</div>
	)
}
