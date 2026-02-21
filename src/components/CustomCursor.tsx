import { useEffect, useRef, useState } from 'react';
import { Maximize2, ArrowUpRight, Type } from 'lucide-react';

type CursorType = 'default' | 'link' | 'image' | 'text';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });
    const [cursorType, setCursorType] = useState<CursorType>('default');
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (isHidden) setIsHidden(false);

            const target = e.target as HTMLElement;
            if (!target) return;

            // Type Detection
            if (target.closest('a') || target.closest('button') || target.closest('.cursor-pointer')) {
                setCursorType('link');
            } else if (target.closest('img') || target.tagName === 'IMG' || target.closest('.category-image-container')) {
                setCursorType('image');
            } else if (target.closest('input') || target.closest('textarea') || target.closest('.rich-text-content')) {
                setCursorType('text');
            } else {
                setCursorType('default');
            }
        };

        const onMouseLeave = () => setIsHidden(true);
        const onMouseEnter = () => setIsHidden(false);

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        let rafId: number;
        const updateCursor = () => {
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
            }

            if (ringRef.current) {
                // Precise LERP for smooth following
                ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
                ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;
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

    // Custom states based on type
    const isLink = cursorType === 'link';
    const isImage = cursorType === 'image';
    const isText = cursorType === 'text';

    return (
        <>
            {/* Trailing Ring */}
            <div
                ref={ringRef}
                className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center transition-all duration-300 ease-out will-change-transform ${isHidden ? 'opacity-0' : 'opacity-100'
                    } ${isLink
                        ? 'w-16 h-16 -ml-8 -mt-8 border-2 border-primary-500 bg-primary-500/10 shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                        : isImage
                            ? 'w-24 h-24 -ml-12 -mt-12 border-2 border-emerald-500 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                            : isText
                                ? 'w-10 h-14 -ml-5 -mt-7 border-l-2 border-r-2 border-t-0 border-b-0 border-primary-400 rounded-none bg-primary-400/5'
                                : 'w-10 h-10 -ml-5 -mt-5 border-2 border-primary-500/40 bg-transparent'
                    }`}
            >
                {/* Icons appearing inside the ring */}
                <div className={`transition-all duration-300 ${isLink ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                    <ArrowUpRight className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className={`absolute transition-all duration-300 ${isImage ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                    <Maximize2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className={`absolute transition-all duration-300 ${isText ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                    <Type className="h-4 w-4 text-primary-500" />
                </div>
            </div>

            {/* Inner Dot */}
            <div
                ref={dotRef}
                className={`fixed top-0 left-0 rounded-full pointer-events-none z-[10000] transition-all duration-200 will-change-transform ${isHidden ? 'opacity-0' : 'opacity-100'
                    } ${isLink
                        ? 'w-2 h-2 -ml-1 -mt-1 bg-primary-600 scale-[2] opacity-0'
                        : isImage
                            ? 'w-2 h-2 -ml-1 -mt-1 bg-emerald-600 scale-0'
                            : isText
                                ? 'w-0.5 h-full max-h-8 -ml-[1px] -mt-4 bg-primary-500 rounded-sm'
                                : 'w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-primary-600'
                    }`}
            />
        </>
    );
}
