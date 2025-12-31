const ContactsPage = () => {
	return (
		<section className='mx-3 md:mx-auto max-w-3xl p-6 bg-white rounded-xl shadow-sm border border-gray-100'>
			<header className='mb-4'>
				<h2 className='text-sm font-semibold uppercase tracking-wider text-gray-600'>
					Контакт центр
				</h2>
			</header>
			<div className='text-gray-700 leading-relaxed text-base space-y-3'>
				<p className='font-semibold'>+7 (843) 000-00-00</p>
				<p className='font-semibold'>+7 (800) 000-00-00</p>
				<p>Ежедневно с 9:00 до 22:00 по Московскому времени</p>
				<p>Интересующие вас вопросы Вы можете написать нам на почту</p>
				<p className='font-semibold'>about@unknown-shop.ru</p>
			</div>
		</section>
	)
}
export default ContactsPage
