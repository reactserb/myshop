import Image from 'next/image'
import Link from 'next/link'

const LogoBlock = () => {
	return (
		<div className='relative min-w-30 min-h-12'>
			<Link href='/'>
				<Image src='/logo.webp' alt='логотип' fill />
			</Link>
		</div>
	)
}
export default LogoBlock
