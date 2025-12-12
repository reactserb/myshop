import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import ScrollToTop from '@/components/ScrollToTop'
import BreadCrumbs from '@/components/BreadCrumbs'
import ViewportHeightCalculator from '@/components/ViewportHeightCalculator'
import { RegisterFormProvider } from './contexts/RegisterFormContext'
import AuthProvider from '@/store/AuthProvider'
import MiniLoader from '@/components/MiniLoader'
import { Suspense } from 'react'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin', 'cyrillic'],
})

const getBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_BASE_URL ?? 
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  
  try {
    return new URL(url).toString()  // ← Валидная строка
  } catch {
    return 'http://localhost:3000'
  }
}

const baseUrl = getBaseUrl()

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: 'Магазин UNKNOWN',
	description: 'Интернет-магазин UNKNOWN',
	icons: {
		icon: '/favicon.ico',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${montserrat.variable} font-sans flex flex-col min-h-screen-fix overflow-y-scroll`}
			>
				<AuthProvider>
					<RegisterFormProvider>
						<ViewportHeightCalculator />
						<ScrollToTop />
						<Header />
						<div className='m-auto max-w-[1408px] mt-30 mb-20 flex-1 w-full'>
							<Suspense fallback={<MiniLoader />}>
								<BreadCrumbs />
							</Suspense>
							{children}
						</div>
						<Footer />
					</RegisterFormProvider>
				</AuthProvider>
			</body>
		</html>
	)
}
