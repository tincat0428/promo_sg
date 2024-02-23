import { useState, useEffect } from 'react';

const BREAK_POINT = 768;

const RWD = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < BREAK_POINT);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < BREAK_POINT);
            if (window.innerWidth < BREAK_POINT) {
                document.body.classList.add('mobile');
            } else {
                document.body.classList.remove('mobile');
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { isMobile };
};

export default RWD;
