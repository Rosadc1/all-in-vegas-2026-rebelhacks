import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps {
    src?: string;
    alt: string;
    className?: string;
}

export function ImageWithFallback({ src, alt, className }: ImageWithFallbackProps) {
    const [errored, setErrored] = useState(false);

    if (!src || errored) {
        return (
            <div className={cn('flex items-end justify-start bg-gradient-to-br from-card via-muted to-background', className)}>
                <span className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">{alt}</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setErrored(true)}
        />
    );
}
