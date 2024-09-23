// components/ImageCarousel.jsx

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AspectRatio } from '@radix-ui/themes';

const ImageCarousel = () => {
    const images = [
        '/images/match1.jpg',
        '/images/match2.jpg',
        '/images/match3.jpg',
        // Add more image paths
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
            {images.map((src, index) => (
                <AspectRatio key={index} ratio={16 / 9}>
                    <img
                        src={src}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </AspectRatio>
            ))}
        </Slider>
    );
};

export default ImageCarousel;
