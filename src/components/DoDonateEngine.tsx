import React, { useState } from 'react';
import { CashWishlistItem, NGO } from '../types';
import { X, Smartphone, CreditCard, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface DoDonateEngineProps {
  ngo: NGO;
  item: CashWishlistItem;
  onClose: () => void;
  onSuccess: (amountFunded: number) => void;
}

export default function DoDonateEngine({ ngo, item, onClose, onSuccess }: DoDonateEngineProps) {
  const [amount, setAmount] = useState<string>('10000');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [provider, setProvider] = useState<'mtn' | 'orange'>('mtn');
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [progressMsg, setProgressMsg] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');

  const handleQuickSelect = (value: number) => {
    setAmount(value.toString());
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseInt(amount, 10);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }
    if (!phoneNumber || phoneNumber.length < 8) {
      alert('Please enter a valid Mobile Money phone number.');
      return;
    }

    // Start simulated checkout process
    setStep('processing');
    setProgressMsg('Securing tunnel with DoDonate payment server...');
    
    setTimeout(() => {
      setProgressMsg(`Sending Mobile Money USSD prompt to phone (+237 ${phoneNumber})...`);
    }, 1200);

    setTimeout(() => {
      setProgressMsg('Awaiting PIN authorization on your mobile device...');
    }, 2800);

    setTimeout(() => {
      setProgressMsg('Transaction confirmed! Allocating 100% of funds directly to NGO wallet...');
    }, 4500);

    setTimeout(() => {
      setStep('success');
      onSuccess(numAmount);
    }, 5800);
  };

  const remainingNeeded = Math.max(0, item.targetAmount - item.currentAmount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FAF9F3] border-4 border-brand-dark rounded-3xl shadow-2xl overflow-hidden animate-scale-up">
        
        {/* DoDonate branded top header bar */}
        <div className="bg-brand-dark text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="bg-[#00C853] text-white px-2 py-0.5 rounded-lg font-black text-sm">Do</span>
            <span className="bg-[#FFE600] text-black px-2 py-0.5 rounded-lg font-black text-sm">Donate</span>
            <span className="text-[10px] text-[#00C853] font-bold tracking-wider ml-1 uppercase">Payment Engine</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close funding panel"
          >
            <X className="w-5 h-5 text-gray-300 hover:text-white" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6">
          {step === 'details' && (
            <form onSubmit={validateAndSubmit} className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-800 flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">You are funding a specific need:</p>
                  <p className="font-medium mt-0.5 text-emerald-950">
                    "{item.title}" for <span className="font-bold text-brand-dark">{ngo.name}</span>
                  </p>
                  <div className="mt-2 flex gap-4 text-[11px] text-emerald-700">
                    <span>Target: <strong>{item.targetAmount.toLocaleString()} FCFA</strong></span>
                    <span>Funded: <strong>{item.currentAmount.toLocaleString()} FCFA</strong></span>
                  </div>
                </div>
              </div>

              {/* Amount input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Donation Amount (FCFA)
                </label>
                <div className="relative rounded-2xl shadow-sm">
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    max={remainingNeeded}
                    placeholder="Enter amount in FCFA"
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl text-lg font-bold font-mono focus:border-brand-green focus:outline-none transition-colors"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-bold text-xs font-mono">FCFA</span>
                  </div>
                </div>
                {/* Quick pre-sets */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {[2000, 5000, 10000, 25000, 50000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleQuickSelect(val)}
                      disabled={val > remainingNeeded}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                        amount === val.toString()
                          ? 'bg-brand-green text-white shadow-sm'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 disabled:opacity-50'
                      }`}
                    >
                      {val.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name (Optional) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Anonymous supporter"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-2xl focus:border-brand-green focus:outline-none transition-colors"
                />
              </div>

              {/* Provider Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Mobile Money Provider
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setProvider('mtn')}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${
                      provider === 'mtn'
                        ? 'border-[#FFE600] bg-[#FFE600]/10 ring-2 ring-[#FFE600]/30'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FFE600] text-black font-black text-xs flex items-center justify-center shadow-xs">
                      momo
                    </div>
                    <span className="text-xs font-extrabold text-gray-800">MTN MoMo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProvider('orange')}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${
                      provider === 'orange'
                        ? 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-500/30'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      om
                    </div>
                    <span className="text-xs font-extrabold text-gray-800">Orange Money</span>
                  </button>
                </div>
              </div>

              {/* Phone number */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Mobile Money Number (+237)
                </label>
                <div className="relative rounded-2xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-bold font-mono text-sm">+237</span>
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="677 12 34 56"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\s+/g, ''))}
                    className="w-full pl-16 pr-4 py-3 bg-white border-2 border-gray-200 rounded-2xl font-mono text-sm focus:border-brand-green focus:outline-none transition-colors"
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Enter your mobile number. You will receive an instant push notification on this phone to enter your PIN.
                </p>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-brand-green hover:bg-brand-green-hover text-white font-extrabold text-base py-3.5 px-6 rounded-2xl shadow-md transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <Smartphone className="w-5 h-5" />
                Initialize MoMo Transfer
              </button>

              <div className="flex items-center justify-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-widest pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Secured by DoDonate.org
              </div>
            </form>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
              {/* Spinner animation */}
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-brand-green border-t-transparent animate-spin"></div>
                <div className="absolute inset-4 rounded-full bg-brand-dark/5 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-brand-green animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-brand-dark font-display">Processing Secure Donation</h3>
                <p className="text-sm text-gray-600 max-w-sm px-4 min-h-[48px] transition-all duration-300 ease-in-out font-mono">
                  {progressMsg}
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 max-w-xs font-medium">
                ⚠️ Please do NOT refresh this page or close your browser tab.
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-10 flex flex-col items-center justify-center text-center space-y-5 animate-scale-up">
              <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg relative">
                <Heart className="w-10 h-10 animate-pulse fill-white" />
                <div className="absolute -top-1 -right-1 bg-yellow-400 text-black rounded-full p-1.5">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-brand-dark font-display">Moyo Wako Mzuri!</h3>
                <p className="text-sm font-bold text-brand-green">Donation of {parseInt(amount).toLocaleString()} FCFA Received!</p>
                <p className="text-xs text-gray-500 max-w-xs mx-auto pt-2">
                  Your donation goes directly to <span className="font-bold text-gray-800">{ngo.name}</span>'s account for "{item.title}". A digital donation receipt has been dispatched.
                </p>
              </div>

              <div className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs space-y-1.5 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-bold uppercase">Transaction ID</span>
                  <span className="font-mono font-bold text-gray-800">DD-TX-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-bold uppercase">Funded For</span>
                  <span className="font-medium text-gray-800">{ngo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-bold uppercase">Support Method</span>
                  <span className="font-bold text-gray-800 font-mono">
                    {provider === 'mtn' ? 'MTN MoMo' : 'Orange Money'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full bg-brand-dark hover:bg-brand-dark/90 text-white font-extrabold py-3 px-6 rounded-2xl shadow-sm transition-all"
              >
                Return to NGO Space
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
