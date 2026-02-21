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
            <div className={cn('bg-gradient-to-br from-card via-muted to-background', className)} />
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
