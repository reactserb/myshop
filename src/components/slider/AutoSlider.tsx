'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css' // Базовые стили
import 'swiper/css/pagination' // Стили пагинации

import Image from 'next/image'

interface Slide {
	src: string
	alt: string
}

const slides: Slide[] = [
	{ src: '/images/slides/slide1.jpg', alt: 'slide1' },
	{ src: '/images/slides/slide2.jpg', alt: 'slide2' },
	{ src: '/images/slides/slide3.jpg', alt: 'slide3' },
	{ src: '/images/slides/slide4.jpg', alt: 'slide4' },
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
			// pagination={{ clickable: true }} // Включение пагинации (точек)
			loop={true} // Зацикливание слайдера
			className='h-[300px] md:h-[400px] w-full -mt-10 -mb-5 sm:my-0 md:mb-20 md:mt-10'
		>
			{slides.map((slide, index) => (
				<SwiperSlide key={index}>
					<Image
						src={slide.src}
						alt={slide.alt}
						fill
						className='object-contain lg:object-cover'
					/>
				</SwiperSlide>
			))}
		</Swiper>
	)
}

export default AutoSlider
