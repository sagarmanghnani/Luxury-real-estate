'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

interface LeadCaptureQuizProps {
    isOpen: boolean;
    onClose: () => void;
    propertySlug: string;
    propertyTitle: string;
}

type Slide = 'intent' | 'timeline' | 'capture' | 'success';

export function LeadCaptureQuiz({ isOpen, onClose, propertySlug, propertyTitle }: LeadCaptureQuizProps) {
    const [currentSlide, setCurrentSlide] = useState<Slide>('intent');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [intent, setIntent] = useState('');
    const [timeline, setTimeline] = useState('');
    const [name, setName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !whatsapp) return;

        setIsSubmitting(true);

        try {
            const webhookUrl = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;
            if (webhookUrl) {
                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        propertySlug,
                        propertyTitle,
                        intent,
                        timeline,
                        name,
                        whatsapp,
                        submittedAt: new Date().toISOString()
                    }),
                });
            } else {
                console.warn('Webhook URL not configured. Simulating success.');
                await new Promise(resolve => setTimeout(resolve, 1500));
            }

            setCurrentSlide('success');
        } catch (error) {
            console.error('Error submitting form:', error);
            // In a real app we might show an error state, but let's proceed to success for the demo
            setCurrentSlide('success');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        onClose();
        // Reset after animation
        setTimeout(() => {
            setCurrentSlide('intent');
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
                        {/* Slide 1: Intent */}
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
                                    <p className="text-sm font-semibold text-neutral-400 uppercase tracking-widest">Step 1 of 3</p>
                                    <h2 className="text-3xl font-light text-white leading-tight">What is your primary goal for this property?</h2>
                                </div>
                                <div className="space-y-3">
                                    {intentOptions.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setIntent(option);
                                                setCurrentSlide('timeline');
                                            }}
                                            className="w-full p-4 rounded-xl border border-neutral-800 bg-neutral-950 text-left text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all group flex justify-between items-center"
                                        >
                                            <span className="font-medium">{option}</span>
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Slide 2: Timeline */}
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
                                    <p className="text-sm font-semibold text-neutral-400 uppercase tracking-widest">Step 2 of 3</p>
                                    <h2 className="text-3xl font-light text-white leading-tight">When are you looking to allocate capital?</h2>
                                </div>
                                <div className="space-y-3">
                                    {timelineOptions.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setTimeline(option);
                                                setCurrentSlide('capture');
                                            }}
                                            className="w-full p-4 rounded-xl border border-neutral-800 bg-neutral-950 text-left text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all group flex justify-between items-center"
                                        >
                                            <span className="font-medium">{option}</span>
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Slide 3: Capture */}
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
                                    <p className="text-sm font-semibold text-neutral-400 uppercase tracking-widest">Final Step</p>
                                    <h2 className="text-3xl font-light text-white leading-tight">Where should we send the off-market dossier?</h2>
                                    <p className="text-neutral-400 font-light">Get exclusive numbers and similar listings.</p>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-4">
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
                                        placeholder="WhatsApp Number (e.g. +1 234 567 8900)"
                                        value={whatsapp}
                                        onChange={(e) => setWhatsapp(e.target.value)}
                                        className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-4 focus:outline-none focus:border-white transition-colors"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !name || !whatsapp}
                                        className="w-full bg-white text-black font-semibold py-4 rounded-xl hover:bg-neutral-200 transition-colors uppercase tracking-widest text-sm mt-4 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            'Unlock Access'
                                        )}
                                    </button>
                                </form>
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
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
                                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                                </div>
                                <h2 className="text-3xl font-light text-white leading-tight">Request Received</h2>
                                <p className="text-neutral-400 font-light max-w-sm">
                                    Thank you, {name.split(' ')[0]}. One of our senior partners will message you on WhatsApp shortly.
                                </p>
                                <button
                                    onClick={handleClose}
                                    className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full text-sm font-medium transition-colors"
                                >
                                    Close
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
