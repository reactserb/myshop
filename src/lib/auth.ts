import VerifyEmail from '@/app/(auth)/(reg)/_components/VeryfyEmail'
import PasswordResetEmail from '@/app/(auth)/(update-pass)/_components/PasswordResetEmail'
import { render } from '@react-email/render'
import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { phoneNumber } from 'better-auth/plugins'
import { MongoClient } from 'mongodb'
import { Resend } from 'resend'
import { CONFIG } from '../../config/config'
import EmailChangeVerification from '@/app/(user-profile)/_components/EmailChangeVerification'
import DeleteVerify from '@/app/(auth)/(reg)/_components/DeleteVeify'
import { deleteUserAvatarFromGridFS } from './utils/avatar/deleteUserAvatar'

const client = new MongoClient(process.env.UNKNOWN_SHOP_DB_URL!)
const db = client.db(process.env.UNKNOWN_SHOP_DB_NAME)
const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
	database: mongodbAdapter(db),
	session: {
		expiresIn: 60 * 60 * 24 * 30,
		updateAge: 60 * 60 * 24,
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		resetPasswordTokenExpiresIn: 86400,
		sendResetPassword: async ({ user, url }) => {
			const emailHtml = await render(
				PasswordResetEmail({ username: user.name, resetUrl: url })
			)
			await resend.emails.send({
				from: 'UNKNOWN shop <onboarding@resend.dev>',
				to: user.email,
				subject: 'Сброс пароля для UNKNOWN shop',
				html: emailHtml,
			})
		},
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			const emailHtml = await render(
				VerifyEmail({ username: user.name, verifyUrl: url })
			)
			await resend.emails.send({
				from: 'UNKNOWN shop <onboarding@resend.dev>',
				to: user.email,
				subject: 'Подтвердите ваш email',
				html: emailHtml,
			})
		},
		expiresIn: 86400,
		autoSignInAfterVerification: false,
	},
	plugins: [
		phoneNumber({
			sendOTP: async ({ phoneNumber, code }) => {
				console.log(`DEBUG: ${code} (Verification) для ${phoneNumber}`)
			},
			// sendOTP: async ({ phoneNumber, code }) => {
			// 	try {
			// 		const response = await fetch(
			// 			`https://sms.ru/sms/send?api_id=${process.env.SMS_API_ID}&to=${phoneNumber}&msg=Ваш код подтверждения для регистрации от магазина UNKNOWN: ${code}&json=1`
			// 		)

			// 		const result = await response.json()

			// 		if (result.status !== 'OK') {
			// 			throw new Error(result.status || 'Ошибка отправки SMS')
			// 		}
			// 	} catch (error) {
			// 		console.error('Ошибка отправки SMS: ', error)
			// 		throw error
			// 	}
			// },
			sendPasswordResetOTP: async ({ phoneNumber, code }) => {
				console.log(`DEBUG: ${code} (Reset Pass) для ${phoneNumber}`)
			},
			// sendPasswordResetOTP: async ({ phoneNumber, code }) => {
			// 	try {
			// 		const response = await fetch(
			// 			`https://sms.ru/sms/send?api_id=${process.env.SMS_API_ID}&to=${phoneNumber}&msg=Ваш код подтверждения для изменения пароля от магазина UNKNOWN: ${code}&json=1`
			// 		)

			// 		const result = await response.json()

			// 		if (result.status !== 'OK') {
			// 			throw new Error(result.status || 'Ошибка отправки SMS')
			// 		}
			// 	} catch (error) {
			// 		console.error('Ошибка отправки SMS: ', error)
			// 		throw error
			// 	}
			// },

			signUpOnVerification: {
				getTempEmail: phoneNumber => {
					return `${phoneNumber}${CONFIG.TEMPORARY_EMAIL_DOMAIN}`
				},
				getTempName: phoneNumber => {
					return phoneNumber
				},
			},
			allowedAttempts: 3,
			otpLength: 4,
			expiresIn: 300,
			requireVerification: true,
		}),
	],
	user: {
		email: {
			type: 'string',
			// Разрешаем обновление email, чтобы заменить временный адрес на реальный.
			updatable: true,
		},
		changeEmail: {
			enabled: true,
			sendChangeEmailVerification: async ({
				user,
				newEmail,
				url,
			}: {
				user: { email: string; name: string }
				newEmail: string
				url: string
			}) => {
				const emailHtml = await render(
					EmailChangeVerification({
						username: user.name,
						currentEmail: user.email,
						newEmail,
						verificationUrl: url,
					})
				)
				await resend.emails.send({
					from: 'UNKNOWN shop <onboarding@resend.dev>',
					to: user.email,
					subject: 'Подтверждение смены email в UNKNOWN shop',
					html: emailHtml,
				})
			},
		},
		deleteUser: {
			enabled: true,
			sendDeleteAccountVerification: async ({
				user,
				url,
			}: {
				user: { email: string; name: string }
				url: string
			}) => {
				const emailHtml = await render(
					DeleteVerify({ username: user.name, verifyUrl: url })
				)
				await resend.emails.send({
					from: 'UNKNOWN shop <onboarding@resend.dev>',
					to: user.email,
					subject: 'Удаление аккаунта',
					html: emailHtml,
				})
			},
			afterDelete: async user => {
				await deleteUserAvatarFromGridFS(user.id)
			},
		},
		// ----------------------------------------
		additionalFields: {
			phoneNumber: { type: 'string', input: true, required: true },
			surname: { type: 'string', input: true, required: true },
			birthdayDate: { type: 'date', input: true, required: true },
			location: { type: 'string', input: true, required: true },
			gender: { type: 'string', input: true, required: true },
		},
	},
})
