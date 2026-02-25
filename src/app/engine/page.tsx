import Navbar from '@/components/layout/Navbar';
import ClientSuccessStories from '@/components/testimonials/ClientSuccessStories';
import Link from 'next/link';
import { ArrowRight, Zap, Target, Repeat } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The Luxe Engine Approach',
    robots: {
        index: false,
        follow: false,
    },
};

export default function EnginePitchPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#C5A880] selection:text-black">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-40 pb-20 px-6 max-w-5xl mx-auto text-center border-b border-white/5">
                <div className="inline-flex items-center space-x-2 px-3 py-1 mb-8 border border-[#C5A880]/30 rounded-full bg-[#C5A880]/10 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse"></span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-medium">Private Briefing</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-8 leading-tight">
                    Elevating Real Estate to an <span className="text-[#C5A880] italic">Art Form</span>
                </h1>

                <p className="text-white/60 font-sans tracking-wide max-w-3xl mx-auto font-light leading-relaxed text-lg lg:text-xl mb-16">
                    We don't just list properties; we engineer market dominance. Our proprietary platform and elite network ensure your legacy asset reaches the world's most capable buyers with absolute precision and discretion.
                </p>

                {/* Core Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-16 max-w-4xl mx-auto">
                    <div className="p-6 border border-white/5 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors">
                        <Zap className="w-6 h-6 text-[#C5A880] mb-4" />
                        <h3 className="font-serif text-xl mb-2">Sub-Second Load Times</h3>
                        <p className="text-white/50 text-sm font-light">Engineered for instantaneous delivery. We hold buyer attention longer, decreasing bounce rates on eight-figure listings.</p>
                    </div>
                    <div className="p-6 border border-white/5 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors">
                        <Repeat className="w-6 h-6 text-[#C5A880] mb-4" />
                        <h3 className="font-serif text-xl mb-2">Direct CRM Webhooks</h3>
                        <p className="text-white/50 text-sm font-light">Qualified UHNW leads instantly route into your secure infrastructure. Zero delay. Zero friction.</p>
                    </div>
                    <div className="p-6 border border-white/5 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors">
                        <Target className="w-6 h-6 text-[#C5A880] mb-4" />
                        <h3 className="font-serif text-xl mb-2">Zero-Friction Lead Capture</h3>
                        <p className="text-white/50 text-sm font-light">Interactive qualification funnels that seamlessly capture intent while maintaining an ultra-premium aesthetic.</p>
                    </div>
                </div>
            </div>

            {/* Testimonial Section */}
            <div className="py-10 bg-black relative">
                {/* Subtle Glow Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.03)_0%,transparent_70%)] pointer-events-none" />
                <ClientSuccessStories />
            </div>

            {/* Final CTA */}
            <div className="py-32 px-6 text-center max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-serif font-light mb-12 text-white/90">
                    Your Asset. Our Engine. <br />
                    <span className="text-white/40 italic">Unmatched Results.</span>
                </h2>

                <div className="flex justify-center">
                    <Link
                        href="/"
                        className="group flex items-center gap-4 bg-[#C5A880] text-black px-10 py-5 rounded-full text-sm font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-[0_0_30px_rgba(197,168,128,0.2)] hover:shadow-[0_0_40px_rgba(197,168,128,0.4)] hover:scale-105"
                    >
                        <span>Enter the Live Realtor Demo</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="w-px h-24 bg-gradient-to-b from-[#C5A880] to-transparent mx-auto opacity-50 mt-16 mb-8"></div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-sans text-white/30">
                    Confidential &bull; Exclusive &bull; Proven
                </div>
            </div>

        </main>
    );
}
