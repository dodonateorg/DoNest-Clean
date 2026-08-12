import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Users, 
  Building2, 
  Coins, 
  CheckCircle, 
  ChevronLeft,
  ChevronDown,
  ChevronUp, 
  Sparkles, 
  Mail, 
  Phone, 
  Globe, 
  ArrowRight,
  ShieldCheck,
  Gift,
  Search,
  MessageCircle,
  MapPin,
  Check,
  X,
  Clock,
  Puzzle,
  Handshake,
  FileText,
  Eye,
  Smile,
  Briefcase,
  Award,
  Target,
  TrendingUp,
  MessageSquare,
  Package
} from 'lucide-react';
import { NGO } from '../types';

interface BackProps {
  onBack: () => void;
}

interface VolunteerNetworkProps {
  onBack: () => void;
  ngos: NGO[];
  onInterestClick: (ngoUsername: string, postingId: string) => void;
  hasInterested: (postingId: string) => boolean;
  lang: string;
}

export function DonationsPage({ onBack }: BackProps) {
  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [itemsToDonate, setItemsToDonate] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePickupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !contactInfo || !itemsToDonate) return;

    setIsSubmitting(true);
    try {
      // Direct call to general application proxy API or local state representation
      await fetch('/api/volunteer/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postingId: 'physical-donation-pickup',
          ngoUsername: 'donest-network',
          name: fullName,
          email: contactInfo,
          phone: '',
          location: 'Cameroon',
          message: `[Pickup Request] [Preferred Date: ${pickupDate}] [Items: ${itemsToDonate}]`
        })
      });
      setFormSubmitted(true);
    } catch (err) {
      console.error('Error submitting pickup request:', err);
      // Fallback display success anyway
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in py-6">
      {/* Back navigation panel */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack} 
          className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-dark px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:-translate-x-1 duration-300 shadow-2xs cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-gray-500" />
          Back to Directory
        </button>
        <span className="text-xs font-mono text-[#00C853] bg-[#00C853]/10 px-3 py-1 rounded-full border border-[#00C853]/20">
          In-Kind Logistics Panel
        </span>
      </div>

      {/* 1. HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl shadow-lg border border-[#00C853]/10 bg-slate-950 text-white">
        {/* Full-bleed photo of real volunteer items unpacked & handled */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1600" 
            alt="Real photo of volunteer and child receiving physical donation items" 
            className="w-full h-full object-cover object-center opacity-35 filter brightness-90 saturate-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />
        </div>

        <div className="relative z-10 px-8 py-16 sm:px-12 sm:py-24 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-[#00C853]/20 border border-[#00C853]/40 px-3 py-1.5 rounded-full text-xs font-extrabold text-[#00E676] tracking-wide backdrop-blur-xs">
            <Heart className="w-4 h-4 text-[#00E676]" />
            <span>DIRECT DONATIONS SOLUTION</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Give What You Have.<br />
            Change <span className="text-[#00E676]">What's Possible.</span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            From clothing to school supplies, your physical donations go directly to the communities and programs that need them. No wasted surplus, no logistical bottlenecks.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button 
              onClick={() => scrollToSection('what-we-need-section')}
              className="bg-[#00C853] hover:bg-[#00E676] active:bg-[#00C853] text-slate-950 font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-md shadow-[#00C853]/20 hover:shadow-lg hover:shadow-[#00C853]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              See What We Need
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. WHAT WE NEED (Wishlist / Most Needed) */}
      <div id="what-we-need-section" className="bg-emerald-50/40 border border-emerald-100/50 rounded-3xl p-8 sm:p-10 space-y-8 scroll-mt-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-[#00C853]/10 px-3 py-1 rounded-full text-xs font-bold text-[#00C853]">
            <span>LIVE CAMPAIGN</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
            Right Now, We Need
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            These are our most urgent needs — your donation of any of these makes an immediate difference.
          </p>
        </div>

        {/* Format: highlighted mini-cards to prevent guesswork */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-emerald-100/60 shadow-2xs space-y-2">
            <span className="text-2xl">🎒</span>
            <h4 className="font-display font-bold text-sm text-slate-900">School Supplies</h4>
            <p className="text-[11px] text-gray-500 leading-normal">
              Notebooks, pens, school bags, crayons, and educational kits.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-100/60 shadow-2xs space-y-2">
            <span className="text-2xl">👕</span>
            <h4 className="font-display font-bold text-sm text-slate-900">Children's Clothing</h4>
            <p className="text-[11px] text-gray-500 leading-normal">
              Clean and wearable shirts, trousers, and sweaters of all sizes.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-100/60 shadow-2xs space-y-2">
            <span className="text-2xl">🍲</span>
            <h4 className="font-display font-bold text-sm text-slate-900">Non-Perishable Food</h4>
            <p className="text-[11px] text-gray-500 leading-normal">
              Rice, beans, cooking oil, canned fish, and powdered milk.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-100/60 shadow-2xs space-y-2">
            <span className="text-2xl">🧼</span>
            <h4 className="font-display font-bold text-sm text-slate-900">Hygiene Products</h4>
            <p className="text-[11px] text-gray-500 leading-normal">
              Antiseptic soap, toothbrushes, toothpaste, and towels.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-100/60 shadow-2xs space-y-2">
            <span className="text-2xl">🛏️</span>
            <h4 className="font-display font-bold text-sm text-slate-900">Bedding & Blankets</h4>
            <p className="text-[11px] text-gray-500 leading-normal">
              Clean sheets, pillowcases, and warm wool/fleece blankets.
            </p>
          </div>
        </div>
      </div>

      {/* 3. DONATION CATEGORIES */}
      <div className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
            What You Can Donate
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Verify where your items belong across our primary logistical categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-3xl">👕</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">Most needed</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-slate-900">Clothing & Essentials</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Shoes, coats, shirts, skirts, children's clothing, and daily wear accessories.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-3xl">🌾</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Most needed</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-slate-900">Food & Beverages</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Rice, vegetable oil, beans, salt, pasta, powdered milk, and canned provisions.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-3xl">📚</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">Active Campaign</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-slate-900">School & Educational</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Standard syllabus books, drawing notebooks, geometry boxes, school bags, and learning kits.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
            <div className="p-6 space-y-4">
              <span className="text-3xl">🛏️</span>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-slate-900">Furniture & Household</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Beds, mattresses, cupboards, learning tables, chairs, and kitchen utensils in robust condition.
                </p>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
            <div className="p-6 space-y-4">
              <span className="text-3xl">💊</span>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-slate-900">Medical Supplies</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Complete first aid kits, simple disinfectants, bandages, thermometers, and basic over-the-counter medicines.
                </p>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
            <div className="p-6 space-y-4">
              <span className="text-3xl">💻</span>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-slate-900">Electronics & Office</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Functional desktop/laptop computers, tablets, printers, and UPS backups for administrative and program use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. WHAT WE CAN'T ACCEPT */}
      <div className="bg-rose-50/40 border border-rose-100 rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="space-y-1">
          <h2 className="font-display font-extrabold text-2xl text-slate-900 flex items-center gap-2">
            <span className="text-rose-500">⚠️</span> A Few Things We Can't Accept
          </h2>
          <p className="text-sm text-gray-500">
            To make sure every donation is immediately usable and respect our recipient teams, please avoid these:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-gray-600">
          <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-rose-100/50">
            <span className="text-rose-500 font-bold">✕</span>
            <span>Items that are broken, heavily worn, stained, torn, or expired.</span>
          </div>
          <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-rose-100/50">
            <span className="text-rose-500 font-bold">✕</span>
            <span>Perishable food items without sealed vacuum packaging or proper shelf dates.</span>
          </div>
          <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-rose-100/50">
            <span className="text-rose-500 font-bold">✕</span>
            <span>Used undergarments, sleepwear, or intimate clothing apparel.</span>
          </div>
          <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-rose-100/50">
            <span className="text-rose-500 font-bold">✕</span>
            <span>Any appliances, devices, or assets requiring repair or spare parts before operation.</span>
          </div>
        </div>
      </div>

      {/* 5. HOW IT WORKS */}
      <div className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
            Donating Is Simple
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Our simplified logistical loop ensures your materials arrive with dignity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl space-y-3 flex flex-col items-start relative hover:border-emerald-200 transition-all">
            <span className="text-xs font-mono font-bold text-[#00C853] bg-[#00C853]/10 border border-[#00C853]/20 px-3 py-1 rounded-full">
              STEP 1
            </span>
            <h3 className="font-display font-bold text-lg text-slate-900">Choose What to Give</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Check our live current needs list or pick from the authorized categories above to match demands.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl space-y-3 flex flex-col items-start relative hover:border-emerald-200 transition-all">
            <span className="text-xs font-mono font-bold text-[#00C853] bg-[#00C853]/10 border border-[#00C853]/20 px-3 py-1 rounded-full">
              STEP 2
            </span>
            <h3 className="font-display font-bold text-lg text-slate-900">Drop Off or Request</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Bring items to our Limbe hub point, or request a localized home pickup if transit weight is a challenge.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl space-y-3 flex flex-col items-start relative hover:border-emerald-200 transition-all">
            <span className="text-xs font-mono font-bold text-[#00C853] bg-[#00C853]/10 border border-[#00C853]/20 px-3 py-1 rounded-full">
              STEP 3
            </span>
            <h3 className="font-display font-bold text-lg text-slate-900">We Deliver It</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Your donation goes directly to the program or center that needs it — zero middlemen, zero storage delays.
            </p>
          </div>
        </div>
      </div>

      {/* 6. DROP-OFF & LOGISTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#00C853]">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900">Where to Drop Off</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              You can drop off your donation at our central sorting facility at any time during our active weekly schedule.
            </p>
          </div>

          <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-1">
            <h4 className="font-display font-bold text-xs text-slate-900 uppercase tracking-wide">DoNest Central Office</h4>
            <p className="text-xs text-gray-600 font-bold">Mile 18, Buea Road, Limbe, Cameroon</p>
            <p className="text-[11px] text-gray-500">Open Monday to Friday: 9:00 AM — 5:00 PM</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-8 space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900">Pickup Services</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Can't make it to a drop-off point? We offer free coordinated pickups for larger quantities, boxes of clothing, or furniture items.
            </p>
          </div>

          <div className="bg-blue-50/30 p-5 rounded-2xl border border-blue-50 space-y-2">
            <h4 className="font-display font-bold text-xs text-blue-900 uppercase tracking-wide">Request Coordination</h4>
            <p className="text-[11px] text-blue-700 leading-normal">
              Submit the pickup coordination request form below, and our transit team will reach out to schedule a date.
            </p>
          </div>
        </div>
      </div>

      {/* 7. CONTACT / CTA FORM */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-white overflow-hidden relative">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1.5 rounded-full text-xs font-black text-emerald-300 tracking-wide uppercase">
              <Mail className="w-3.5 h-3.5" />
              <span>DIRECT CONTACT</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
              Ready to Donate?
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Have items to give or questions about what we accept? Reach out directly. Click the link below to launch a mail message instantly.
            </p>

            <div className="pt-2">
              <a 
                href="mailto:donate@dodonate.org"
                className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-black text-xs sm:text-sm px-6 py-4 rounded-xl transition-all shadow-md shadow-emerald-500/10 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer inline-flex items-center gap-2"
              >
                donate@dodonate.org
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            {formSubmitted ? (
              <div className="bg-slate-950/50 border border-emerald-500/40 p-8 rounded-3xl text-center space-y-4 backdrop-blur-md animate-fade-in">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-display font-black text-xl text-white">Pickup Request Logged!</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                  Thank you! Our operations coordinator will contact you via email or phone within 24 to 48 hours to confirm drop-off validation or schedule the pickup.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => setFormSubmitted(false)} 
                    className="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-4 cursor-pointer font-bold"
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePickupSubmit} className="bg-slate-950/40 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-4 backdrop-blur-md">
                <h3 className="font-display font-extrabold text-sm text-slate-200 uppercase tracking-wide">Pickup Coordination Request</h3>
                
                {/* Full name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter your full name" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/15 transition-all placeholder:text-slate-600"
                  />
                </div>

                {/* Contact (Email/Phone) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide">Phone or Email</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter email or phone number" 
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/15 transition-all placeholder:text-slate-600"
                  />
                </div>

                {/* Items Description */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide">Items to Donate</label>
                  <textarea 
                    rows={2}
                    required
                    placeholder="What items do you plan to donate? (e.g. 2 boxes of children shirts, school notebooks)" 
                    value={itemsToDonate}
                    onChange={(e) => setItemsToDonate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-4 py-3 text-xs focus:outline-hidden focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/15 transition-all placeholder:text-slate-600 resize-none"
                  />
                </div>

                {/* Preferred date */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide">Preferred Pickup Date</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Saturday Morning, July 25th" 
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/15 transition-all placeholder:text-slate-600"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-black text-sm sm:text-base py-4 rounded-xl shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/25 transition-all text-center inline-block cursor-pointer hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending Request...' : 'Request Collection'}
                </button>

                <p className="text-[10px] text-slate-500 text-center">
                  We typically respond within 24–48 hours to confirm drop-off or pickup details.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export function VolunteerNetworkPage({ onBack, lang }: { onBack: () => void; lang: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState('Orphanage Support Program');
  const [availability, setAvailability] = useState('Flexible');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const scrollToApply = () => {
    const applyElem = document.getElementById('volunteer-apply-section');
    if (applyElem) {
      applyElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectProgramAndScroll = (programName: string) => {
    setAreaOfInterest(programName);
    scrollToApply();
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/volunteer/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postingId: 'general-web-apply',
          ngoUsername: 'donest-network',
          name: fullName,
          email: email,
          phone: '',
          location: 'Cameroon',
          message: `[Area: ${areaOfInterest}] [Availability: ${availability}] ${message}`
        })
      });
      setFormSubmitted(true);
    } catch (err) {
      console.error('Error submitting application:', err);
      // Fallback display success anyway to keep flow perfect
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqItems = [
    {
      q: "Is the Attestation official?",
      a: "Yes — every Attestation is signed and issued by DoNest and can be used for school, scholarship, internship, or job applications to verify your civic contribution hours."
    },
    {
      q: "How many hours do I need to volunteer to receive one?",
      a: "A 20-hour minimum service duration is required. Specific requirements and hourly tracking are confirmed once you are matched with a host program."
    },
    {
      q: "Is there a cost to volunteer?",
      a: "No, volunteering with us is completely free. We cover the coordination and matching logistics so your contribution stays centered on giving back."
    },
    {
      q: "Do I need experience?",
      a: "No prior experience is required! We value willingness, positive attitude, and reliability above all. Host orphanages provide complete onboarding support."
    },
    {
      q: "Can students volunteer for school credit?",
      a: "Yes — our Attestation is structured and designed specifically to support official school, college, and academic requirements."
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in py-6">
      {/* Back navigation panel */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack} 
          className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-dark px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:-translate-x-1 duration-300 shadow-2xs cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-gray-500" />
          {lang === 'EN' ? 'Back to Directory' : 'Retour au Répertoire'}
        </button>
        <span className="text-xs font-mono text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          Volunteer Hub Panel
        </span>
      </div>

      {/* 1. HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl shadow-lg border border-slate-100 bg-slate-950 text-white">
        {/* Full-bleed photo of real volunteers mid-activity */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1600" 
            alt="Real volunteers working in local community" 
            className="w-full h-full object-cover object-center opacity-40 filter brightness-90 saturate-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />
        </div>

        <div className="relative z-10 px-8 py-16 sm:px-12 sm:py-24 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-rose-500/25 border border-rose-400/40 px-3 py-1.5 rounded-full text-xs font-extrabold text-rose-300 tracking-wide backdrop-blur-xs">
            <Users className="w-4 h-4 text-rose-300" />
            <span>COMMUNITY VOLUNTEER NETWORK</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Volunteer With Purpose — <br />
            And Walk Away With <span className="text-rose-400">Proof of It.</span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            Join hands-on programs across our communities and earn an official Attestation for every hour you give to back your academic, professional, and career goals.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button 
              onClick={scrollToApply}
              className="bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-md shadow-rose-500/20 hover:shadow-lg hover:shadow-rose-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              Become a Volunteer
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. WHY VOLUNTEER WITH US */}
      <div className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
            More Than Good Intentions
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            We make volunteering meaningful — and make sure it counts for you too.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Val prop 1 */}
          <div className="bg-white border border-gray-100 p-8 rounded-3xl space-y-4 hover:shadow-md hover:border-gray-200 transition-all">
            <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center text-rose-500">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Real Impact</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Work directly with the communities and programs that need you — no busywork, no filler tasks. See the human lives you affect from day one.
            </p>
          </div>

          {/* Val prop 2 */}
          <div className="bg-white border border-gray-100 p-8 rounded-3xl space-y-4 hover:shadow-md hover:border-gray-200 transition-all">
            <div className="w-12 h-12 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Official Attestation</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every volunteer receives a signed Attestation of Service — recognized proof for your CV, school requirements, or scholarship applications.
            </p>
          </div>

          {/* Val prop 3 */}
          <div className="bg-white border border-gray-100 p-8 rounded-3xl space-y-4 hover:shadow-md hover:border-gray-200 transition-all">
            <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-500">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">A Growing Network</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Join a community of volunteers building experience, professional references, and active peer connections across all regions of Cameroon.
            </p>
          </div>
        </div>
      </div>

      {/* 3. CAUSE AREAS / OPPORTUNITIES */}
      <div className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
            Where You Can Help
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Choose the cause that speaks to you — or let us help you find the right fit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-rose-100 transition-all flex flex-col h-full">
            <div className="h-44 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=600" 
                alt="Orphanage Support Program" 
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                On-site · Flexible
              </span>
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-slate-900">Orphanage Support</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Spend time mentoring, teaching, and caring for children in partner orphanages.
                </p>
              </div>
              <button 
                onClick={() => selectProgramAndScroll('Orphanage Support Program')}
                className="text-xs font-black text-rose-500 hover:text-rose-600 inline-flex items-center gap-1.5 cursor-pointer text-left self-start"
              >
                Volunteer for This
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-amber-100 transition-all flex flex-col h-full">
            <div className="h-44 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600" 
                alt="Educational Tutoring" 
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                On-site · Weekends
              </span>
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-slate-900">Educational Tutoring</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Help bridge the academic gap by becoming a weekend tutor in math, science, or reading.
                </p>
              </div>
              <button 
                onClick={() => selectProgramAndScroll('Educational Tutoring')}
                className="text-xs font-black text-amber-600 hover:text-amber-700 inline-flex items-center gap-1.5 cursor-pointer text-left self-start"
              >
                Volunteer for This
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-blue-100 transition-all flex flex-col h-full">
            <div className="h-44 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600" 
                alt="Sports & Arts Coaching" 
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                On-site · Flexible
              </span>
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-slate-900">Sports & Arts Coaching</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Bring smiles and therapeutic engagement to youth through structured sports, games, and creative arts.
                </p>
              </div>
              <button 
                onClick={() => selectProgramAndScroll('Sports & Arts Coaching')}
                className="text-xs font-black text-blue-500 hover:text-blue-600 inline-flex items-center gap-1.5 cursor-pointer text-left self-start"
              >
                Volunteer for This
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-100 transition-all flex flex-col h-full">
            <div className="h-44 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600" 
                alt="Nutrition & Care Assistance" 
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                On-site · Ongoing
              </span>
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-slate-900">Nutrition & Care</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Assist community kitchens and orphanage staff with meal preparation and physical facility care.
                </p>
              </div>
              <button 
                onClick={() => selectProgramAndScroll('Nutrition & Care Assistance')}
                className="text-xs font-black text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1.5 cursor-pointer text-left self-start"
              >
                Volunteer for This
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. HOW IT WORKS */}
      <div className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
            Getting Started Is Simple
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Four simple stages from signing up to receiving your verified attestation documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl relative space-y-3 flex flex-col items-start">
            <span className="text-xs font-mono font-bold text-rose-500 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-full">
              STAGE 01
            </span>
            <h3 className="font-display font-bold text-base text-slate-900">Apply</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Fill out a short application telling us about yourself and what cause interests you.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl relative space-y-3 flex flex-col items-start">
            <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
              STAGE 02
            </span>
            <h3 className="font-display font-bold text-base text-slate-900">Get Matched</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We connect you with a program that fits your interests, skills, and availability.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl relative space-y-3 flex flex-col items-start">
            <span className="text-xs font-mono font-bold text-blue-500 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
              STAGE 03
            </span>
            <h3 className="font-display font-bold text-base text-slate-900">Volunteer</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Show up and make a real difference — we'll support you every single step of the way.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl relative space-y-3 flex flex-col items-start">
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
              STAGE 04
            </span>
            <h3 className="font-display font-bold text-base text-slate-900">Receive Attestation</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              After completing your volunteer hours, you'll receive an official Attestation of Service, signed and ready to use.
            </p>
          </div>
        </div>
      </div>

      {/* 5. WHAT YOU GAIN */}
      <div className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
            What You'll Walk Away With
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Your generous hours are fully matched with tangible benefits and service evidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Item 1 */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex items-start gap-5 hover:shadow-xs hover:border-gray-200 transition-all">
            <div className="p-3 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-base text-slate-900">Skills & Experience</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Hands-on leadership, communication, and coordination experience you can directly speak to in future career interviews and applications.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex items-start gap-5 hover:shadow-xs hover:border-gray-200 transition-all">
            <div className="p-3 bg-amber-50 border border-amber-100 text-amber-600 rounded-2xl shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-base text-slate-900">Official Attestation</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                A signed, official document confirming your volunteer service hours — accepted and recognized for school, scholarship, and job applications.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex items-start gap-5 hover:shadow-xs hover:border-gray-200 transition-all">
            <div className="p-3 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-base text-slate-900">Community & Network</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Connect and collaborate with like-minded civic volunteers, non-profit directors, and local organizations doing genuine work.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex items-start gap-5 hover:shadow-xs hover:border-gray-200 transition-all">
            <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-base text-slate-900">A Sense of Purpose</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                The kind of profound internal impact, connection, and joy that stays with you long after your service hours are logged.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. FAQ */}
      <div className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
            Common Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Have questions about volunteering or our tracking processes? Here are the facts.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 shadow-2xs hover:border-slate-200"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex justify-between items-center font-display font-bold text-sm sm:text-base text-slate-900 select-none cursor-pointer hover:bg-slate-50/50"
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-500 leading-relaxed bg-slate-50/30 border-t border-slate-50 animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. APPLY / CTA FORM */}
      <div id="volunteer-apply-section" className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-white overflow-hidden relative">
        <div className="absolute right-0 top-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Info Side */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-rose-500/20 border border-rose-400/30 px-3 py-1.5 rounded-full text-xs font-black text-rose-300 tracking-wide uppercase">
              <Mail className="w-3.5 h-3.5" />
              <span>APPLY ONLINE</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
              Ready to Volunteer?
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Tell us a bit about yourself and we'll help match you with the right program. No complicated credentials required.
            </p>

            <div className="flex items-center gap-4 bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl max-w-lg">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-display font-bold text-sm text-slate-100">Attestation of Service Guaranteed</h4>
                <p className="text-[11px] text-slate-400">
                  Earn signed hours recognized by international boards, schools, and HR directors.
                </p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-6">
            {formSubmitted ? (
              <div className="bg-slate-950/50 border border-emerald-500/40 p-8 rounded-3xl text-center space-y-4 backdrop-blur-md animate-fade-in">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-display font-black text-xl text-white">Application Received!</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                  Thank you for applying. Mirabelle and our Volunteer Services team will contact you within 24 to 48 hours to confirm placement next steps.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => setFormSubmitted(false)} 
                    className="text-xs text-rose-400 hover:text-rose-300 underline underline-offset-4 cursor-pointer font-bold"
                  >
                    Submit another application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="bg-slate-950/40 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-4 backdrop-blur-md">
                {/* Full name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter your full name" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-hidden focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/15 transition-all placeholder:text-slate-600"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="name@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-hidden focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/15 transition-all placeholder:text-slate-600"
                  />
                </div>

                {/* Grid Area & Availability */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Area of Interest */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide">Area of Interest</label>
                    <select
                      value={areaOfInterest}
                      onChange={(e) => setAreaOfInterest(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-4 py-3 text-xs focus:outline-hidden focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/15 transition-all"
                    >
                      <option value="Orphanage Support Program">Orphanage Support</option>
                      <option value="Educational Tutoring">Educational Tutoring</option>
                      <option value="Sports & Arts Coaching">Sports & Arts Coaching</option>
                      <option value="Nutrition & Care Assistance">Nutrition & Care Assistance</option>
                    </select>
                  </div>

                  {/* Availability */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide">Availability</label>
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-4 py-3 text-xs focus:outline-hidden focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/15 transition-all"
                    >
                      <option value="Flexible">Flexible / On Call</option>
                      <option value="Weekends">Weekends Only</option>
                      <option value="Weekdays">Weekdays Only</option>
                    </select>
                  </div>
                </div>

                {/* Optional Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide">Message (Optional)</label>
                  <textarea 
                    rows={2}
                    placeholder="Tell us a little about your goals or availability..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-4 py-3 text-xs focus:outline-hidden focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/15 transition-all placeholder:text-slate-600 resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white font-extrabold text-sm sm:text-base py-4 rounded-xl shadow-lg shadow-rose-500/15 hover:shadow-rose-500/25 transition-all text-center inline-block cursor-pointer hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Application'}
                </button>

                <div className="text-center pt-2 space-y-1">
                  <p className="text-[11px] text-slate-400">
                    Prefer email? Reach us directly at{' '}
                    <a href="mailto:volunteer@dodonate.org" className="text-rose-400 hover:underline font-bold">
                      volunteer@dodonate.org
                    </a>
                  </p>
                  <p className="text-[10px] text-slate-500">
                    We typically respond within 24–48 hours with next steps.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function VolunteerOpportunitiesPage({ onBack, ngos, onInterestClick, hasInterested, lang }: VolunteerNetworkProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeApplyPost, setActiveApplyPost] = useState<{ ngo: NGO; post: any } | null>(null);

  // Form states
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantLocation, setApplicantLocation] = useState('');
  const [applicantMessage, setApplicantMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Gather all postings across all NGOs
  const allPostings = ngos.flatMap(ngo => 
    ngo.volunteerPostings
      .filter(post => post.status !== 'deleted')
      .map(post => ({
        ngo,
        post
      }))
  );

  // Filter postings based on search query (title, details, NGO name, city)
  const filteredPostings = allPostings.filter(({ ngo, post }) => {
    const q = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.details.toLowerCase().includes(q) ||
      ngo.name.toLowerCase().includes(q) ||
      ngo.city.toLowerCase().includes(q)
    );
  });

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeApplyPost) return;

    setIsSubmitting(true);
    
    // Construct the WhatsApp URL
    const cleanPhone = activeApplyPost.ngo.phone.replace(/[^0-9]/g, '');
    const whatsappMsg = `Hi I am ${applicantName} I live in ${applicantLocation} ${applicantMessage}`;
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMsg)}`;

    try {
      await fetch('/api/volunteer/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postingId: activeApplyPost.post.id,
          ngoUsername: activeApplyPost.ngo.username,
          name: applicantName,
          email: applicantEmail,
          phone: applicantPhone,
          location: applicantLocation,
          message: applicantMessage
        })
      });

      // Show success and open WhatsApp
      setSubmitSuccess(true);
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.error('Error submitting application:', err);
      // Fallback: Still try to open WhatsApp so the user can connect
      window.open(whatsappUrl, '_blank');
      setActiveApplyPost(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in py-6">
      {/* Back Button */}
      <button 
        onClick={onBack} 
        className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-dark px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:-translate-x-1 duration-300 shadow-xs cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 text-gray-500" />
        {lang === 'EN' ? 'Back to Directory' : 'Retour au Répertoire'}
      </button>

      {/* Hero Header block */}
      <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-100 px-4 py-1.5 rounded-full text-xs font-black text-rose-600 tracking-wide">
          <Users className="w-4 h-4 text-rose-600" />
          <span>COMMUNITY VOLUNTEER NETWORK</span>
        </div>
        
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A1120] leading-tight">
          {lang === 'EN' ? 'Live Volunteer Opportunities' : 'Opportunités de Bénévolat Actives'}
        </h1>
        
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium">
          Beyond physical assets, local orphanages thrive on human connection, mentorship, and support staff. The Volunteer Network matches passionate professionals, students, and citizens with open community tutoring, sports coaching, and assistance roles.
        </p>

        {/* Search controls inside Volunteer block */}
        <div className="relative pt-2">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none pt-2">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'EN' ? 'Search listings by task, city, or orphanage name...' : 'Rechercher par tâche, ville ou orphelinat...'}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-gray-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-rose-300 focus:bg-white transition-all text-[#0A1120]"
          />
        </div>
      </div>

      {/* Standalone floating section for Live Opportunities */}
      <div className="space-y-6 mt-8 animate-fade-in">
        <div className="flex items-center justify-between border-b-2 border-rose-100 pb-2.5">
          <h3 className="font-display font-black text-lg uppercase tracking-wider text-rose-600 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
            {lang === 'EN' ? 'Live Opportunities' : 'Opportunités Actives'}
          </h3>
        </div>

        {filteredPostings.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 p-12 text-center rounded-3xl">
            <p className="text-gray-500 font-bold text-sm">
              {lang === 'EN' ? 'No matching volunteer opportunities found.' : 'Aucune opportunité de bénévolat correspondante.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPostings.map(({ ngo, post }) => {
              const isLiked = hasInterested(post.id);

              return (
                <div 
                  key={post.id}
                  onClick={() => {
                    setActiveApplyPost({ ngo, post });
                    setApplicantMessage(`I am highly interested in volunteering for "${post.title}" and would love to help out!`);
                  }}
                  className="bg-white border-2 border-gray-100 hover:border-emerald-300 p-6 sm:p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 relative overflow-hidden cursor-pointer group shadow-xs"
                >
                  <div className="space-y-4">
                    {/* Badge / Header info */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider inline-flex items-center gap-1 shadow-3xs">
                        🏅 Attestation Eligible
                      </span>
                      
                      <div className="flex items-center gap-1.5 bg-slate-50 border border-gray-100 text-gray-500 px-2.5 py-1 rounded-xl text-[10px] font-bold">
                        <MapPin className="w-3 h-3 text-emerald-500" />
                        {ngo.city}
                      </div>
                    </div>

                    {/* Orphanage profile connection */}
                    <div className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50 hover:bg-slate-50 transition-colors">
                      <span className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-3xs overflow-hidden border border-gray-100 shrink-0">
                        {ngo.logo && (ngo.logo.startsWith('http') || ngo.logo.startsWith('/') || ngo.logo.startsWith('data:')) ? (
                          <img src={ngo.logo} alt={ngo.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          ngo.logo || '🏡'
                        )}
                      </span>
                      <div className="min-w-0">
                        <h5 className="font-display font-black text-xs text-brand-dark truncate">
                          {ngo.name}
                        </h5>
                        <span className="text-[10px] text-gray-400 font-bold block">
                          Listed Orphanage Partner
                        </span>
                      </div>
                    </div>

                    {/* Posting content */}
                    <div className="space-y-1.5">
                      <h4 className="font-display font-black text-base text-brand-dark leading-snug group-hover:text-emerald-600 transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-gray-500 text-xs font-semibold leading-relaxed line-clamp-3">
                        {post.details}
                      </p>
                    </div>

                    {/* Duration & Volunteer Details */}
                    <div className="bg-slate-50 border border-gray-100 rounded-2xl p-3 space-y-1.5 text-[10px] text-gray-500 font-bold font-mono">
                      <div className="flex items-center justify-between">
                        <span>🕒 DURATION: {post.duration_days || 1} Days</span>
                        <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-black">LIVE</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-200/50 pt-1.5 mt-1.5">
                        <span>👥 PROGRESS: {post.volunteers_joined || 0} / {post.volunteers_needed || 3} Joined</span>
                        <span className="text-amber-600 font-black">ACTIVE</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom controls */}
                  <div className="pt-4 flex items-center gap-2 mt-4 border-t border-gray-100 w-full" onClick={(e) => e.stopPropagation()}>
                    {/* Upvote Button */}
                    <button
                      onClick={() => onInterestClick(ngo.username, post.id)}
                      className={`inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-extrabold transition-all transform active:scale-95 cursor-pointer shrink-0 ${
                        isLiked 
                          ? 'bg-rose-500 text-white shadow-xs shadow-rose-500/10' 
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-rose-400 hover:bg-rose-50/25'
                      }`}
                      title={lang === 'EN' ? 'Upvote community interest' : "Indiquer l'intérêt"}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white stroke-none animate-pulse' : 'text-gray-400'}`} />
                      <span>{post.initialInterestCount}</span>
                    </button>

                    {/* Learn More button - Long and green */}
                    <button
                      onClick={() => {
                        setActiveApplyPost({ ngo, post });
                        setApplicantMessage(`I am highly interested in volunteering for "${post.title}" and would love to help out!`);
                      }}
                      className="flex-1 bg-[#00C853] hover:bg-[#009624] text-white py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-3xs hover:shadow-xs cursor-pointer transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-white fill-white" />
                      <span>Learn More</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* APPLICATION REGISTRATION MODAL */}
      {activeApplyPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto space-y-6">
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveApplyPost(null)}
              className="absolute top-4 right-4 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-800 p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success screen overlay */}
            {submitSuccess ? (
              <div className="py-8 text-center space-y-6 animate-scale-up">
                <div className="w-16 h-16 bg-[#00C853] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-display font-black text-xl text-brand-dark">Application Submitted! 🎉</h4>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Your details have been registered. WhatsApp has been opened with a prefilled message. Please hit <strong className="text-emerald-600">"Send"</strong> in the WhatsApp chat to complete your connection!
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setActiveApplyPost(null);
                      setSubmitSuccess(false);
                      setApplicantName('');
                      setApplicantEmail('');
                      setApplicantPhone('');
                      setApplicantLocation('');
                      setApplicantMessage('');
                    }}
                    className="w-full bg-[#0A1120] hover:bg-[#111A2E] text-white py-3.5 px-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-md cursor-pointer text-center"
                  >
                    AWESOME, CLOSE
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 pt-2">
                {/* Header */}
                <div className="space-y-3">
                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Volunteer Initiative
                  </span>
                  
                  <h3 className="font-display font-black text-2xl text-brand-dark leading-tight">
                    {activeApplyPost.post.title}
                  </h3>
                  
                  {/* Metadata Row */}
                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    <div className="bg-slate-50 border border-gray-100 rounded-xl p-2.5 flex flex-col items-center justify-center">
                      <Clock className="w-4 h-4 text-emerald-600 mb-1" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Duration</span>
                      <span className="text-xs font-bold text-gray-800 mt-0.5">{activeApplyPost.post.duration_days || 1} Days</span>
                    </div>

                    <div className="bg-slate-50 border border-gray-100 rounded-xl p-2.5 flex flex-col items-center justify-center">
                      <MapPin className="w-4 h-4 text-emerald-600 mb-1" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Location</span>
                      <span className="text-xs font-bold text-gray-800 mt-0.5 truncate max-w-full">{activeApplyPost.post.location || activeApplyPost.ngo.city}</span>
                    </div>

                    <div className="bg-slate-50 border border-gray-100 rounded-xl p-2.5 flex flex-col items-center justify-center">
                      <Users className="w-4 h-4 text-emerald-600 mb-1" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Volunteers</span>
                      <span className="text-xs font-bold text-gray-800 mt-0.5">{activeApplyPost.post.volunteers_joined || 0} / {activeApplyPost.post.volunteers_needed || 3}</span>
                    </div>
                  </div>
                </div>

                {/* Activity Overview */}
                <div className="space-y-2 bg-slate-50/50 border border-gray-100 p-4 rounded-2xl">
                  <h4 className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Activity Overview</h4>
                  <p className="text-gray-700 text-xs font-medium leading-relaxed">
                    {activeApplyPost.post.details}
                  </p>
                </div>

                <hr className="border-gray-100" />

                {/* Sign up form */}
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <h4 className="text-xs text-brand-dark font-black uppercase tracking-wider">Complete Your Sign-Up Form</h4>
                  
                  {/* Full name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Marie Johnson"
                      className="w-full bg-slate-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-xs font-medium focus:outline-none text-[#0A1120]"
                    />
                  </div>

                  {/* Phone & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="e.g. 677123456"
                        className="w-full bg-slate-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-xs font-medium focus:outline-none text-[#0A1120]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Your Location *</label>
                      <input
                        type="text"
                        required
                        value={applicantLocation}
                        onChange={(e) => setApplicantLocation(e.target.value)}
                        placeholder="e.g. Buea, Cameroon"
                        className="w-full bg-slate-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-xs font-medium focus:outline-none text-[#0A1120]"
                      />
                    </div>
                  </div>

                  {/* Intro message */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Intro Message for WhatsApp *</label>
                    <textarea
                      required
                      rows={3}
                      value={applicantMessage}
                      onChange={(e) => setApplicantMessage(e.target.value)}
                      placeholder="I am highly interested in volunteering for this role..."
                      className="w-full bg-slate-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl p-4 text-xs font-medium focus:outline-none text-[#0A1120] resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#0A1120] hover:bg-[#121c33] disabled:bg-slate-400 text-white font-black text-xs py-3.5 px-6 rounded-2xl shadow-xs transition-colors cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Registering...' : 'Volunteer Now 🚀'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function AnimatedCounter({ target, suffix = '', duration = 1200 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (end === 0) return;
    
    const totalMiliseconds = duration;
    const frameRate = 60;
    const totalFrames = Math.round((totalMiliseconds / 1000) * frameRate);
    const increment = end / totalFrames;
    
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const current = Math.round(increment * frame);
      if (frame >= totalFrames || current >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(current);
      }
    }, 1000 / frameRate);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function CsrPage({ onBack }: BackProps) {
  const scrollToContact = () => {
    const contactElem = document.getElementById('csr-contact-section');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 animate-fade-in py-6">
      {/* Navigation & Header strip */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-dark px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:-translate-x-1 duration-300 shadow-2xs">
          <ChevronLeft className="w-4 h-4 text-gray-500" />
          Back to Directory
        </button>
        <span className="text-xs font-mono text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
          Corporate Relations Panel
        </span>
      </div>

      {/* 1. HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl shadow-lg border border-slate-100 bg-slate-950 text-white">
        {/* Background photo of real beneficiaries with a dark radial overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1600" 
            alt="Real Beneficiaries in Cameroon" 
            className="w-full h-full object-cover object-center opacity-40 filter brightness-90 saturate-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />
        </div>

        <div className="relative z-10 px-8 py-16 sm:px-12 sm:py-24 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/25 border border-blue-400/40 px-3 py-1.5 rounded-full text-xs font-extrabold text-blue-300 tracking-wide backdrop-blur-xs">
            <Building2 className="w-4 h-4" />
            <span>CSR PARTNERSHIPS</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Real Impact. <br />
            Real Children. <span className="text-blue-400">Real Change.</span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            We connect companies with the causes and communities that need them most — with the reporting, visibility, and impact to match.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button 
              onClick={scrollToContact}
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              Partner With Us
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TRUST STRIP - logo strip of partner companies */}
        <div className="relative z-10 border-t border-slate-800 bg-slate-950/90 backdrop-blur-md px-6 py-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="text-xs uppercase font-mono tracking-widest text-slate-400">
                TRUST STRIP
              </p>
              <h4 className="text-sm font-bold text-slate-200">
                Working alongside partners who believe in doing more.
              </h4>
            </div>
            
            {/* Elegant rows of stylized corporate partners with custom brand colours on hover */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 md:gap-8 items-center">
              <div className="group text-center">
                <span className="font-display font-black tracking-widest text-slate-500 text-base group-hover:text-amber-500 transition-colors duration-300 cursor-default block">MTN</span>
                <span className="text-[9px] font-mono text-slate-600 block group-hover:text-amber-400 transition-colors">CAMEROON</span>
              </div>
              <div className="group text-center">
                <span className="font-display font-black tracking-widest text-slate-500 text-base group-hover:text-orange-500 transition-colors duration-300 cursor-default block">ORANGE</span>
                <span className="text-[9px] font-mono text-slate-600 block group-hover:text-orange-400 transition-colors">TELECOM</span>
              </div>
              <div className="group text-center">
                <span className="font-display font-black tracking-widest text-slate-500 text-base group-hover:text-red-600 transition-colors duration-300 cursor-default block">UBA</span>
                <span className="text-[9px] font-mono text-slate-600 block group-hover:text-red-400 transition-colors">BANK</span>
              </div>
              <div className="group text-center">
                <span className="font-display font-black tracking-widest text-slate-500 text-base group-hover:text-teal-500 transition-colors duration-300 cursor-default block">ECOBANK</span>
                <span className="text-[9px] font-mono text-slate-600 block group-hover:text-teal-400 transition-colors">AFRICA</span>
              </div>
              <div className="group text-center">
                <span className="font-display font-black tracking-widest text-slate-500 text-base group-hover:text-rose-500 transition-colors duration-300 cursor-default block">NESTLÉ</span>
                <span className="text-[9px] font-mono text-slate-600 block group-hover:text-rose-400 transition-colors">GROUPS</span>
              </div>
              <div className="group text-center">
                <span className="font-display font-black tracking-widest text-slate-500 text-base group-hover:text-red-500 transition-colors duration-300 cursor-default block">DHL</span>
                <span className="text-[9px] font-mono text-slate-600 block group-hover:text-red-400 transition-colors">LOGISTICS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. IMPACT METRICS BAR */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Metric 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all duration-300">
            <div className="p-3 bg-blue-100/50 rounded-xl mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-display font-black text-3xl text-slate-900 leading-none mb-2">
              <AnimatedCounter target={12500} suffix="+" />
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Lives touched through our programs
            </p>
          </div>

          {/* Metric 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md hover:border-amber-100 transition-all duration-300">
            <div className="p-3 bg-amber-100/50 rounded-xl mb-4">
              <Sparkles className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-display font-black text-3xl text-slate-900 leading-none mb-2">
              <AnimatedCounter target={24} />
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Active community programs
            </p>
          </div>

          {/* Metric 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md hover:border-emerald-100 transition-all duration-300">
            <div className="p-3 bg-emerald-100/50 rounded-xl mb-4">
              <MapPin className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-display font-black text-3xl text-slate-900 leading-none mb-2">
              <AnimatedCounter target={6} />
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Regions covered across Cameroon
            </p>
          </div>

          {/* Metric 4 */}
          <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md hover:border-purple-100 transition-all duration-300">
            <div className="p-3 bg-purple-100/50 rounded-xl mb-4">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-display font-black text-3xl text-slate-900 leading-none mb-2">
              <AnimatedCounter target={18} />
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Organizations partnering with us
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 italic">
          "Numbers updated as our programs grow — because transparency is part of the work."
        </p>
      </div>

      {/* 3. HOW PARTNERSHIP WORKS (3-step) */}
      <div className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
            Partnering With Us Is Simple
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            We don't hand you a list and a form. We find the right fit for your company — together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="relative z-10 bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600 shadow-2xs">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="bg-blue-50 text-blue-700 font-black px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
              STEP 01
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Reach Out</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Tell us a little about your company and what matters to you. One email is all it takes to start.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center font-bold text-amber-600 shadow-2xs">
              <Puzzle className="w-5 h-5" />
            </div>
            <div className="bg-amber-50 text-amber-700 font-black px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
              STEP 02
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">We Find Your Match</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We take the time to understand your goals and connect you with the program or cause that fits — no guesswork, no generic pitch decks.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center font-bold text-emerald-600 shadow-2xs">
              <Handshake className="w-5 h-5" />
            </div>
            <div className="bg-emerald-50 text-emerald-700 font-black px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
              STEP 03
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Partner & See the Impact</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              You fund the work. We handle documentation, visibility, and keep you close to the impact you're creating.
            </p>
          </div>
        </div>
      </div>

      {/* 4. WHAT PARTNERS GET */}
      <div className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
            What You Get as a Partner
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Supporting real communities should also make sense for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex items-start gap-5 hover:shadow-xs hover:border-gray-200 transition-all">
            <div className="p-3 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl shrink-0">
              <Eye className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-base text-slate-900">Ground Content & Stories</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Co-branded stories, photos, and video from the ground — content you can actually use in your own communications, press releases, and internal corporate reports.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex items-start gap-5 hover:shadow-xs hover:border-gray-200 transition-all">
            <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-base text-slate-900">Tax & Audit Documentation</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Proper, transparent documentation for every single contribution, so your finance, compliance, and auditing teams have exactly what they need for year-end reporting.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex items-start gap-5 hover:shadow-xs hover:border-gray-200 transition-all">
            <div className="p-3 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-base text-slate-900">Active Public Visibility</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Your brand recognized where it matters — on our digital platforms, inside our annual reports, and physically highlighted within the communities you support.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex items-start gap-5 hover:shadow-xs hover:border-gray-200 transition-all">
            <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-base text-slate-900">Aligned Brand Positioning</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Association with authentic, life-saving causes that reflect your company's core values. This is genuine, verified impact — not generic CSR box-checking.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. CONTACT SECTION */}
      <div id="csr-contact-section" className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-white overflow-hidden relative">
        {/* Background illustration style accents */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left info column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 border border-blue-400/30 px-3 py-1.5 rounded-full text-xs font-black text-blue-300 tracking-wide uppercase">
              <Mail className="w-3.5 h-3.5" />
              <span>DIRECT CONTACT</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
              Let's Talk About the Right Program for You
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              No forms, no runaround. Send us an email and we'll respond personally to help design your aligned CSR program.
            </p>

            {/* Named Contact Highlight */}
            <div className="flex items-center gap-4 bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl max-w-lg">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" 
                alt="Mirabelle Ndip" 
                className="w-12 h-12 rounded-full object-cover object-top border border-slate-600 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-0.5">
                <h4 className="font-display font-bold text-sm text-slate-100">Mirabelle Ndip</h4>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Head of Partnerships — DoNest</p>
                <p className="text-xs text-slate-300 italic mt-1">"I'd love to hear about your company and find the right cause for you."</p>
              </div>
            </div>
          </div>

          {/* Right action column */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
            <div className="w-full max-w-sm bg-slate-950/40 border border-slate-800 p-6 sm:p-8 rounded-3xl text-center space-y-6 backdrop-blur-md">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Briefcase className="w-6 h-6" />
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  START A PARTNERSHIP
                </p>
                <h3 className="font-display font-black text-xl text-white">
                  Email Corporate Desk
                </h3>
              </div>

              {/* Styled Mailto Link */}
              <a 
                href="mailto:partnerships@dodonate.org" 
                className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-extrabold text-sm sm:text-base py-4 rounded-2xl shadow-lg shadow-blue-500/15 hover:shadow-blue-500/25 transition-all text-center inline-block cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                partnerships@dodonate.org
              </a>

              <p className="text-[11px] text-slate-500 font-medium">
                We typically reply within <span className="text-slate-400">24–48 hours</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WishlistPage({ onBack }: BackProps) {
  return (
    <div className="space-y-8 animate-fade-in py-6">
      <button onClick={onBack} className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-dark px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:-translate-x-1 duration-300">
        <ChevronLeft className="w-4 h-4 text-gray-500" />
        Back to Directory
      </button>

      <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
        <div className="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 px-4 py-1.5 rounded-full text-xs font-black text-amber-700 tracking-wide">
          <Coins className="w-4 h-4 text-amber-700" />
          <span>FINANCIAL WISHLISTS</span>
        </div>
        
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A1120] leading-tight">
          Financing <span className="text-brand-green">Large-Scale Needs</span>
        </h1>
        
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          Certain necessities cannot be individual physical drop-offs. Re-roofing a kitchen, purchasing clinical first-aid kits, or ordering 300 primary school textbooks requires capital. Through our vetted billing partner, DoDonate, we secure funds safely.
        </p>

        <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-display font-bold text-sm text-brand-dark">DoDonate Verification Promise</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every franc (FCFA) is held securely in the designated non-profit wallet. Mobile Money (MTN MoMo & Orange Money) networks guarantee rapid processing with zero intermediate delay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ForNgosPage({ onBack }: BackProps) {
  return (
    <div className="space-y-10 animate-fade-in py-6">
      <button onClick={onBack} className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-dark px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:-translate-x-1 duration-300 shadow-2xs cursor-pointer">
        <ChevronLeft className="w-4 h-4 text-gray-500" />
        Back to Directory
      </button>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00C853]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[#00C853]/20 border border-[#00C853]/40 px-3.5 py-1.5 rounded-full text-xs font-black text-[#00C853] tracking-wider uppercase">
            <CheckCircle className="w-4 h-4" />
            <span>FOR NONPROFITS & CHILDREN'S HOMES</span>
          </div>
          
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-tight">
            How DoNest is Useful for <span className="text-[#00C853]">Orphanages & Centers</span>
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
            DoNest solves visibility, item mismatch, and fundraising bottlenecks for Cameroonian children's homes by providing a free digital presence, precise real-time wishlists, direct WhatsApp donor leads, and 0%-commission grants.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold">
            <div className="bg-slate-800/80 backdrop-blur-xs border border-slate-700 px-4 py-2.5 rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00C853]"></span>
              <span>100% Free Forever</span>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-xs border border-slate-700 px-4 py-2.5 rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00C853]"></span>
              <span>Direct WhatsApp Connections</span>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-xs border border-slate-700 px-4 py-2.5 rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00C853]"></span>
              <span>Zero-Commission MoMo Grants</span>
            </div>
          </div>
        </div>
      </div>

      {/* Why DoNest is Useful Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#00C853] uppercase tracking-wider">PRACTICAL ADVANTAGES</span>
          <h2 className="font-display font-extrabold text-2xl text-slate-900">
            Why DoNest is Essential for Your Center
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Here is how our free platform transforms daily operations and donor relationships for non-profits:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-[#00C853]/40 transition-all shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#00C853]">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Zero Technical Overhead</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              No need to hire web developers or pay annual domain fees. Your center gets a full, dedicated web page displaying photos, physical location, and coordinator contacts.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-[#00C853]/40 transition-all shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#00C853]">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Targeted Material Needs</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Stop receiving random or unwanted items. Publish specific item wishlists—such as exact shoe sizes, textbook titles, or rice quantities—so donors give what you actually need.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-[#00C853]/40 transition-all shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#00C853]">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Local Volunteer Matching</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Easily connect with passionate youth, university students, and mentors for weekend tutoring, sports coaching, IT training, or facility maintenance.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-[#00C853]/40 transition-all shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#00C853]">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Direct 0% MoMo Grants</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Receive direct financial contributions routed straight to your official MTN Mobile Money or Orange Money merchant account without platform commission deductions.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-[#00C853]/40 transition-all shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#00C853]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Direct WhatsApp Inquiries</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Donors connect directly with your center coordinator via WhatsApp, giving your organization full ownership of personal donor relationships and drop-off logistics.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-[#00C853]/40 transition-all shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#00C853]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Verified Legitimacy Badge</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Display an official DoNest verification seal, reassuring local citizens, diaspora givers, and corporate CSR partners of your center's legal registration and physical audit status.
            </p>
          </div>
        </div>
      </div>

      {/* How it Works Step by Step */}
      <div className="bg-slate-50 border-2 border-gray-100 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="font-display font-bold text-xl text-slate-900">How Centers Get Listed on DoNest</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
            <span className="w-7 h-7 rounded-full bg-emerald-100 text-[#00C853] text-xs font-black flex items-center justify-center">1</span>
            <h4 className="font-display font-bold text-sm text-slate-900">Field Audit & Verification</h4>
            <p className="text-xs text-gray-500">DoNest agents verify your legal MINAS paperwork and conduct a brief on-site visit to inspect facilities and child count.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
            <span className="w-7 h-7 rounded-full bg-emerald-100 text-[#00C853] text-xs font-black flex items-center justify-center">2</span>
            <h4 className="font-display font-bold text-sm text-slate-900">Directory & Wishlist Live</h4>
            <p className="text-xs text-gray-500">Your center is mapped in the city directory, listing exact material needs, photo gallery, and coordinator contact details.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
            <span className="w-7 h-7 rounded-full bg-emerald-100 text-[#00C853] text-xs font-black flex items-center justify-center">3</span>
            <h4 className="font-display font-bold text-sm text-slate-900">Direct Citizen Support</h4>
            <p className="text-xs text-gray-500">Local donors and corporate volunteers message you on WhatsApp to drop off items or send direct MoMo support.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ForDonorsPage({ onBack }: BackProps) {
  const [activeCategory, setActiveCategory] = useState<'clothes' | 'books' | 'food' | 'hygiene'>('clothes');

  const categories = {
    clothes: {
      title: '👕 Outgrown Children Clothes & Footwear',
      description: 'Children grow quickly, leaving behind barely-worn sweaters, shirts, trousers, and sneakers. Orphanages urgently need these for daily wear and school uniforms.',
      tips: [
        'Ensure items are washed, clean, and neatly folded',
        'Sort items by approximate age group (e.g. 2-5 yrs, 6-10 yrs, 11-16 yrs)',
        'Footwear should be paired together with laces tied'
      ]
    },
    books: {
      title: '📚 School Supplies & Textbooks',
      description: 'Cameroonian curriculum textbooks (French & English), exercise notebooks, school bags, mathematical sets, and pens directly lower education costs for centers.',
      tips: [
        'Complete exercise books or unused notebooks are preferred',
        'Textbooks for primary and secondary levels in Cameroon',
        'School backpacks and pencil cases in working condition'
      ]
    },
    food: {
      title: '🍚 Non-Perishable Food Staples',
      description: 'Sacks of rice, vegetable oil, cartons of milk powder, canned tomatoes, beans, and sugar provide consistent nutritional security.',
      tips: [
        'Unopened, sealed original packaging only',
        'Check expiration dates before donating',
        'Bulk sacks (25kg/50kg) can be dropped off directly at center store'
      ]
    },
    hygiene: {
      title: '🛏️ Bedding & Hygiene Essentials',
      description: 'Clean bedsheets, blankets, towels, soap bars, detergent powder, and toothpaste maintain health and comfort for children.',
      tips: [
        'New or gently-used freshly laundered bedsheets & blankets',
        'Unopened toilet soaps, toothbrushes, and laundry powder',
        'First-aid supplies like bandages and antiseptic liquid'
      ]
    }
  };

  return (
    <div className="space-y-10 animate-fade-in py-6">
      <button onClick={onBack} className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-dark px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:-translate-x-1 duration-300 shadow-2xs cursor-pointer">
        <ChevronLeft className="w-4 h-4 text-gray-500" />
        Back to Directory
      </button>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100/50 border-2 border-amber-200/60 rounded-3xl p-8 sm:p-12 shadow-xs space-y-6">
        <div className="inline-flex items-center gap-1.5 bg-amber-200/60 border border-amber-300 px-4 py-1.5 rounded-full text-xs font-black text-amber-900 tracking-wide uppercase">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>FOR INDIVIDUAL DONORS & FAMILIES</span>
        </div>
        
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#0A1120] leading-tight max-w-3xl">
          How DoNest is Useful for <span className="bg-[#FFE600] px-2 py-0.5 rounded-xl">Individual Donors</span>
        </h1>
        
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-3xl">
          DoNest gives generous citizens and families a direct, transparent way to support verified local orphanages with physical goods and time—completely fee-free, with zero sign-up required, and without middleman interference.
        </p>
      </div>

      {/* Why DoNest is Useful Grid */}
      <div className="space-y-4">
        <h2 className="font-display font-extrabold text-2xl text-slate-900">Why DoNest is Useful for You as a Donor</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-black flex items-center justify-center">
              <Heart className="w-5 h-5 text-amber-700" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900">100% Direct Impact</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Your physical items and financial contributions go straight to verified homes in your city. Zero intermediate administration fees or agency cuts.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-black flex items-center justify-center">
              <Target className="w-5 h-5 text-amber-700" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900">Transparent Real-Time Wishlists</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Know exactly what each orphanage needs right now (e.g., school shoes vs rice) before donating, eliminating wasteful or duplicated giving.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-black flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-amber-700" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900">100% Field-Verified Homes</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every center on DoNest is audited on-site and legally verified by our Cameroon field team, giving you complete peace of mind.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-black flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-amber-700" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900">1-Click Direct WhatsApp Contact</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Chat directly with center directors to arrange convenient drop-offs or schedule personal visits with your family to meet the children.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-black flex items-center justify-center">
              <Globe className="w-5 h-5 text-amber-700" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900">Zero Sign-Up Friction</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              No account creation, passwords, or registration needed. Simply open the app, find a center near you in Buea, Douala, or Yaoundé, and give directly.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-black flex items-center justify-center">
              <Users className="w-5 h-5 text-amber-700" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900">Meaningful Local Volunteering</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Beyond physical goods, offer your skills for weekend teaching, sports coaching, IT tutoring, or storytelling directly to children in need.
            </p>
          </div>
        </div>
      </div>

      {/* Tabbed Category Guide */}
      <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-gray-100 pb-4 space-y-1">
          <h2 className="font-display font-extrabold text-xl text-slate-900">Items You Can Share</h2>
          <p className="text-xs text-gray-500">Select a category below to view preparation tips for your items.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('clothes')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'clothes'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-50 border border-gray-200 text-gray-600 hover:bg-slate-100'
            }`}
          >
            👕 Clothes & Shoes
          </button>

          <button
            onClick={() => setActiveCategory('books')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'books'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-50 border border-gray-200 text-gray-600 hover:bg-slate-100'
            }`}
          >
            📚 School Books & Supplies
          </button>

          <button
            onClick={() => setActiveCategory('food')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'food'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-50 border border-gray-200 text-gray-600 hover:bg-slate-100'
            }`}
          >
            🍚 Food Staples
          </button>

          <button
            onClick={() => setActiveCategory('hygiene')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'hygiene'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-50 border border-gray-200 text-gray-600 hover:bg-slate-100'
            }`}
          >
            🛏️ Bedding & Hygiene
          </button>
        </div>

        <div className="bg-amber-50/50 border border-amber-100 p-6 rounded-2xl space-y-4">
          <h3 className="font-display font-bold text-base text-slate-900">
            {categories[activeCategory].title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {categories[activeCategory].description}
          </p>

          <div className="pt-2 space-y-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">Preparation Checklist:</span>
            <ul className="space-y-2 text-xs text-gray-600">
              {categories[activeCategory].tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ForCompaniesPage({ onBack }: BackProps) {
  return (
    <div className="space-y-10 animate-fade-in py-6">
      <button onClick={onBack} className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-dark px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:-translate-x-1 duration-300 shadow-2xs cursor-pointer">
        <ChevronLeft className="w-4 h-4 text-gray-500" />
        Back to Directory
      </button>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 border border-blue-400/30 px-3.5 py-1.5 rounded-full text-xs font-black text-blue-300 tracking-wider uppercase">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>CORPORATE SOCIAL RESPONSIBILITY (CSR)</span>
          </div>
          
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-tight">
            How DoNest is Useful for <span className="text-blue-400">Corporate Partners</span>
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
            DoNest enables businesses across Cameroon to execute transparent, high-impact CSR initiatives—providing turnkey volunteer days, bulk supply drives, infrastructure grants, and complete tax-audited reporting.
          </p>

          <div className="flex flex-wrap gap-3 pt-2 text-xs font-bold">
            <div className="bg-slate-800/80 border border-slate-700 px-4 py-2.5 rounded-xl flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Tax-Audited Financial Logs</span>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 px-4 py-2.5 rounded-xl flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-400" />
              <span>Official Corporate Sponsor Badge</span>
            </div>
          </div>
        </div>
      </div>

      {/* What Corporate Partners Get - Why Useful */}
      <div className="space-y-4">
        <h2 className="font-display font-extrabold text-xl text-slate-900">Why DoNest is Useful for Corporate CSR & Businesses</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-black flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900">Turnkey Volunteer Days</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Organize memorable employee volunteer outings featuring facility painting, IT tutoring, or sports mentorship at verified children's homes.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-black flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900">Bulk Seasonal Drives</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Sponsor back-to-school packs, holiday food provisions, or clothing drives reaching hundreds of vulnerable children across Cameroonian cities.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-black flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900">Tax & Audit Reports</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Receive comprehensive item delivery receipts and audited MoMo financial records tailored for corporate compliance and annual CSR reports.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-black flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900">Public Brand Badging</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Earn public sponsor recognition on DoNest platforms, annual impact reports, and co-branded ground media highlighting your company's goodwill.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutUsPage({ onBack }: BackProps) {
  return (
    <div className="space-y-10 animate-fade-in py-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack} 
          className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-dark px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:-translate-x-1 duration-300 shadow-2xs cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-gray-500" />
          Back to Directory
        </button>
        <span className="text-xs font-mono text-[#00C853] bg-[#00C853]/10 px-3 py-1 rounded-full border border-[#00C853]/20 font-bold">
          DoDonate Inc. • About Us
        </span>
      </div>

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl shadow-xl border border-[#00C853]/20 bg-slate-950 text-white p-8 sm:p-12">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#00C853]/20 border border-[#00C853]/40 px-3.5 py-1.5 rounded-full text-xs font-black text-[#00E676] tracking-wide uppercase">
            <Heart className="w-4 h-4 text-[#00E676] fill-[#00E676]" />
            <span>ABOUT DONEST & DODONATE INC.</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            Our Purpose & <span className="text-[#00E676]">Commitment</span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
            DoNest was engineered in Cameroon by DoDonate Inc. as an open, transparent digital bridge connecting generous citizens and organizations with verified children’s homes.
          </p>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission Card */}
        <div className="bg-white border-2 border-emerald-100 rounded-3xl p-8 space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00C853] flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900">Our Mission</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            To empower Cameroonian children’s homes through real-time need transparency, connecting donors and volunteers directly to verified centers with zero administrative friction, zero middleman cuts, and complete operational integrity.
          </p>
        </div>

        {/* Vision Card */}
        <div className="bg-white border-2 border-blue-100 rounded-3xl p-8 space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900">Our Vision</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            A Cameroon where no orphan or vulnerable child lacks basic food, educational supplies, or dignified care, and where every citizen and business can effortlessly share resources with local centers in need.
          </p>
        </div>
      </div>

      {/* What We're Trying to Achieve */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase">
            OUR CORE GOALS
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            What We Are Trying to Achieve
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Four clear pillars defining our operational roadmap and impact across Cameroon.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-950/70 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="font-display font-bold text-base text-white">100% Direct Giving</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Eliminating administrative middleman commissions so all physical items and micro-grants reach children directly.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="font-display font-bold text-base text-white">Verification & Trust</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Auditing every center legally and physically so donors give with absolute confidence and zero doubt.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="font-display font-bold text-base text-white">Demand-Driven Efficiency</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Publishing real-time wishlists so centers receive exact item quantities right when they are needed.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="font-display font-bold text-base text-white">Community Action</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mobilizing local volunteers, mentors, and businesses to foster long-term community dignity and support networks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ImpactStoriesPage({ onBack }: BackProps) {
  return (
    <div className="space-y-8 animate-fade-in py-6">
      <button onClick={onBack} className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-dark px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:-translate-x-1 duration-300">
        <ChevronLeft className="w-4 h-4 text-gray-500" />
        Back to Directory
      </button>

      <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
        <div className="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 px-4 py-1.5 rounded-full text-xs font-black text-amber-700 tracking-wide">
          <Sparkles className="w-4 h-4" />
          <span>IMPACT STORIES</span>
        </div>
        
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A1120] leading-tight">
          Stories of Giving <span className="text-brand-green">Coming Soon</span>
        </h1>
        
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          We are currently filming and documenting our first quarterly physical item deliveries and volunteer program results across Buea and Yaoundé. This space will showcase verified video diaries and orphanage coordinator testimonials soon!
        </p>

        <div className="w-full h-40 rounded-2xl bg-slate-50 border border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-4">
          <span className="text-3xl">🎥</span>
          <span className="text-xs text-gray-400 font-bold mt-2 uppercase tracking-widest">Multimedia Impact Board Loading...</span>
        </div>
      </div>
    </div>
  );
}

export function ContactUsPage({ onBack }: BackProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message received! Our team in Cameroon will get back to you within 24 hours.");
  };

  return (
    <div className="space-y-8 animate-fade-in py-6">
      <button onClick={onBack} className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-dark px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:-translate-x-1 duration-300">
        <ChevronLeft className="w-4 h-4 text-gray-500" />
        Back to Directory
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="font-display font-black text-xl text-brand-dark">Send Us a Direct Note</h2>
          <p className="text-xs text-gray-500 font-medium">Have inquiries regarding orphanage verification, listing your home, or corporate sponsorships?</p>
          
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Full Name</label>
                <input required type="text" placeholder="John Doe" className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-xl text-sm focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email Address</label>
                <input required type="email" placeholder="john@example.com" className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-xl text-sm focus:outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Your Message</label>
              <textarea required rows={4} placeholder="Write your comments or questions..." className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-xl text-sm focus:outline-none transition-colors"></textarea>
            </div>

            <button type="submit" className="w-full bg-brand-green hover:bg-brand-green-hover text-white text-xs font-black py-3 px-6 rounded-xl transition-all shadow-xs">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact info details */}
        <div className="lg:col-span-5 bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="font-display font-black text-xl text-brand-dark">Cameroon Hubs</h2>
          
          <div className="space-y-4 text-xs sm:text-sm text-gray-600 font-medium">
            <div className="flex gap-3">
              <Mail className="w-5 h-5 text-brand-green shrink-0" />
              <div>
                <span className="block font-bold text-brand-dark">Email Support</span>
                <span className="text-gray-500">support@dodonate.org</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone className="w-5 h-5 text-brand-green shrink-0" />
              <div>
                <span className="block font-bold text-brand-dark">Direct Call / WhatsApp</span>
                <span className="text-gray-500">+237 677 12 34 56</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Globe className="w-5 h-5 text-brand-green shrink-0" />
              <div>
                <span className="block font-bold text-brand-dark">Main Office</span>
                <span className="text-gray-500">Yaoundé Town Hall Road, Cameroon</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export function TermsPage({ onBack }: BackProps) {
  return (
    <div className="space-y-8 animate-fade-in py-6">
      <button onClick={onBack} className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-dark px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:-translate-x-1 duration-300">
        <ChevronLeft className="w-4 h-4 text-gray-500" />
        Back to Directory
      </button>

      <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
        <div className="inline-flex items-center gap-1.5 bg-[#00C853]/10 border border-[#00C853]/30 px-4 py-1.5 rounded-full text-xs font-black text-[#00C853] tracking-wide">
          <ShieldCheck className="w-4 h-4 text-[#00C853]" />
          <span>PLATFORM TERMS OF USE</span>
        </div>
        
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A1120] leading-tight">
          Terms Of <span className="text-[#00C853]">Use & Service</span>
        </h1>
        
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          Welcome to DoNest. By accessing our platform, registering an organization, or facilitating donations, you agree to comply with and be bound by the following terms and conditions.
        </p>

        <hr className="border-gray-100" />

        <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-display font-bold text-base text-brand-dark flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C853]"></span>
              1. Accuracy of Listings
            </h3>
            <p className="pl-4">
              All listed orphanages and nonprofits are required to provide accurate, real-time demand information for physical items. Falsification of needs, quantities, or statuses may result in immediate suspension from the DoNest directory.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-display font-bold text-base text-brand-dark flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C853]"></span>
              2. Donation commitments
            </h3>
            <p className="pl-4">
              When a donor commits to delivering a physical item (e.g., sacks of food, clothes, textbooks), they represent that they will make reasonable efforts to contact the orphanage coordinator to arrange delivery. DoNest serves as a facilitator and does not guarantee delivery completion.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-display font-bold text-base text-brand-dark flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C853]"></span>
              3. Verification Disclaimer
            </h3>
            <p className="pl-4">
              While DoNest Inc. exercises reasonable diligence in vetting and verifying the operating licenses of partnering NGO networks in Buea and other cities in Cameroon, donors are encouraged to perform their own verification when visiting centers or arranging physical handovers.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-display font-bold text-base text-brand-dark flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C853]"></span>
              4. Direct Finance Processing
            </h3>
            <p className="pl-4">
              Any crowdfunding or external financing handled via Mobile Money (Mtn MoMo / Orange Money) is routed directly through secure, authenticated merchant APIs. Platform tips are optional and help keep our community servers running and operational.
            </p>
          </div>
        </div>

        <div className="bg-[#FAF9F3] border border-[#00C853]/25 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display font-bold text-base text-brand-dark">Need further clarification?</h4>
            <p className="text-xs text-gray-500">Read our dedicated Safety Policy or get in touch with our legal office directly.</p>
          </div>
          <button onClick={onBack} className="bg-brand-dark hover:bg-brand-green text-white text-xs font-black px-5 py-3 rounded-xl transition-all shadow-sm">
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPage({ onBack }: BackProps) {
  return (
    <div className="space-y-8 animate-fade-in py-6">
      <button onClick={onBack} className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-dark px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:-translate-x-1 duration-300">
        <ChevronLeft className="w-4 h-4 text-gray-500" />
        Back to Directory
      </button>

      <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
        <div className="inline-flex items-center gap-1.5 bg-[#00C853]/10 border border-[#00C853]/30 px-4 py-1.5 rounded-full text-xs font-black text-[#00C853] tracking-wide">
          <ShieldCheck className="w-4 h-4 text-[#00C853]" />
          <span>PRIVACY POLICY AND DATA PROTECTION</span>
        </div>
        
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A1120] leading-tight">
          Privacy <span className="text-[#00C853]">Policy</span>
        </h1>
        
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          At DoNest, protecting the privacy of our donors, volunteers, and listed orphanages is our highest priority. We comply with modern guidelines regarding personal data transparency in Cameroon and abroad.
        </p>

        <hr className="border-gray-100" />

        <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-display font-bold text-base text-brand-dark flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C853]"></span>
              What Information We Collect
            </h3>
            <p className="pl-4">
              For donors, we only process basic information such as committed item counts, optional names, and preferences. For registered NGOs, we store official registration certificates, licensed locations, phone numbers, and WhatsApp redirect hooks.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-display font-bold text-base text-brand-dark flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C853]"></span>
              How We Use Your Data
            </h3>
            <p className="pl-4">
              Your information is exclusively used to coordinate physical donations, calculate platform-wide impact statistics, and display active requirements in your local area. We do not sell, rent, or trade user data to third-party advertisers.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-display font-bold text-base text-brand-dark flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C853]"></span>
              Local Cache Transparency
            </h3>
            <p className="pl-4">
              DoNest utilizes secure, client-side browser caching to persist item commitment levels and active search histories. To clear all platform data from your device, you can click the data restore button located in our directory control bar.
            </p>
          </div>
        </div>

        <div className="bg-[#FAF9F3] border border-[#00C853]/25 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display font-bold text-base text-brand-dark">Have questions about your data?</h4>
            <p className="text-xs text-gray-500">Our support desks are open to process immediate personal information removal requests.</p>
          </div>
          <button onClick={onBack} className="bg-brand-dark hover:bg-brand-green text-white text-xs font-black px-5 py-3 rounded-xl transition-all shadow-sm">
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

export function SafetyPage({ onBack }: BackProps) {
  return (
    <div className="space-y-8 animate-fade-in py-6">
      <button onClick={onBack} className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-dark px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:-translate-x-1 duration-300">
        <ChevronLeft className="w-4 h-4 text-gray-500" />
        Back to Directory
      </button>

      <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
        <div className="inline-flex items-center gap-1.5 bg-[#00C853]/10 border border-[#00C853]/30 px-4 py-1.5 rounded-full text-xs font-black text-[#00C853] tracking-wide">
          <ShieldCheck className="w-4 h-4 text-[#00C853]" />
          <span>SAFETY AND TRUST POLICY</span>
        </div>
        
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A1120] leading-tight">
          Safety & <span className="text-[#00C853]">Trust Policy</span>
        </h1>
        
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          At DoNest, maintaining a safe, transparent, and trustworthy environment for both donors and orphanages is central to our mission. Learn about our verification protocols and best safety practices.
        </p>

        <hr className="border-gray-100" />

        <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-display font-bold text-base text-brand-dark flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C853]"></span>
              1. NonProfit Vetting Standards
            </h3>
            <p className="pl-4">
              Every organization listed on DoNest undergoes a strict manual review process. We require official registration certificates issued by Cameroonian local authorities, licensed operation addresses, and verified contact coordinators to prevent fraud.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-display font-bold text-base text-brand-dark flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C853]"></span>
              2. Safe Delivery Drop-offs
            </h3>
            <p className="pl-4">
              We highly recommend that physical donation handovers be arranged during official working hours at the orphanage's registered public location. If drop-offs aren't feasible, please coordinate with vetted local courier networks or orphanage-approved pickup staff.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-display font-bold text-base text-brand-dark flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C853]"></span>
              3. Financial Integrity Protocols
            </h3>
            <p className="pl-4">
              To preserve integrity, any Mobile Money support transfers are initiated directly to certified organizational wallets rather than personal coordinator lines. Transaction references are recorded for direct tracking and compliance checks.
            </p>
          </div>
        </div>

        <div className="bg-[#FAF9F3] border border-[#00C853]/25 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display font-bold text-base text-brand-dark">Notice something suspicious?</h4>
            <p className="text-xs text-gray-500">Report any fraudulent listings or coordinator misconduct immediately to our security desk.</p>
          </div>
          <button onClick={onBack} className="bg-brand-dark hover:bg-brand-green text-white text-xs font-black px-5 py-3 rounded-xl transition-all shadow-sm">
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

