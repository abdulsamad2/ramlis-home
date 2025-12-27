import { cn } from '@/lib/utils';

interface ProductImageWatermarkProps {
  className?: string;
  opacity?: number;
}

export default function ProductImageWatermark({ 
  className,
  opacity = 0.2
}: ProductImageWatermarkProps) {
  return (
    <div 
      className={cn(
        "absolute inset-0 pointer-events-none select-none overflow-hidden z-[1] flex items-center justify-center",
        className
      )}
    >
      <div
        style={{
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          color: `rgba(255, 255, 255, ${opacity})`,
          textShadow: `0 2px 4px rgba(0, 0, 0, 0.3)`,
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          letterSpacing: '0.1em',
          fontWeight: '600',
          textTransform: 'uppercase',
          transform: 'rotate(-20deg)'
        }}
      >
        RAMLISHOME™
      </div>
    </div>
  );
}
