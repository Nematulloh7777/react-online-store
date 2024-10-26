import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import {Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './../../../styles/slider.css';

const Slider = () => {
    return (
        <div>
            <Swiper
                slidesPerView={1}
                loop={true}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper mb-10"
            >
                <SwiperSlide>
                    <img src="/img/2540.png" alt="slider" className='image' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/img/2540.png" alt="slider" className='image' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/img/2540.png" alt="slider" className='image' />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;