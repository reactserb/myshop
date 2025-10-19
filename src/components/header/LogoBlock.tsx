import Image from 'next/image'
import Link from 'next/link'

const LogoBlock = () => {
	return (
		<Link href='/' className='relative min-w-30 min-h-12 inline-block'>
			<Image src='/logo.webp' alt='логотип' fill priority sizes='120px' />
		</Link>
	)
}
export default LogoBlock
