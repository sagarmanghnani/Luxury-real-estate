import Image from 'next/image';

interface BentoGridProps {
    images: string[];
}

export function BentoGrid({ images }: BentoGridProps) {
    if (!images || images.length < 3) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mt-12 mb-4 h-[800px] md:h-[600px] w-full">
            {/* Large Vertical Image (Spans 7 cols on Desktop) */}
            <div className="md:col-span-7 relative rounded-2xl overflow-hidden h-[400px] md:h-full group">
                <Image
                    src={images[0]}
                    alt="Property detail"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Two Smaller Horizontal Images (Spans 5 cols on Desktop) */}
            <div className="md:col-span-5 flex flex-col gap-4 md:gap-6 h-full">
                <div className="relative flex-1 rounded-2xl overflow-hidden h-[200px] md:h-auto group">
                    <Image
                        src={images[1]}
                        alt="Property detail"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="relative flex-1 rounded-2xl overflow-hidden h-[200px] md:h-auto group">
                    <Image
                        src={images[2]}
                        alt="Property detail"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
            </div>
        </div>
    );
}
