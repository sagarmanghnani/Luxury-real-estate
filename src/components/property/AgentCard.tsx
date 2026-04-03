'use client';

import Image from 'next/image';

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
);

export function AgentCard() {
    const handleWhatsAppClick = () => {
        const text = encodeURIComponent(`Hi, I'm interested in learning more about the property.`);
        window.open(`https://wa.me/971501234567?text=${text}`, '_blank');
    };

    return (
        <div className="hidden lg:block bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl mt-8">
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-6">Listing Agent</h4>
            
            <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-neutral-800">
                    <Image 
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
                        alt="Agent Profile" 
                        fill 
                        className="object-cover"
                    />
                </div>
                <div>
                    <h3 className="text-lg font-medium text-white">Alexander Sterling</h3>
                    <p className="text-sm font-light text-[#C5A880]">Senior Partner</p>
                </div>
            </div>

            <button
                onClick={handleWhatsAppClick}
                className="w-full relative overflow-hidden group bg-neutral-950 border border-neutral-800 text-white font-medium py-3 rounded-xl transition-all flex justify-center items-center gap-2 hover:border-[#C5A880]/50"
            >
                {/* Subtle glassmorphism/glow effect */}
                <div className="absolute inset-0 bg-[#C5A880]/0 group-hover:bg-[#C5A880]/10 transition-colors duration-500" />
                
                <span className="relative z-10 text-sm tracking-wide">Secure Conversation</span>
                <WhatsAppIcon className="w-4 h-4 text-[#C5A880] relative z-10 transition-transform group-hover:scale-110" />
            </button>
        </div>
    );
}
