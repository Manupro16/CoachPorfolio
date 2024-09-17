// hooks/useGsapWaveAnimation.ts
import { useEffect } from 'react';
import { gsap } from 'gsap';

interface AnimationProps {
    targetId: string;
    duration: number;
    svgPath: string;
}

const useGsapWaveAnimation = (animations: AnimationProps[]): void => {
    useEffect(() => {
        const gsapAnimations = animations.map(animation =>
            gsap.to(`#${animation.targetId}`, {
                duration: animation.duration,
                attr: {
                    d: animation.svgPath,
                },
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            })
        );

        // Cleanup animations on component unmount
        return () => {
            gsapAnimations.forEach(gsapAnimation => gsapAnimation.kill());
        };
    }, [animations]);
};

export default useGsapWaveAnimation;