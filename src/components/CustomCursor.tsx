import { useEffect, useRef, useState } from 'react';
import { Maximize2, ArrowUpRight, Type } from 'lucide-react';

type CursorType = 'default' | 'link' | 'image' | 'text';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: -100, y: -100 });
    const ringPos = useRef({ x: -100, y: -100 });
    const [cursorType, setCursorType] = useState<CursorType>('default');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let lastType: CursorType = 'default';

        const onMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);

            const target = e.target as HTMLElement;
            if (!target) return;

            // Type Detection
            let newType: CursorType = 'default';
            const isInteractive = target.closest('a') || target.closest('button') || target.closest('.cursor-pointer') || target.closest('select');
            const isMedia = target.closest('img') || target.tagName === 'IMG' || target.closest('.category-image-container');
            const isWriting = target.closest('input') || target.closest('textarea') || target.closest('.rich-text-content');

            if (isInteractive) newType = 'link';
            else if (isMedia) newType = 'image';
            else if (isWriting) newType = 'text';

            if (newType !== lastType) {
                lastType = newType;
                setCursorType(newType);
            }
        };

        const onMouseDown = () => document.body.classList.add('cursor-active');
        const onMouseUp = () => document.body.classList.remove('cursor-active');
        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        let rafId: number;
        const updateCursor = () => {
            // Dot - Absolute 1:1 follow
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
            }

            // Ring - Smooth Lerp
            if (ringRef.current) {
                ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.25;
                ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.25;
                ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
            }

            rafId = requestAnimationFrame(updateCursor);
        };
        rafId = requestAnimationFrame(updateCursor);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            cancelAnimationFrame(rafId);
        };
    }, [isVisible]); // Keep isVisible as dependency for entry/exit logic

    if (typeof window === 'undefined') return null;

    const isLink = cursorType === 'link';
    const isImage = cursorType === 'image';
    const isText = cursorType === 'text';

    return (
        <>
            {/* ── Trailing Ring (Smooth LERP) ── */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center will-change-transform"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            >
                <div className={`transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) border-2 rounded-full flex items-center justify-center shadow-lg
          ${isLink ? 'w-14 h-14 border-primary-500 bg-primary-500/10 shadow-primary-500/20' :
                        isImage ? 'w-22 h-22 border-emerald-500 bg-emerald-500/10 shadow-emerald-500/20' :
                            isText ? 'w-8 h-12 border-l-2 border-r-2 border-t-0 border-b-0 border-primary-400 rounded-none bg-primary-400/5 shadow-none' :
                                'w-10 h-10 border-slate-400/30 bg-transparent shadow-none'}`}
                >
                    {/* Morphing Icons */}
                    <ArrowUpRight className={`h-5 w-5 text-primary-600 dark:text-primary-400 transition-all duration-300 ${isLink ? 'scale-100 opacity-100' : 'scale-0 opacity-0 absolute'}`} />
                    <Maximize2 className={`h-6 w-6 text-emerald-600 dark:text-emerald-400 transition-all duration-300 ${isImage ? 'scale-100 opacity-100' : 'scale-0 opacity-0 absolute'}`} />
                    <Type className={`h-4 w-4 text-primary-500 transition-all duration-300 ${isText ? 'scale-100 opacity-100' : 'scale-0 opacity-0 absolute'}`} />
                </div>
            </div>

            {/* ── Leader Dot (1:1 Follow) ── */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 pointer-events-none z-[10001] flex items-center justify-center will-change-transform"
                style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.2s linear' }}
            >
                <div className={`transition-all duration-300 rounded-full bg-primary-600
          ${isLink || isImage ? 'w-0 h-0 opacity-0 scale-0' :
                        isText ? 'w-0.5 h-6 rounded-sm' :
                            'w-1.5 h-1.5 opacity-100 scale-100 shadow-[0_0_10px_rgba(99,102,241,0.5)]'}`}
                />
            </div>
        </>
    );
}
