'use client';

import { useState } from 'react';
import { Calculator, DollarSign, Percent } from 'lucide-react';

interface RentalYieldCalculatorProps {
    propertyPrice: number;
}

export function RentalYieldCalculator({ propertyPrice }: RentalYieldCalculatorProps) {
    // Default values
    const defaultRent = Math.round((propertyPrice * 0.05) / 12); // Assuming 5% gross yield default
    const defaultExpenses = Math.round(propertyPrice * 0.015); // Assuming 1.5% annual expenses default

    const [purchasePrice, setPurchasePrice] = useState(propertyPrice);
    const [monthlyRent, setMonthlyRent] = useState(defaultRent);
    const [annualExpenses, setAnnualExpenses] = useState(defaultExpenses);

    const grossYield = purchasePrice > 0 ? ((monthlyRent * 12) / purchasePrice) * 100 : 0;
    const netYield = purchasePrice > 0 ? (((monthlyRent * 12) - annualExpenses) / purchasePrice) * 100 : 0;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: 'AED',
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -tranneutral-y-1/2 tranneutral-x-1/4 pointer-events-none" />

            <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="p-3 bg-white/10 rounded-xl">
                    <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-light tracking-wide text-white">Investment Calculator</h2>
                    <p className="text-sm text-neutral-400 font-medium uppercase tracking-widest mt-1">ROI & Yield Projections</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
                {/* Inputs Column */}
                <div className="md:col-span-7 space-y-8">
                    {/* Purchase Price Input */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-medium uppercase tracking-widest text-neutral-400">Purchase Price</label>
                            <span className="text-xl font-semibold text-white">{formatCurrency(purchasePrice)}</span>
                        </div>
                        <input
                            type="range"
                            min={propertyPrice * 0.5}
                            max={propertyPrice * 2}
                            step={10000}
                            value={purchasePrice}
                            onChange={(e) => setPurchasePrice(Number(e.target.value))}
                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-neutral-300 transition-all outline-none"
                        />
                    </div>

                    {/* Monthly Rent Input */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-medium uppercase tracking-widest text-neutral-400">Expected Monthly Rent</label>
                            <span className="text-xl font-semibold text-white">{formatCurrency(monthlyRent)}</span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={Math.round((propertyPrice * 0.15) / 12)}
                            step={100}
                            value={monthlyRent}
                            onChange={(e) => setMonthlyRent(Number(e.target.value))}
                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-neutral-300 transition-all outline-none"
                        />
                    </div>

                    {/* Annual Expenses Input */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-medium uppercase tracking-widest text-neutral-400">Annual Expenses (HOA, Taxes)</label>
                            <span className="text-xl font-semibold text-white">{formatCurrency(annualExpenses)}</span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={Math.round(propertyPrice * 0.05)}
                            step={500}
                            value={annualExpenses}
                            onChange={(e) => setAnnualExpenses(Number(e.target.value))}
                            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white hover:accent-neutral-300 transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Results Column */}
                <div className="md:col-span-5 flex flex-col justify-center gap-6">
                    {/* Gross Yield Card */}
                    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden group hover:border-neutral-700 transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-neutral-700 group-hover:bg-white transition-colors" />
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Gross Yield</p>
                            <Percent className="w-4 h-4 text-neutral-500" />
                        </div>
                        <div className="text-4xl md:text-5xl font-light tracking-tight text-white mb-1">
                            {grossYield.toFixed(2)}%
                        </div>
                        <p className="text-xs text-neutral-500 font-medium">Before expenses</p>
                    </div>

                    {/* Net Yield Card */}
                    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden group hover:border-neutral-700 transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-green-500/50 group-hover:bg-green-400 transition-colors" />
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Net Yield</p>
                            <DollarSign className="w-4 h-4 text-neutral-500" />
                        </div>
                        <div className="text-4xl md:text-5xl font-light tracking-tight text-white mb-1">
                            {netYield.toFixed(2)}%
                        </div>
                        <p className="text-xs text-neutral-500 font-medium">After {formatCurrency(annualExpenses)} in expenses</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
