const DeliveryAndPaymentPage = () => {
	return (
		<section className='m-3 md:mx-auto max-w-3xl p-6 bg-white rounded-xl shadow-sm border border-gray-100'>
			<header className='mb-4'>
				<h2 className='text-sm font-semibold uppercase tracking-wider text-gray-600'>
					Доставка и оплата
				</h2>
			</header>
			<div className='text-gray-700 leading-relaxed text-base space-y-3'>
				<p className='flex items-start gap-2'>
					<span
						className='flex-none w-1.5 h-1.5 rounded-full bg-gray-500 mt-2'
						aria-hidden='true'
					></span>
					Казань — Самовывоз из Шоурума по адресу: ул. Пушкина, 14
				</p>
				<p className='flex items-center gap-2'>
					<span
						className='inline-block w-1.5 h-1.5 rounded-full bg-gray-500'
						aria-hidden='true'
					></span>
					Доставка доступна в другие города России
				</p>
				<p>В регионы России отправляем только по 100% предоплате.</p>
				<p>СДЭК — заказ доставляется лично вам или до пункта выдачи.</p>
				<p>
					<span className='font-semibold'>Срок доставки: </span>от 2 до 5
					рабочих дней, без учёта дня оформления заказа.
				</p>
				<p>Примерка не предусмотрена для данного способа доставки.</p>
				<p>
					<span className='font-semibold'>Стоимость доставки: </span>500 рублей.
					Оплата онлайн картой на сайте.
				</p>
			</div>
		</section>
	)
}
export default DeliveryAndPaymentPage
