import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (isHidden) setIsHidden(false);

            // Fast check for interactive elements
            const target = e.target as HTMLElement;
            if (target) {
                const isInteractive =
                    target.closest('button') ||
                    target.closest('a') ||
                    target.closest('.cursor-pointer') ||
                    getComputedStyle(target).cursor === 'pointer';

                setIsHovering(!!isInteractive);
            }
        };

        const onMouseLeave = () => setIsHidden(true);
        const onMouseEnter = () => setIsHidden(false);

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        let rafId: number;
        const updateCursor = () => {
            // Direct DOM mutation for maximum fluidness
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
            }

            if (ringRef.current) {
                // High-quality LERP (Linear Interpolation)
                ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.2;
                ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.2;
                ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
            }

            rafId = requestAnimationFrame(updateCursor);
        };
        rafId = requestAnimationFrame(updateCursor);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            cancelAnimationFrame(rafId);
        };
    }, [isHidden]);

    if (typeof window === 'undefined') return null;

    return (
        <>
            {/* Trailing Ring */}
            <div
                ref={ringRef}
                className={`fixed top-0 left-0 w-10 h-10 border-2 border-primary-500/40 rounded-full pointer-events-none z-[9999] -ml-5 -mt-5 transition-[opacity,width,height,background-color,border-color,box-shadow] duration-300 ease-out will-change-transform ${isHidden ? 'opacity-0' : 'opacity-100'
                    } ${isHovering ? 'w-16 h-16 -ml-8 -mt-8 border-primary-500 bg-primary-500/10 shadow-[0_0_25px_rgba(99,102,241,0.4)]' : ''}`}
            />
            {/* Inner Dot */}
            <div
                ref={dotRef}
                className={`fixed top-0 left-0 w-1.5 h-1.5 bg-primary-600 rounded-full pointer-events-none z-[10000] -ml-[3px] -mt-[3px] transition-[opacity,transform] duration-200 will-change-transform ${isHidden ? 'opacity-0' : 'opacity-100'
                    } ${isHovering ? 'scale-[2.5] opacity-50' : 'scale-100'}`}
            />
        </>
    );
}
