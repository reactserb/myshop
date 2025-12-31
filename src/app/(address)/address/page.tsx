const AddressPage = () => {
	return (
		<section className='mx-3 md:mx-auto max-w-3xl p-6 bg-white rounded-xl shadow-sm border border-gray-100'>
			<header className='mb-4'>
				<h2 className='text-sm font-semibold uppercase tracking-wider text-gray-600'>
					Адрес магазина
				</h2>
			</header>
			<div className='text-gray-700 leading-relaxed text-base space-y-3'>
				<p>Казань, улица Пушкина, дом 14</p>
				<p>Режим работы</p>
				<p className='font-semibold'>10:00-20:00</p>
			</div>
		</section>
	)
}
export default AddressPage
