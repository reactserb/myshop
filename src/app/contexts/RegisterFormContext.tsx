'use client'

import { initialRegisterFormData } from '@/lib/constants/registerFormData'
import { initialRegisterFormDataProps } from '@/lib/types/registerFormData'
import { createContext, ReactNode, useContext, useState } from 'react'

type RegisterFormContextType = {
	regFormData: initialRegisterFormDataProps
	setRegFormData: React.Dispatch<
		React.SetStateAction<initialRegisterFormDataProps>
	>
	resetRegForm: () => void
}

const RegisterFormContext = createContext<RegisterFormContextType>({
	regFormData: initialRegisterFormData,
	setRegFormData: () => {},
	resetRegForm: () => {},
})

export const RegisterFormProvider = ({ children }: { children: ReactNode }) => {
	const [regFormData, setRegFormData] = useState<initialRegisterFormDataProps>(
		initialRegisterFormData
	)

	const resetRegForm = () => setRegFormData(initialRegisterFormData)

	return (
		<RegisterFormContext.Provider
			value={{ regFormData, setRegFormData, resetRegForm }}
		>
			{children}
		</RegisterFormContext.Provider>
	)
}

export const useRegisterFormContext = () => useContext(RegisterFormContext)
