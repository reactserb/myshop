'use client'

import { useState } from 'react'
import PersonInput from '../_components/PersonInput'
import DateInput from '../_components/DateInput'
import GenderSelect from '../_components/GenderSelect'
import EmailInput from '../_components/EmailInput'
import LocationSelect from '../_components/LocationSelect'
import RegisterFormFooter from '../_components/RegisterFormFooter'
import { validateRegisterForm } from '@/lib/utils/validation/validateForm'
import ErrorComponent from '@/components/ErrorComponent'
import Loader from '@/components/Loader'
import { initialRegisterFormData } from '@/lib/constants/registerFormData'
import { initialRegisterFormDataProps } from '@/lib/types/registerFormData'
import PhoneInput from '../../_components/PhoneInput'
import PasswordInput from '../../_components/PasswordInput'
import { AuthFormLayout } from '../../_components/AuthFormLayout'
import { useRegisterFormContext } from '@/app/contexts/RegisterFormContext'
import VerificationMethodModal from '../_components/VerificationMethodModal'

const RegisterPage = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<{
		error: Error
		userMessage: string
	} | null>(null)
	const [registerFormData, setRegisterFormData] =
		useState<initialRegisterFormDataProps>(initialRegisterFormData)
	const [showPassword, setShowPassword] = useState(false)
	const [invalidMessage, setInvalidMessage] = useState('')
	const [isSuccess, setIsSuccess] = useState(false)

	const { setRegFormData } = useRegisterFormContext()

	const isMainPasswordValid = () => {
		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(
			registerFormData.password
		)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target

		const trimmedValue = value.trim()

		if (invalidMessage) {
			setInvalidMessage('')
		}

		setRegisterFormData(prev => ({ ...prev, [id]: trimmedValue }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError(null)
		setInvalidMessage('')

		const validation = validateRegisterForm(registerFormData)

		if (!validation.isValid) {
			setInvalidMessage(
				validation.errorMessage || 'Заполните все поля корректно'
			)
			setIsLoading(false)
			return
		}

		try {
			const [day, month, year] = registerFormData.birthdayDate.split('.')
			const formattedBirthdayDate = new Date(`${year}-${month}-${day}`)
			const userData = {
				...registerFormData,
				phoneNumber: registerFormData.phoneNumber.replace(/\D/g, ''),
				birthdayDate: formattedBirthdayDate.toISOString(),
			}

			setRegFormData(userData)

			setIsSuccess(true)
		} catch (error) {
			setError({
				error: error instanceof Error ? error : new Error('Неизвестная ошибка'),
				userMessage:
					(error instanceof Error && error.message) ||
					'Ошибка регистрации. Попробуйте снова.',
			})
		} finally {
			setIsLoading(false)
		}
	}

	const isFormValid = () => validateRegisterForm(registerFormData).isValid

	if (isLoading) {
		return <Loader />
	}
	if (error) {
		return (
			<ErrorComponent error={error.error} userMessage={error.userMessage} />
		)
	}
	if (isSuccess) {
		return <VerificationMethodModal />
	}

	return (
		<AuthFormLayout variant='register'>
			<h1 className='text-xl font-semibold text-center mb-10'>Регистрация</h1>
			<form
				onSubmit={handleSubmit}
				autoComplete='off'
				className='w-full max-w-[552px] mx-auto flex flex-col justify-center'
			>
				<div className='w-full flex flex-row flex-wrap justify-center gap-x-8 gap-y-4'>
					<div className='flex flex-col gap-y-4 items-start'>
						<PhoneInput
							value={registerFormData.phoneNumber}
							onChangeAction={handleChange}
						/>
						<PersonInput
							id='surname'
							label='Фамилия'
							value={registerFormData.surname}
							onChange={handleChange}
						/>
						<PersonInput
							id='name'
							label='Имя'
							value={registerFormData.name}
							onChange={handleChange}
						/>
						<PasswordInput
							id='password'
							label='Пароль'
							value={registerFormData.password}
							onChangeAction={handleChange}
							showPassword={showPassword}
							togglePasswordVisibilityAction={() =>
								setShowPassword(!showPassword)
							}
							showRequirements={true}
						/>
						<PasswordInput
							id='confirmPassword'
							label='Подтвердите пароль'
							value={registerFormData.confirmPassword}
							onChangeAction={handleChange}
							showPassword={showPassword}
							togglePasswordVisibilityAction={() =>
								setShowPassword(!showPassword)
							}
							compareWith={registerFormData.password}
							isComparisonAllowed={isMainPasswordValid()}
						/>
					</div>
					<div className='flex flex-col gap-y-4 items-start'>
						<DateInput
							value={registerFormData.birthdayDate}
							onChangeAction={value =>
								setRegisterFormData(prev => ({
									...prev,
									birthdayDate: value,
								}))
							}
						/>
						<LocationSelect
							value={registerFormData.location}
							onChangeAction={value =>
								setRegisterFormData(prev => ({ ...prev, location: value }))
							}
						/>
						<GenderSelect
							value={registerFormData.gender}
							onChangeAction={gender =>
								setRegisterFormData(prev => ({ ...prev, gender }))
							}
						/>
						<EmailInput
							value={registerFormData.email}
							onChangeAction={handleChange}
						/>
					</div>
				</div>
				{invalidMessage && (
					<div className='text-red-500 text-center p-4 my-4 bg-red-50 rounded'>
						{invalidMessage}
					</div>
				)}
				<RegisterFormFooter isFormValid={isFormValid()} isLoading={isLoading} />
			</form>
		</AuthFormLayout>
	)
}
export default RegisterPage
