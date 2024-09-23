// types/react-slick.d.ts

declare module 'react-slick' {
    import * as React from 'react';

    interface Settings {
        accessibility?: boolean;
        adaptiveHeight?: boolean;
        afterChange?: (currentSlide: number) => void;
        appendDots?: (dots: React.ReactNode) => React.ReactNode;
        arrows?: boolean;
        asNavFor?: React.ReactInstance;
        autoplay?: boolean;
        autoplaySpeed?: number;
        beforeChange?: (currentSlide: number, nextSlide: number) => void;
        centerMode?: boolean;
        centerPadding?: string;
        className?: string;
        cssEase?: string;
        customPaging?: (index: number) => React.ReactNode;
        dots?: boolean;
        dotsClass?: string;
        draggable?: boolean;
        easing?: string;
        edgeFriction?: number;
        fade?: boolean;
        focusOnSelect?: boolean;
        infinite?: boolean;
        initialSlide?: number;
        lazyLoad?: 'ondemand' | 'progressive';
        nextArrow?: React.ReactNode;
        onEdge?: (swipeDirection: string) => void;
        onInit?: () => void;
        onLazyLoad?: () => void;
        onReInit?: () => void;
        pauseOnDotsHover?: boolean;
        pauseOnFocus?: boolean;
        pauseOnHover?: boolean;
        prevArrow?: React.ReactNode;
        responsive?: Array<{
            breakpoint: number;
            settings: Settings | 'unslick';
        }>;
        rows?: number;
        rtl?: boolean;
        slide?: string;
        slidesPerRow?: number;
        slidesToScroll?: number;
        slidesToShow?: number;
        speed?: number;
        swipe?: boolean;
        swipeEvent?: (swipeDirection: string) => void;
        swipeToSlide?: boolean;
        touchMove?: boolean;
        touchThreshold?: number;
        useCSS?: boolean;
        useTransform?: boolean;
        variableWidth?: boolean;
        vertical?: boolean;
        waitForAnimate?: boolean;
        [key: string]: never;
    }

    export default class Slider extends React.Component<Settings> {}
}
