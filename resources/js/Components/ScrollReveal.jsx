import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    threshold = 0.15,
    className = '',
}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    const hiddenClass = {
        up: 'scroll-hidden',
        left: 'scroll-hidden-left',
        right: 'scroll-hidden-right',
        scale: 'scroll-hidden-scale',
    }[direction] || 'scroll-hidden';

    const visibleClass = {
        up: 'scroll-visible',
        left: 'scroll-visible-left',
        right: 'scroll-visible-right',
        scale: 'scroll-visible-scale',
    }[direction] || 'scroll-visible';

    return (
        <div
            ref={ref}
            className={`${isVisible ? visibleClass : hiddenClass} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
