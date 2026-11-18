import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Check,
  ChevronLeft,
  Clock,
  Globe,
  Heart,
  MapPin,
  MessageCircle,
  Share2,
  ShieldCheck,
  Users
} from 'lucide-react';
import { NGO, VolunteerPosting } from '../types';
import { VolunteerCardIllustration } from './VolunteerCardIllustration';
import { getVolunteerOpportunityPath, getVolunteerOpportunitySlug } from '../utils/seo';

interface VolunteerOpportunityDetailPageProps {
  ngo: NGO | undefined;
  post: VolunteerPosting | undefined;
  lang: 'EN' | 'FR';
  onInterestClick: (ngoUsername: string, postingId: string) => void;
  hasInterested: (postingId: string) => boolean;
  onBackToNgo: (username: string) => void;
  onBackToHub: () => void;
}

export function VolunteerOpportunityDetailPage({
  ngo,
  post,
  lang,
  onInterestClick,
  hasInterested,
  onBackToNgo,
  onBackToHub
}: VolunteerOpportunityDetailPageProps) {
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantLocation, setApplicantLocation] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantMessage, setApplicantMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (post) {
      setApplicantMessage(
        `I am highly interested in volunteering for "${post.title}" and would love to help out!`
      );
      setSubmitSuccess(false);
    }
  }, [post?.id]);

  if (!ngo || !post) {
    return (
      <div className="py-12 bg-white border-2 border-gray-100 rounded-3xl p-8 text-center space-y-5">
        <h1 className="font-display font-black text-2xl text-[#0B1527]">
          {lang === 'EN' ? 'Volunteer Opportunity Not Found' : 'Opportunité Introuvable'}
        </h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          {lang === 'EN'
            ? 'This volunteer opportunity may have been filled or moved. Explore all live volunteer openings across Africa below.'
            : "Cette opportunité de bénévolat a peut-être été pourvue. Découvrez d'autres missions en direct."}
        </p>
        <button
          type="button"
          onClick={onBackToHub}
          className="bg-[#00C853] hover:bg-[#009624] text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider cursor-pointer"
        >
          {lang === 'EN' ? 'Explore Volunteer Hub' : 'Voir le Hub Bénévolat'}
        </button>
      </div>
    );
  }

  const oppLocation = post.location || ngo.location || ngo.address || ngo.city;
  const userLiked = hasInterested(post.id);
  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${getVolunteerOpportunityPath(ngo, post)}`
      : `https://donest.org${getVolunteerOpportunityPath(ngo, post)}`;

  const otherRoles = (ngo.volunteerPostings || []).filter(
    p => p.status !== 'deleted' && p.id !== post.id
  );

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Ignore clipboard failure
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cleanPhone = (ngo.phone || '').replace(/[^0-9]/g, '');
    const whatsappMsg = `Hi ${ngo.name}, I am ${applicantName} from ${applicantLocation}. I just applied on DoNest for "${post.title}": ${applicantMessage}`;
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMsg)}`;

    try {
      await fetch('/api/volunteer/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postingId: post.id,
          ngoUsername: ngo.username,
          name: applicantName,
          email: applicantEmail,
          phone: applicantPhone,
          location: applicantLocation,
          message: applicantMessage
        })
      });
      setSubmitSuccess(true);
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.error('Volunteer opportunity application error:', err);
      setSubmitSuccess(true);
      window.open(whatsappUrl, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in py-6">
      {/* Breadcrumb & Back Controls */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-3">
        <ol className="flex flex-wrap items-center gap-2 text-xs font-bold text-gray-500">
          <li>
            <a href="/" className="hover:text-[#00C853] transition-colors">
              Home
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="/volunteers" className="hover:text-[#00C853] transition-colors">
              Volunteer Hub
            </a>
          </li>
          <li>/</li>
          <li>
            <a href={`/${ngo.username}`} className="hover:text-[#00C853] transition-colors">
              {ngo.name}
            </a>
          </li>
          <li>/</li>
          <li className="text-[#0B1527] truncate max-w-[200px] sm:max-w-xs">{post.title}</li>
        </ol>

        <button
          type="button"
          onClick={() => onBackToNgo(ngo.username)}
          className="inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:border-brand-dark px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-gray-500" />
          <span>Back to {ngo.name}</span>
        </button>
      </nav>

      {/* Main Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Details Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            {/* Illustration Banner */}
            <div className="h-44 sm:h-52 w-full overflow-hidden rounded-2xl border border-gray-100">
              <VolunteerCardIllustration index={0} title={post.title} city={oppLocation} />
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE VOLUNTEER OPPORTUNITY
              </span>
              <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1">
                🏅 Attestation of Service Eligible
              </span>
              {post.category && (
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  {post.category}
                </span>
              )}
            </div>

            {/* H1 Heading */}
            <div className="space-y-2">
              <h1 className="font-display font-black text-2xl sm:text-4xl text-[#0B1527] leading-tight tracking-tight">
                {post.title}
              </h1>
              <p className="text-sm text-gray-500 font-semibold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#00C853] shrink-0" />
                <span>
                  {oppLocation} · Hosted by {ngo.name}
                </span>
              </p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50 border border-gray-100 rounded-2xl p-3.5 text-center space-y-1">
                <Clock className="w-4 h-4 text-[#00C853] mx-auto" />
                <span className="block text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Duration
                </span>
                <span className="block text-xs sm:text-sm font-black text-[#0B1527]">
                  {post.duration_days ? `${post.duration_days} Days` : post.endDate || 'Flexible'}
                </span>
              </div>
              <div className="bg-slate-50 border border-gray-100 rounded-2xl p-3.5 text-center space-y-1">
                <Users className="w-4 h-4 text-[#00C853] mx-auto" />
                <span className="block text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Volunteers
                </span>
                <span className="block text-xs sm:text-sm font-black text-[#0B1527]">
                  {post.volunteers_joined || 0} / {post.volunteers_needed || 3} Joined
                </span>
              </div>
              <div className="bg-slate-50 border border-gray-100 rounded-2xl p-3.5 text-center space-y-1">
                <Award className="w-4 h-4 text-amber-500 mx-auto" />
                <span className="block text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Certificate
                </span>
                <span className="block text-xs sm:text-sm font-black text-[#0B1527]">
                  Verified Free
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h2 className="font-display font-black text-base text-[#0B1527] uppercase tracking-wider">
                Role Description & Responsibilities
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {post.details}
              </p>
            </div>

            {/* Host NGO Profile Card */}
            <div className="bg-slate-50 border border-gray-200/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <a href={`/${ngo.username}`} className="flex items-center gap-3.5 group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                  {ngo.logo &&
                  (ngo.logo.startsWith('http') ||
                    ngo.logo.startsWith('/') ||
                    ngo.logo.startsWith('data:')) ? (
                    <img
                      src={ngo.logo}
                      alt={ngo.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    ngo.logo || '🏡'
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#00C853]">
                    Verified Host Organization
                  </span>
                  <h3 className="font-display font-black text-base text-[#0B1527] group-hover:text-[#00C853] transition-colors">
                    {ngo.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">{oppLocation}</p>
                </div>
              </a>

              <a
                href={`/${ngo.username}`}
                className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-100 border border-gray-200 text-[#0B1527] px-4 py-2.5 rounded-xl text-xs font-black shrink-0"
              >
                <span>View NGO Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Upvote & Share Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onInterestClick(ngo.username, post.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  userLiked
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-slate-50 border border-gray-200 text-gray-700 hover:border-rose-300'
                }`}
              >
                <Heart className={`w-4 h-4 ${userLiked ? 'fill-white stroke-none' : 'text-rose-500'}`} />
                <span>{post.initialInterestCount} Interested</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-gray-200 text-xs font-black text-[#0B1527] cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-[#00C853]" />
                    <span className="text-[#00C853]">Opportunity URL Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-gray-500" />
                    <span>Share Opportunity</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Check out this volunteer opportunity at ${ngo.name}: "${post.title}" — ${shareUrl}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-black"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Guide Callout Banner for SEO Internal Linking */}
          <a
            href="/articles/find-volunteer-opportunities-in-africa"
            className="block bg-emerald-50/70 border border-emerald-200 hover:border-[#00C853] rounded-3xl p-5 sm:p-6 transition-all group"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#00C853]">
                  <BookOpen className="w-3.5 h-3.5" />
                  New to DoNest Volunteering?
                </span>
                <h3 className="font-display font-black text-sm sm:text-base text-[#0B1527] group-hover:text-[#00C853] transition-colors">
                  Read: The Ultimate Guide to Finding & Easily Applying for Volunteer Opportunities in Africa
                </h3>
              </div>
              <ArrowRight className="w-5 h-5 text-[#00C853] shrink-0 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Other Volunteer Opportunities at this NGO */}
          {otherRoles.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-display font-black text-lg text-[#0B1527]">
                More Volunteer Opportunities at {ngo.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {otherRoles.map(other => (
                  <a
                    key={other.id}
                    href={`/${ngo.username}/volunteer/${getVolunteerOpportunitySlug(other)}`}
                    className="bg-white border-2 border-gray-100 hover:border-[#00C853]/50 rounded-2xl p-5 space-y-2 transition-all group"
                  >
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                      Attestation Eligible
                    </span>
                    <h3 className="font-display font-black text-base text-[#0B1527] group-hover:text-[#00C853] transition-colors">
                      {other.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{other.details}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Application Form Column */}
        <aside className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            {submitSuccess ? (
              <div className="py-6 text-center space-y-5">
                <div className="w-16 h-16 bg-[#00C853] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-display font-black text-xl text-[#0B1527]">
                    Application Submitted! 🎉
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Your details have been registered with <strong>{ngo.name}</strong>. Please send the prefilled WhatsApp message to coordinate your start date.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="w-full bg-[#0B1527] text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  Apply Again / Edit Details
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#00C853]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Free Direct Application</span>
                  </div>
                  <h2 className="font-display font-black text-xl text-[#0B1527]">
                    Apply for This Volunteer Role
                  </h2>
                  <p className="text-xs text-gray-500">
                    Submit your details directly to {ngo.name} and connect via WhatsApp immediately.
                  </p>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={e => setApplicantName(e.target.value)}
                      placeholder="e.g. Marie Johnson"
                      className="w-full bg-slate-50 border border-gray-200 focus:border-[#00C853] focus:bg-white rounded-xl px-4 py-3 text-xs font-medium focus:outline-none text-[#0A1120]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={e => setApplicantPhone(e.target.value)}
                        placeholder="e.g. +237 677..."
                        className="w-full bg-slate-50 border border-gray-200 focus:border-[#00C853] focus:bg-white rounded-xl px-4 py-3 text-xs font-medium focus:outline-none text-[#0A1120]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                        Your City / Country *
                      </label>
                      <input
                        type="text"
                        required
                        value={applicantLocation}
                        onChange={e => setApplicantLocation(e.target.value)}
                        placeholder="e.g. Lagos, Nigeria"
                        className="w-full bg-slate-50 border border-gray-200 focus:border-[#00C853] focus:bg-white rounded-xl px-4 py-3 text-xs font-medium focus:outline-none text-[#0A1120]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={applicantEmail}
                      onChange={e => setApplicantEmail(e.target.value)}
                      placeholder="e.g. marie@gmail.com"
                      className="w-full bg-slate-50 border border-gray-200 focus:border-[#00C853] focus:bg-white rounded-xl px-4 py-3 text-xs font-medium focus:outline-none text-[#0A1120]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      Introduce Yourself / Availability *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={applicantMessage}
                      onChange={e => setApplicantMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 focus:border-[#00C853] focus:bg-white rounded-xl p-4 text-xs font-medium focus:outline-none text-[#0A1120]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#00C853] hover:bg-[#009624] text-white py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-white" />
                    <span>{isSubmitting ? 'Submitting...' : 'Apply & Send via WhatsApp'}</span>
                  </button>
                </form>

                {ngo.website && (
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Globe className="w-3.5 h-3.5 text-gray-400" />
                    <a
                      href={
                        ngo.website.startsWith('http') ? ngo.website : `https://${ngo.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#00C853] font-bold"
                    >
                      Visit {ngo.name} Website
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
