import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
	title: 'myshop',
	description: 'Интернет-магазин',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${montserrat.variable} font-sans`}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	)
}
