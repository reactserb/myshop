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
			modules={[Autoplay, Pagination]}
			spaceBetween={50}
			slidesPerView={1}
			autoplay={{
				delay: 3000,
				disableOnInteraction: false,
			}}
			loop={true}
			className='h-[250px] w-full -mt-5 mb-5 450px:h-[300px] 450px:mb-20 450px:mt-15 xl:h-[400px]'
		>
			{slides.map((slide, index) => (
				<SwiperSlide key={index}>
					<Image
						src={slide.src}
						alt={slide.alt}
						fill
						className='object-contain object-bottom 450px:object-cover 450px:object-top'
						priority={index === 0}
						sizes='100vw'
					/>
				</SwiperSlide>
			))}
		</Swiper>
	)
}

export default AutoSlider
