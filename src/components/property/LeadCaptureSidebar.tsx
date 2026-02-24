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
        <div className="sticky top-12 bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -tranneutral-y-1/2 tranneutral-x-1/4 pointer-events-none group-hover:bg-white/10 transition-colors duration-700" />

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

            <LeadCaptureQuiz
                isOpen={isQuizOpen}
                onClose={() => setIsQuizOpen(false)}
                propertySlug={propertySlug}
                propertyTitle={propertyTitle}
            />
        </div>
    );
}
