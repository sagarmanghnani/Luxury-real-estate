'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, Loader2, Lock } from 'lucide-react';

interface LeadCaptureQuizProps {
    isOpen: boolean;
    onClose: () => void;
    propertySlug: string;
    propertyTitle: string;
}

type Slide = 'capture' | 'intent' | 'timeline' | 'success';

export function LeadCaptureQuiz({ isOpen, onClose, propertySlug, propertyTitle }: LeadCaptureQuizProps) {
    const [currentSlide, setCurrentSlide] = useState<Slide>('capture');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [intent, setIntent] = useState('');
    const [timeline, setTimeline] = useState('');

    const submitToMake = async (leadType: 'partial' | 'premium', currentIntent: string = '', currentTimeline: string = '') => {
        try {
            const webhookUrl = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;
            if (webhookUrl) {
                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        leadType, // 'partial' or 'premium'
                        propertySlug,
                        propertyTitle,
                        name,
                        whatsapp,
                        intent: currentIntent,
                        timeline: currentTimeline,
                        submittedAt: new Date().toISOString()
                    }),
                });
            } else {
                console.warn('Webhook URL not configured. Simulating success.');
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } catch (error) {
            console.error('Error submitting to webhook:', error);
        }
    };

    const handleCaptureSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !whatsapp) return;

        setIsSubmitting(true);
        // Fire partial lead - they showed initial interest and gave details
        await submitToMake('partial');
        setIsSubmitting(false);

        setCurrentSlide('intent');
    };

    const handleIntentSelect = (option: string) => {
        setIntent(option);
        setCurrentSlide('timeline');
    };

    const handleTimelineSelect = async (option: string) => {
        setTimeline(option);
        setIsSubmitting(true);
        // Fire premium lead - they completed the entire funnel
        await submitToMake('premium', intent, option);
        setIsSubmitting(false);
        setCurrentSlide('success');
    };

    const handleClose = () => {
        onClose();
        // Reset after animation
        setTimeout(() => {
            setCurrentSlide('capture');
            setIntent('');
            setTimeline('');
            setName('');
            setWhatsapp('');
        }, 500);
    };

    if (!isOpen) return null;

    const intentOptions = ['Primary Residence', 'Vacation Home', 'High-Yield Investment'];
    const timelineOptions = ['Immediately', '3-6 Months', 'Just Browsing'];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors z-20"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center relative">
                    <AnimatePresence mode="wait">

                        {/* Slide 1: Capture (Moved to Front) */}
                        {currentSlide === 'capture' && (
                            <motion.div
                                key="capture"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-neutral-400 uppercase tracking-widest">
                                        <Lock className="w-4 h-4" />
                                        <span>Restricted Access</span>
                                    </div>
                                    <h2 className="text-3xl font-light text-white leading-tight">Unlock the Off-Market Dossier</h2>
                                    <p className="text-neutral-400 font-light text-sm">Where should we send the financials and unlisted comparables?</p>
                                </div>
                                <form onSubmit={handleCaptureSubmit} className="space-y-4">
                                    <input
                                        type="text"
                                        required
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-4 focus:outline-none focus:border-white transition-colors"
                                    />
                                    <input
                                        type="tel"
                                        required
                                        placeholder="WhatsApp Number"
                                        value={whatsapp}
                                        onChange={(e) => setWhatsapp(e.target.value)}
                                        className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-4 focus:outline-none focus:border-white transition-colors"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !name || !whatsapp}
                                        className="w-full bg-white text-black font-semibold py-4 rounded-xl hover:bg-neutral-200 transition-colors uppercase tracking-widest text-sm mt-4 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <span>Continue</span>
                                                <ArrowRight className="w-4 h-4 group-hover:tranneutral-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {/* Slide 2: Intent (Secondary) */}
                        {currentSlide === 'intent' && (
                            <motion.div
                                key="intent"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                <div className="space-y-3">
                                    <p className="text-sm font-semibold text-neutral-400 uppercase tracking-widest">Personalizing your dossier...</p>
                                    <h2 className="text-3xl font-light text-white leading-tight">What is your primary goal for this property?</h2>
                                </div>
                                <div className="space-y-3">
                                    {intentOptions.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => handleIntentSelect(option)}
                                            className="w-full p-4 rounded-xl border border-neutral-800 bg-neutral-950 text-left text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all group flex justify-between items-center"
                                        >
                                            <span className="font-medium">{option}</span>
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Slide 3: Timeline (Final) */}
                        {currentSlide === 'timeline' && (
                            <motion.div
                                key="timeline"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                <div className="space-y-3">
                                    <p className="text-sm font-semibold text-neutral-400 uppercase tracking-widest">Final Question</p>
                                    <h2 className="text-3xl font-light text-white leading-tight">When are you looking to allocate capital?</h2>
                                </div>
                                <div className="space-y-3">
                                    {timelineOptions.map((option) => (
                                        <button
                                            key={option}
                                            disabled={isSubmitting}
                                            onClick={() => handleTimelineSelect(option)}
                                            className="w-full p-4 rounded-xl border border-neutral-800 bg-neutral-950 text-left text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all group flex justify-between items-center disabled:opacity-50"
                                        >
                                            <span className="font-medium">{option}</span>
                                            {isSubmitting ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <CheckCircle2 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Slide 4: Success */}
                        {currentSlide === 'success' && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col items-center text-center space-y-6"
                            >
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                                </div>
                                <h2 className="text-3xl font-light text-white leading-tight">Dossier Unlocked</h2>
                                <p className="text-neutral-400 font-light max-w-sm">
                                    Thank you, {name.split(' ')[0]}. We have expedited your request. Our senior partner will WhatsApp you shortly with the financials.
                                </p>
                                <button
                                    onClick={handleClose}
                                    className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full text-sm font-medium transition-colors mt-4"
                                >
                                    Return to Property
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
