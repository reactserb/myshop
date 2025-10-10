'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules' // Импортируйте нужные модули

import 'swiper/css' // Базовые стили
import 'swiper/css/pagination' // Стили пагинации

import Image from 'next/image'

interface Slide {
	src: string
	alt: string
}

const slides: Slide[] = [
	{ src: '/slides/slide1.jpg', alt: 'slide1' },
	{ src: '/slides/slide2.jpg', alt: 'slide2' },
]

const AutoSlider = () => {
	return (
		<Swiper
			modules={[Autoplay, Pagination]} // Добавьте модули в список
			spaceBetween={50} // Отступ между слайдами
			slidesPerView={1} // Количество слайдов на одной странице
			autoplay={{
				// Настройки автопрокрутки
				delay: 3000, // Задержка между слайдами в миллисекундах
				disableOnInteraction: false, // Продолжать прокрутку после взаимодействия пользователя
			}}
			pagination={{ clickable: true }} // Включение пагинации (точек)
			loop={true} // Зацикливание слайдера
			style={{ height: '300px', width: '100%' }} // Пример стилей для слайдера
		>
			{slides.map((slide, index) => (
				<SwiperSlide key={index}>
					<Image
						src={slide.src}
						alt={slide.alt}
						fill
						className='object-cover xl:object-contain'
					/>
				</SwiperSlide>
			))}
		</Swiper>
	)
}

export default AutoSlider
