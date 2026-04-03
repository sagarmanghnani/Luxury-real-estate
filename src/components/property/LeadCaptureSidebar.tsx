'use client';

import { useState } from 'react';
import { LeadCaptureQuiz } from './LeadCaptureQuiz';
import { Sparkles } from 'lucide-react';

interface LeadCaptureSidebarProps {
    propertySlug: string;
    propertyTitle: string;
}

export function LeadCaptureSidebar({ propertySlug, propertyTitle }: LeadCaptureSidebarProps) {
    const [isQuizOpen, setIsQuizOpen] = useState(false);

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none group-hover:bg-white/10 transition-colors duration-700" />

                <h3 className="text-xl font-semibold mb-3 uppercase tracking-wider text-white relative z-10">Access the Off-Market Dossier</h3>
                <p className="text-neutral-400 mb-8 font-light relative z-10 leading-relaxed text-sm">
                    Unlock exclusive financials, comparables, and similar unlisted properties for this listing by speaking directly with our senior partners.
                </p>

                <button
                    onClick={() => setIsQuizOpen(true)}
                    className="w-full bg-white text-black font-semibold py-4 rounded-xl hover:bg-neutral-200 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 group relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                >
                    <span>Request Details</span>
                    <Sparkles className="w-4 h-4" />
                </button>
            </div>

            {/* Mobile Sticky Action Bar */}
            <div className="lg:hidden fixed bottom-6 left-4 right-4 bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-2xl p-4 z-40 flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-widest">Interested?</h4>
                    <p className="text-xs text-neutral-400 font-light mt-0.5">Get the off-market dossier</p>
                </div>
                <button
                    onClick={() => setIsQuizOpen(true)}
                    className="bg-white text-black px-5 py-3 rounded-xl font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                    <span>Unlock</span>
                    <Sparkles className="w-3 h-3" />
                </button>
            </div>

            <LeadCaptureQuiz
                isOpen={isQuizOpen}
                onClose={() => setIsQuizOpen(false)}
                propertySlug={propertySlug}
                propertyTitle={propertyTitle}
            />
        </>
    );
}
