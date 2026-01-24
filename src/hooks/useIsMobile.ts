import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        // Initial check
        checkMobile();

        // Listen for resize
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [breakpoint]);

    return isMobile;
}

export function useIsSmallScreen(breakpoint = 640) {
    const [isSmall, setIsSmall] = useState(false);

    useEffect(() => {
        const checkSmall = () => {
            setIsSmall(window.innerWidth < breakpoint);
        };

        checkSmall();
        window.addEventListener('resize', checkSmall);
        return () => window.removeEventListener('resize', checkSmall);
    }, [breakpoint]);

    return isSmall;
}
