const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	let productId = ''

	try {
		productId = (await params).id
	} catch (err) {
		console.error('Ошибка получения товара:', err)
	}

	return <div className='px-5'>Страница товара: {productId}</div>
}
export default ProductPage
