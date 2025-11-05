import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import ScrollToTop from '@/components/ScrollToTop'
import BreadCrumbs from '@/components/BreadCrumbs'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
	title: 'Магазин UNKNOWN',
	description: 'Интернет-магазин UNKNOWN',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${montserrat.variable} font-sans flex flex-col min-h-screen overflow-y-scroll`}
			>
				<ScrollToTop />
				<Header />
				<div className='m-auto max-w-[1408px] mt-30 mb-20 flex-1 w-full'>
					<BreadCrumbs />
					{children}
				</div>
				<Footer />
			</body>
		</html>
	)
}
