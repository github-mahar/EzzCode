import { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            setDotPosition({ x: e.clientX, y: e.clientY });
            setIsHidden(false);

            // Check if hovering over interactive elements
            const target = e.target as HTMLElement;
            const isInteractive =
                target.closest('button') ||
                target.closest('a') ||
                target.closest('.cursor-pointer') ||
                getComputedStyle(target).cursor === 'pointer';

            setIsHovering(!!isInteractive);
        };

        const onMouseLeave = () => setIsHidden(true);
        const onMouseEnter = () => setIsHidden(false);

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
        };
    }, []);

    // Smooth follow for the trailing ring
    useEffect(() => {
        let requestRef: number;
        const followMouse = () => {
            setPosition(prev => ({
                x: prev.x + (dotPosition.x - prev.x) * 0.15,
                y: prev.y + (dotPosition.y - prev.y) * 0.15,
            }));
            requestRef = requestAnimationFrame(followMouse);
        };
        requestRef = requestAnimationFrame(followMouse);
        return () => cancelAnimationFrame(requestRef);
    }, [dotPosition]);

    if (typeof window === 'undefined') return null;

    return (
        <>
            {/* Outer Ring */}
            <div
                className={`fixed top-0 left-0 w-8 h-8 border-2 border-primary-500/50 rounded-full pointer-events-none z-[9999] transition-transform duration-200 ease-out flex items-center justify-center ${isHidden ? 'opacity-0' : 'opacity-100'
                    } ${isHovering ? 'scale-[2] border-primary-500 bg-primary-500/5 shadow-[0_0_20px_rgba(99,102,241,0.3)]' : 'scale-100'}`}
                style={{
                    transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0) ${isHovering ? 'scale(2)' : 'scale(1)'
                        }`,
                }}
            />
            {/* Inner Dot */}
            <div
                className={`fixed top-0 left-0 w-1.5 h-1.5 bg-primary-600 rounded-full pointer-events-none z-[10000] transition-transform duration-100 ${isHidden ? 'opacity-0' : 'opacity-100'
                    } ${isHovering ? 'scale-0' : 'scale-100'}`}
                style={{
                    transform: `translate3d(${dotPosition.x - 3}px, ${dotPosition.y - 3}px, 0)`,
                }}
            />
        </>
    );
}
