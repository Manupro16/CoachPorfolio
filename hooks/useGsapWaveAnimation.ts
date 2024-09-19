// useGsapWaveAnimation.ts

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';

interface WaveAnimation {
    targetId: string;
    duration: number;
    repeat?: number;
    paths: string[];
}

const useGsapWaveAnimation = (animations: WaveAnimation[]) => {
    useLayoutEffect(() => {
        animations.forEach(({ targetId, duration, repeat = -1, paths }) => {
            const segmentDuration = duration / (paths.length - 1);
            const tl = gsap.timeline({ repeat, defaults: { ease: 'sine.inOut' } });

            paths.forEach((path, index) => {
                if (index > 0) {
                    tl.to(`#${targetId}`, {
                        duration: segmentDuration,
                        attr: { d: path },
                    });
                }
            });
        });
    }, [animations]);
};

export default useGsapWaveAnimation;
