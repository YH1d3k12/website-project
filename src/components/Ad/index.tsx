import { useEffect, useMemo, useRef, useState } from 'react';
import './styles.css';

export type Ad = {
    id: string;
    title?: string;
    description?: string;
    image: string;
    alt?: string;
    ctaText?: string;
    ctaUrl?: string;
    sponsor?: string;
};

type Props = {
    ads?: Ad[];
    autoPlay?: boolean;
    interval?: number;
    className?: string;
    onAdClick?: (ad: Ad) => void;
    showControls?: boolean;
    showIndicators?: boolean;
    randomizeOnMount?: boolean;
};

function shuffle<T>(arr: T[], seed = Math.random()): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(seed * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const SAMPLE_ADS: Ad[] = [
    {
        id: 'sample-1',
        title: 'Discover Smarter Tools',
        description:
            'Get things done faster with our all-in-one productivity suite.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80&auto=format&fit=crop',
        alt: 'Laptop and coffee on a desk',
        ctaText: 'Try free',
        ctaUrl: '#',
        sponsor: 'Acme Co.',
    },
    {
        id: 'sample-2',
        title: 'Comfort Footwear Sale',
        description: 'Up to 50% off select styles — limited time only.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&q=80&auto=format&fit=crop',
        alt: 'Pair of shoes on display',
        ctaText: 'Shop now',
        ctaUrl: '#',
        sponsor: 'ShoeBrand',
    },
    {
        id: 'sample-3',
        title: 'Learn a New Skill',
        description: 'Short courses from industry experts. Start today.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80&auto=format&fit=crop',
        alt: 'Person learning on a laptop',
        ctaText: 'Browse courses',
        ctaUrl: '#',
        sponsor: 'EduPlatform',
    },
    {
        id: 'sample-4',
        title: 'Maria is looking for you',
        description: 'Maria is waiting for your message. Don\'t keep her waiting!',
        image: 'https://lanoticias.com.br/wp-content/uploads/2025/04/prostituta-que-diz-ter-ficado-com-neymar-agora-revela-outro-famoso-950x554.jpg',
        alt: 'Person',
        ctaText: 'Confirm',
        ctaUrl: '#',
        sponsor: 'XnXX',
    }
];

export default function RandomAdRotator({
    ads,
    autoPlay = true,
    interval = 5000,
    className = '',
    onAdClick,
    showControls = true,
    showIndicators = true,
    randomizeOnMount = true,
}: Props) {
    const initialAds = useMemo(() => {
        const source = (ads && ads.length ? ads : SAMPLE_ADS) as Ad[];
        return randomizeOnMount ? shuffle(source) : [...source];
    }, [ads]);

    const [items] = useState<Ad[]>(initialAds);
    const [index, setIndex] = useState<number>(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (!autoPlay || isPaused) return;
        timerRef.current = window.setTimeout(() => {
            setIndex(prev => (prev + 1) % items.length);
        }, interval) as unknown as number;

        return () => {
            if (timerRef.current) window.clearTimeout(timerRef.current);
        };
    }, [autoPlay, isPaused, index, interval, items.length]);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [items.length]);

    function goTo(i: number) {
        setIndex(((i % items.length) + items.length) % items.length);
    }

    function next() {
        setIndex(i => (i + 1) % items.length);
    }

    function prev() {
        setIndex(i => (i - 1 + items.length) % items.length);
    }

    function handleClick(ad: Ad) {
        onAdClick?.(ad);
        if (ad.ctaUrl) {
            window.open(ad.ctaUrl, '_blank', 'noopener,noreferrer');
        }
    }

    const current = items[index];

    return (
        <section
            className={`ad-rotator ${className}`}
            role="region"
            aria-label="Advertisement rotator"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="ad-card">
                <div className="ad-image-container">
                    <img
                        src={current.image}
                        alt={
                            current.alt ??
                            current.title ??
                            'Advertisement image'
                        }
                        loading="lazy"
                        className="ad-image"
                        onError={e => {
                            (e.target as HTMLImageElement).src =
                                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="20">Image not available</text></svg>';
                        }}
                    />
                    <div className="ad-overlay">
                        <div className="ad-info">
                            {current.title && (
                                <h3 className="ad-title">{current.title}</h3>
                            )}
                            {current.description && (
                                <p className="ad-desc">{current.description}</p>
                            )}
                            {current.sponsor && (
                                <div className="ad-sponsor">
                                    Sponsored by {current.sponsor}
                                </div>
                            )}
                            {current.ctaText && (
                                <button
                                    onClick={() => handleClick(current)}
                                    className="ad-cta"
                                >
                                    {current.ctaText}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {showControls && (
                    <>
                        <button
                            onClick={prev}
                            aria-label="Previous ad"
                            className="ad-btn ad-btn-prev"
                        >
                            ‹
                        </button>
                        <button
                            onClick={next}
                            aria-label="Next ad"
                            className="ad-btn ad-btn-next"
                        >
                            ›
                        </button>
                    </>
                )}

                {showIndicators && (
                    <div className="ad-indicators">
                        {items.map((a, i) => (
                            <button
                                key={a.id}
                                onClick={() => goTo(i)}
                                aria-label={`Show ad ${i + 1}`}
                                className={`ad-indicator ${
                                    i === index ? 'active' : ''
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div aria-live="polite" className="sr-only">
                {current.title}
            </div>
        </section>
    );
}
