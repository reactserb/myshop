import ErrorComponent from '@/components/ErrorComponent'

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	let productId = ''

	try {
		productId = (await params).id
	} catch (error) {
		return (
			<ErrorComponent
				error={error instanceof Error ? error : new Error(String(error))}
				userMessage='Ошибка получения товара'
			/>
		)
	}

	return <div className='px-5'>Страница товара: {productId}</div>
}
export default ProductPage
