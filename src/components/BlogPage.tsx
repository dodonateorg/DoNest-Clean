import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  HelpCircle, 
  Search, 
  Users, 
  Gift, 
  DollarSign, 
  Award, 
  Bookmark,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  headerImage: string;
  headerImageAlt: string;
  publishedDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'dodonate-is-now-free',
    title: 'DoDonate Is Now Free: 100% of Donations Go Directly to NGOs with Zero Platform Cuts',
    metaTitle: 'DoDonate Is Now Free - 100% Donations Guarantee for African NGOs',
    metaDescription: 'DoDonate eliminates all platform fees. African non-profits, orphanages, and charities now receive 100% of donor contributions directly via Mobile Money and bank accounts with zero cuts.',
    excerpt: 'We have removed all platform fee cuts forever. Every single cent and franc donated through DoDonate now lands directly in the verified accounts of African charities, orphanages, and community programs.',
    headerImage: 'https://iili.io/nW2XLwx.png',
    headerImageAlt: 'DoDonate Is Now Free Announcement Banner',
    publishedDate: 'October 12, 2026',
    readTime: '6 min read',
    author: {
      name: 'DoDonate Impact Editorial',
      role: 'Platform Leadership & Philanthropy Tech',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    category: 'Platform Announcement',
    tags: ['0% Fees', 'Nonprofit Tech', 'African Philanthropy', 'Mobile Money', 'Transparency']
  },
  {
    slug: 'best-fundraising-software-in-africa',
    title: 'Best Fundraising Software in Africa: Top Platforms Compared for Nonprofits & Charities (2026 Guide)',
    metaTitle: 'Best Fundraising Software in Africa: 2026 Comparison for Nonprofits',
    metaDescription: 'A comprehensive guide comparing the best fundraising software in Africa. Compare Mobile Money integrations, platform fee cuts, donor trust badges, and volunteer hubs for African NGOs.',
    excerpt: 'Choosing the right donation platform in Africa can double your charity’s revenue. We compare DoDonate, GlobalGiving, GoFundMe, and local gateways on fees, Mobile Money, and local trust.',
    headerImage: 'https://iili.io/nVoR9ZG.png',
    headerImageAlt: 'Best Fundraising Software in Africa Banner',
    publishedDate: 'October 10, 2026',
    readTime: '10 min read',
    author: {
      name: 'Ramsone Ekwe',
      role: 'Head of Product & Community Architecture',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    category: 'Industry Guide & Software Review',
    tags: ['Fundraising Software', 'Africa Tech', 'NGO Crowdfunding', 'Donor Management', 'Mobile Money']
  }
];

interface BlogPageProps {
  slug?: string;
  onBack: () => void;
  onNavigatePost: (slug: string) => void;
  lang?: 'EN' | 'FR';
}

export function BlogPage({ slug, onBack, onNavigatePost, lang = 'EN' }: BlogPageProps) {
  const [copied, setCopied] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const currentPost = BLOG_POSTS.find(p => p.slug === slug);

  const handleShare = (platform: 'whatsapp' | 'twitter' | 'linkedin' | 'facebook' | 'copy') => {
    const url = window.location.href;
    const title = currentPost ? currentPost.title : 'DoDonate Blog - African Nonprofit Tech & Fundraising';

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      return;
    }

    let shareUrl = '';
    if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}\n\nRead more at: ${url}`)}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&via=mydodonate`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // If a specific blog post is requested
  if (currentPost) {
    const isFreeArticle = currentPost.slug === 'dodonate-is-now-free';
    const otherPost = BLOG_POSTS.find(p => p.slug !== currentPost.slug);

    return (
      <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-16">
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-brand-dark rounded-xl text-gray-700 hover:text-brand-dark text-xs sm:text-sm font-bold transition-all shadow-3xs cursor-pointer group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{lang === 'EN' ? 'Back to All Articles' : 'Retour aux articles'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
              {lang === 'EN' ? 'Share:' : 'Partager:'}
            </span>
            <button
              onClick={() => handleShare('whatsapp')}
              title="Share on WhatsApp"
              className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors cursor-pointer text-xs font-bold"
            >
              💬 WhatsApp
            </button>
            <button
              onClick={() => handleShare('twitter')}
              title="Share on X (Twitter)"
              className="p-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer text-xs font-bold"
            >
              𝕏 Post
            </button>
            <button
              onClick={() => handleShare('copy')}
              title="Copy Article Link"
              className="inline-flex items-center gap-1.5 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Hero Article Header */}
        <article className="bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8 overflow-hidden">
          {/* Category & Metadata header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-[#00C853]/10 text-[#00C853] text-xs font-black uppercase tracking-wider">
                {currentPost.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                {currentPost.publishedDate}
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {currentPost.readTime}
              </span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
              {currentPost.title}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-3xl">
              {currentPost.excerpt}
            </p>

            {/* Author info pill */}
            <div className="flex items-center gap-3.5 pt-2 border-t border-gray-100">
              <img 
                src={currentPost.author.avatar} 
                alt={currentPost.author.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-100" 
              />
              <div>
                <p className="font-display font-bold text-sm text-slate-900">
                  {currentPost.author.name}
                </p>
                <p className="text-xs text-gray-500">
                  {currentPost.author.role}
                </p>
              </div>
            </div>
          </div>

          {/* Featured Banner Image */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-slate-900">
            <img 
              src={currentPost.headerImage} 
              alt={currentPost.headerImageAlt}
              className="w-full h-auto max-h-[500px] object-cover object-center"
            />
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-md">
              DoDonate Official Publication
            </div>
          </div>

          {/* Executive Summary Callout */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border-l-4 border-[#00C853] p-5 sm:p-6 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-[#00C853] font-display font-black text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Key Takeaway for Nonprofits & Donors</span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
              {isFreeArticle 
                ? "Starting immediately, DoDonate waives 100% of platform fees. When a supporter donates 10,000 FCFA ($16 USD) or any amount, the recipient non-profit receives the full 10,000 FCFA directly to their Mobile Money or bank account. Zero middleman deductions."
                : "African non-profits lose thousands annually to high platform cuts (5% to 15%) and unsupported Mobile Money payouts. In this 2026 evaluation, DoDonate takes the #1 ranking for grassroots charities due to its 0% platform fee guarantee, native Mobile Money support, and verified physical in-kind wishlist engine."}
            </p>
          </div>

          {/* MAIN ARTICLE BODY CONTENT */}
          {isFreeArticle ? (
            /* ARTICLE 1 BODY: DODONATE IS NOW FREE */
            <div className="space-y-8 text-slate-800 text-base leading-relaxed font-normal">
              
              <section className="space-y-4">
                <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 tracking-tight flex items-center gap-2.5">
                  <span className="text-[#00C853]">1.</span>
                  The Broken Economics of African Charity Fundraising
                </h2>
                <p>
                  For years, charities, orphanages, and community initiatives across Africa have faced a harsh reality when attempting to raise funds online. International crowdfunding and donation tools are overwhelmingly engineered for North American and European banking rails. When African grassroot founders set up campaigns on conventional platforms, they routinely encounter:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>High Platform Cuts:</strong> Traditional platforms take between <strong>5% and 12%</strong> off every donation as a "platform commission".</li>
                  <li><strong>Foreign Currency Conversions:</strong> Donors pay in USD or EUR, which undergo multiple punitive exchange rate spreads before reaching African bank accounts.</li>
                  <li><strong>Payout Restrictions:</strong> Most international platforms do not support native African Mobile Money (MTN MoMo, Orange Money, Airtel, M-Pesa). Instead, they mandate foreign bank accounts or slow international wire transfers with hefty $30–$50 transfer charges.</li>
                </ul>
                <p>
                  In practice, if an African children's home managed to raise $1,000 to cover annual school supplies, up to <strong>$150 to $250 was lost</strong> before the funds ever fed a child or bought a book.
                </p>
              </section>

              {/* Infobox: The 100% Guarantee */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl space-y-4 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#FFE600] font-black">
                    Official Policy Update
                  </span>
                  <span className="text-xs bg-[#00C853] text-white px-2.5 py-0.5 rounded-full font-bold">
                    Effective Immediately
                  </span>
                </div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                  The DoDonate 100% Direct Giving Policy
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  We built DoDonate with one unwavering mission: to connect donors directly with vulnerable children and verified grassroot causes across Africa without intermediaries eroding their support. Today, we take this mission to its ultimate conclusion.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <p className="text-2xl font-black text-[#00C853]">0%</p>
                    <p className="text-xs text-slate-300 font-semibold mt-1">Platform Commission</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <p className="text-2xl font-black text-[#FFE600]">100%</p>
                    <p className="text-xs text-slate-300 font-semibold mt-1">Delivered to Charities</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <p className="text-2xl font-black text-emerald-400">Direct</p>
                    <p className="text-xs text-slate-300 font-semibold mt-1">Mobile Money Payouts</p>
                  </div>
                </div>
              </div>

              <section className="space-y-4">
                <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 tracking-tight flex items-center gap-2.5">
                  <span className="text-[#00C853]">2.</span>
                  How DoDonate Sustains Operations Without Charging NGOs
                </h2>
                <p>
                  A common question from nonprofit directors and transparency advocates is: <em>"If DoDonate does not take a cut from donations, how do you pay for server infrastructure, verification audits, and engineering?"</em>
                </p>
                <p>
                  Our model is inspired by ethical software principles that separate charity funding from platform sustainability:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-gray-100 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <h3 className="font-display font-bold text-base text-slate-900">Voluntary Donor Tipping</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Generous supporters have the optional choice to leave a small voluntary tip to cover DoDonate platform hosting when making a donation. This is entirely optional and never forced.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-gray-100 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <h3 className="font-display font-bold text-base text-slate-900">Corporate CSR Partnerships</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Telecoms, banks, and enterprises that sponsor bulk community drives and employee volunteering programs pay for enterprise reporting tools, cross-subsidizing the free tier for grassroots orphanages.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 tracking-tight flex items-center gap-2.5">
                  <span className="text-[#00C853]">3.</span>
                  What 100% Giving Means on the Ground
                </h2>
                <p>
                  Eliminating fee cuts directly changes the daily reality of grassroot centers. In practical terms:
                </p>
                <div className="border border-gray-200 rounded-2xl divide-y divide-gray-100 overflow-hidden shadow-3xs">
                  <div className="p-4 sm:p-5 flex items-start gap-4 bg-white">
                    <CheckCircle2 className="w-5 h-5 text-[#00C853] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-900">More Food on the Table</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                        The money saved from zero platform cuts provides an extra 50kg bag of rice or vital infant formula every single month.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex items-start gap-4 bg-white">
                    <CheckCircle2 className="w-5 h-5 text-[#00C853] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-900">100% of Physical Gaps Addressed</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                        Through DoNest’s physical wishlist directory, donors can directly deliver physical mattresses, school uniforms, and medicines with 0% intermediary markup.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex items-start gap-4 bg-white">
                    <CheckCircle2 className="w-5 h-5 text-[#00C853] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-900">Instant Mobile Payouts</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                        No 30-day withholding periods. Donations clear through instant Mobile Money APIs straight to the charity's authorized SIM wallet.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quote block */}
              <blockquote className="border-l-4 border-amber-400 bg-amber-50/60 p-6 rounded-r-2xl italic text-slate-800 text-base font-serif">
                "As an orphanage director caring for 34 children, every franc matters. When our donors learned that DoDonate takes 0% cuts, their trust skyrocketed. They knew their sacrifice was going straight into our children's education."
                <div className="mt-3 text-xs font-sans font-bold text-slate-600 not-italic">
                  — Sister Marie, Director at St. Philomena Children's Center
                </div>
              </blockquote>

              <section className="space-y-4">
                <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 tracking-tight flex items-center gap-2.5">
                  <span className="text-[#00C853]">4.</span>
                  How African Nonprofits Can Join for Free
                </h2>
                <p>
                  Any verified African charity, orphanage, or community organization can activate their 100% free donation profile in three steps:
                </p>
                <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                  <li><strong>Submit Organization Registration:</strong> Provide your ministry/government registration documents and local coordinator identification.</li>
                  <li><strong>Onsite / Document Verification:</strong> Our safety team audits location coordinates, beneficiary lists, and past track records.</li>
                  <li><strong>Publish Verified Wishlists & Mobile Money Payouts:</strong> Go live within 24 hours to receive direct physical goods, volunteer applications, and cash donations with 0% platform cuts.</li>
                </ol>
              </section>

              {/* Frequently Asked Questions */}
              <section className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="font-display font-black text-lg text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-emerald-600" />
                  Frequently Asked Questions (FAQ)
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-gray-100">
                    <p className="font-bold text-sm text-slate-900">Are standard payment gateway merchant fees applicable?</p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      DoDonate charges $0.00 platform fee. Standard telecom Mobile Money network transfer fees (typically 1–2% charged by MTN or Orange network operators) apply as standard carrier protocol, but DoDonate takes zero commission.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-gray-100">
                    <p className="font-bold text-sm text-slate-900">Can diaspora donors donate using international credit cards?</p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      Yes! Donors from Europe, the US, Canada, and across the globe can donate using Visa, Mastercard, or Mobile Money, and funds are automatically settled directly to the recipient organization.
                    </p>
                  </div>
                </div>
              </section>

            </div>
          ) : (
            /* ARTICLE 2 BODY: BEST FUNDRAISING SOFTWARE IN AFRICA */
            <div className="space-y-8 text-slate-800 text-base leading-relaxed font-normal">
              
              <section className="space-y-4">
                <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 tracking-tight flex items-center gap-2.5">
                  <span className="text-[#00C853]">1.</span>
                  The Reality of Nonprofit Fundraising in Africa
                </h2>
                <p>
                  Fundraising in Africa is fundamentally different from fundraising in Western markets. While platforms like GoFundMe and Kickstarter dominate North American philanthropy, they often fail completely when deployed in African contexts. 
                </p>
                <p>
                  A non-profit software platform operating in Africa must solve three critical realities:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-gray-100 space-y-1.5">
                    <div className="text-emerald-600 font-black text-sm uppercase tracking-wide">
                      📱 Mobile Money First
                    </div>
                    <p className="text-xs text-gray-600">
                      Over 80% of digital transactions in Sub-Saharan Africa happen via Mobile Money (MTN MoMo, Orange Money, M-Pesa). Credit card-only platforms fail.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-gray-100 space-y-1.5">
                    <div className="text-blue-600 font-black text-sm uppercase tracking-wide">
                      📦 In-Kind Physical Needs
                    </div>
                    <p className="text-xs text-gray-600">
                      African orphanages need bags of rice, school textbooks, and shoes just as much as cash. Platforms that only handle cash miss 60% of giving.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-gray-100 space-y-1.5">
                    <div className="text-amber-600 font-black text-sm uppercase tracking-wide">
                      🛡️ Rigorous Trust & Vetting
                    </div>
                    <p className="text-xs text-gray-600">
                      Donors are wary of scams. Verified badges, physical address GPS verification, and direct coordinator contacts are required to convert donors.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 tracking-tight flex items-center gap-2.5">
                  <span className="text-[#00C853]">2.</span>
                  Top 5 Fundraising Platforms in Africa Compared
                </h2>
                <p>
                  We evaluated the major fundraising and donation management platforms available to African NGOs based on platform fee rates, payment options, local support, and features.
                </p>

                {/* Platform 1: DoDonate */}
                <div className="border-2 border-emerald-500/40 bg-emerald-50/20 rounded-2xl p-6 space-y-3 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#00C853] text-white flex items-center justify-center font-black text-xs">
                        #1
                      </span>
                      <h3 className="font-display font-black text-lg text-slate-900">
                        DoDonate / DoNest — Best Overall for African Nonprofits
                      </h3>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-black px-3 py-1 rounded-full uppercase tracking-wider">
                      Editor's Choice
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    <strong>DoDonate</strong> is purpose-built for African orphanages, grassroots charities, and community programs. It offers an all-in-one ecosystem combining zero-fee cash crowdfunding, direct physical wishlists, and volunteer recruitment.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold pt-1">
                    <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                      <span className="text-gray-400 block text-[10px]">Platform Fee:</span>
                      <span className="text-[#00C853] font-bold text-sm">0% (100% Free)</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                      <span className="text-gray-400 block text-[10px]">Mobile Money:</span>
                      <span className="text-slate-900 font-bold">MTN, Orange, Airtel</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                      <span className="text-gray-400 block text-[10px]">Physical Wishlists:</span>
                      <span className="text-slate-900 font-bold">Yes (Direct In-Kind)</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                      <span className="text-gray-400 block text-[10px]">Volunteer Engine:</span>
                      <span className="text-slate-900 font-bold">Built-In Hub</span>
                    </div>
                  </div>
                </div>

                {/* Platform 2: GlobalGiving */}
                <div className="border border-gray-200 bg-white rounded-2xl p-6 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-lg text-slate-900">
                      GlobalGiving — Best for Large International Grants
                    </h3>
                    <span className="text-xs bg-gray-100 text-gray-700 font-bold px-2.5 py-1 rounded-md">
                      Established NGOs
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    GlobalGiving provides access to US corporate donors and matched funding campaigns. However, it requires a 6-month formal vetting process, takes <strong>5% to 12% in fees</strong>, and relies on delayed wire transfers rather than instant local Mobile Money.
                  </p>
                </div>

                {/* Platform 3: GoFundMe */}
                <div className="border border-gray-200 bg-white rounded-2xl p-6 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-lg text-slate-900">
                      GoFundMe — Best for Individual Diaspora Campaigns
                    </h3>
                    <span className="text-xs bg-gray-100 text-gray-700 font-bold px-2.5 py-1 rounded-md">
                      Personal Causes
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Widely recognized across North America and Europe. However, GoFundMe <strong>does not support African bank accounts natively</strong>. African founders must find an overseas intermediary to withdraw funds, creating significant legal and tax friction.
                  </p>
                </div>

                {/* Platform 4: GivenGain */}
                <div className="border border-gray-200 bg-white rounded-2xl p-6 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-lg text-slate-900">
                      GivenGain — Best for Sports & Peer-to-Peer Fundraising
                    </h3>
                    <span className="text-xs bg-gray-100 text-gray-700 font-bold px-2.5 py-1 rounded-md">
                      Event Fundraising
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Originating in South Africa, GivenGain is great for marathon and cycling peer-to-peer campaigns. Charges a 5% platform fee plus banking transaction fees, but lacks grassroots in-kind wishlist matching.
                  </p>
                </div>
              </section>

              {/* Comparison Matrix Table */}
              <section className="space-y-4">
                <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 tracking-tight flex items-center gap-2.5">
                  <span className="text-[#00C853]">3.</span>
                  Comprehensive Feature Comparison Matrix
                </h2>
                <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-3xs">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 text-slate-900 font-display font-bold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="p-3.5">Platform</th>
                        <th className="p-3.5">Platform Fee</th>
                        <th className="p-3.5">Mobile Money</th>
                        <th className="p-3.5">In-Kind Wishlists</th>
                        <th className="p-3.5">Volunteer Hub</th>
                        <th className="p-3.5">African Payout Speed</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr className="bg-emerald-50/40 font-semibold">
                        <td className="p-3.5 text-slate-900 font-bold flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-[#00C853]" /> DoDonate
                        </td>
                        <td className="p-3.5 text-[#00C853] font-black">0% (Free)</td>
                        <td className="p-3.5 text-emerald-700">Native Instant</td>
                        <td className="p-3.5 text-emerald-700">Yes</td>
                        <td className="p-3.5 text-emerald-700">Yes</td>
                        <td className="p-3.5 text-emerald-700">Instant</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 text-slate-800 font-medium">GlobalGiving</td>
                        <td className="p-3.5 text-rose-600 font-semibold">5% - 12%</td>
                        <td className="p-3.5 text-gray-500">No</td>
                        <td className="p-3.5 text-gray-500">No</td>
                        <td className="p-3.5 text-gray-500">No</td>
                        <td className="p-3.5 text-gray-500">30-60 Days</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 text-slate-800 font-medium">GoFundMe</td>
                        <td className="p-3.5 text-rose-600 font-semibold">2.9% + $0.30</td>
                        <td className="p-3.5 text-gray-500">No</td>
                        <td className="p-3.5 text-gray-500">No</td>
                        <td className="p-3.5 text-gray-500">No</td>
                        <td className="p-3.5 text-gray-500">Requires Foreign Bank</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 text-slate-800 font-medium">GivenGain</td>
                        <td className="p-3.5 text-amber-600 font-semibold">5.0%</td>
                        <td className="p-3.5 text-gray-500">South Africa Only</td>
                        <td className="p-3.5 text-gray-500">No</td>
                        <td className="p-3.5 text-gray-500">No</td>
                        <td className="p-3.5 text-gray-500">Monthly Payout</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 tracking-tight flex items-center gap-2.5">
                  <span className="text-[#00C853]">4.</span>
                  4 Strategies to Boost African Nonprofit Giving by 300%
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-gray-100 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Provide Real-Time Item Quantities</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                        Donors respond 4x better to concrete goals (e.g. "Needs 50 math notebooks") than generic donation buttons. Specificity builds instant accountability.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-gray-100 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Make Mobile Money 1-Click</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                        If a donor has to enter a 16-digit credit card number on a slow mobile connection, 70% abandon checkout. Instant Mobile Money push prompts maximize completion.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-gray-100 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Engage Local Volunteers as Champions</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                        Volunteers who come to teach or deliver goods become your most vocal social media advocates. Recruiting local talent creates organic donation word-of-mouth.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-gray-100 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Highlight Zero Platform Fee Purity</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                        Inform your donors that 100% of their contributions reach you without platform commissions. Trust-conscious donors give larger ticket amounts when they know tech companies aren't profiting off vulnerable children.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Conclusion block */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl space-y-3">
                <h3 className="font-display font-black text-xl text-white">
                  Conclusion: Why DoDonate Is the New Standard
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  For grassroots non-profits, orphanages, and community foundations across Africa, choosing software that understands African telecom networks, zero-fee giving, and physical donation matching is essential. DoDonate provides the complete toolset without costing organizations a single cent.
                </p>
              </div>

            </div>
          )}

          {/* Social Share & Engagement Footer */}
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {lang === 'EN' ? 'Share this article:' : 'Partager:'}
              </span>
              <button
                onClick={() => handleShare('whatsapp')}
                className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors cursor-pointer text-xs font-bold"
              >
                💬 WhatsApp
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="p-2.5 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer text-xs font-bold"
              >
                𝕏 Post
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="inline-flex items-center gap-1.5 p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Copied URL!' : 'Copy Link'}</span>
              </button>
            </div>

            <a
              href="https://dodonate.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00C853] hover:bg-[#009624] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm hover:scale-[1.02]"
            >
              <span>{lang === 'EN' ? 'Register Your NGO for Free' : 'Inscrire votre ONG Gratuitement'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Read Next / Related Article */}
          {otherPost && (
            <div className="pt-8 border-t border-gray-100 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-black text-lg text-slate-900">
                  {lang === 'EN' ? 'Read Next on DoDonate Blog' : 'Lire ensuite sur le Blog DoDonate'}
                </h3>
              </div>

              <div 
                onClick={() => onNavigatePost(otherPost.slug)}
                className="group border border-gray-200 hover:border-[#00C853] rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-md cursor-pointer bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center gap-5"
              >
                <img 
                  src={otherPost.headerImage} 
                  alt={otherPost.headerImageAlt}
                  className="w-full sm:w-44 h-28 object-cover rounded-xl group-hover:scale-102 transition-transform" 
                />
                <div className="space-y-1.5 flex-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#00C853]">
                    {otherPost.category}
                  </span>
                  <h4 className="font-display font-black text-base sm:text-lg text-slate-900 group-hover:text-[#00C853] transition-colors leading-snug">
                    {otherPost.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {otherPost.excerpt}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#00C853] group-hover:translate-x-1 transition-all shrink-0 hidden sm:block" />
              </div>
            </div>
          )}

        </article>
      </div>
    );
  }

  // DEFAULT VIEW: BLOG LISTING / DIRECTORY PAGE
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchFilter.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Platform Announcement', 'Industry Guide & Software Review'];

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-16">
      
      {/* Top Header bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-brand-dark rounded-xl text-gray-700 hover:text-brand-dark text-xs sm:text-sm font-bold transition-all shadow-3xs cursor-pointer group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{lang === 'EN' ? 'Back' : 'Retour'}</span>
        </button>

        <a
          href="https://dodonate.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#00C853] hover:bg-[#009624] text-white px-5 py-2 rounded-xl text-xs font-black shadow-xs hover:shadow-md transition-all active:scale-95 uppercase tracking-wider"
        >
          <span>{lang === 'EN' ? 'Join DoDonate' : 'Rejoindre DoDonate'}</span>
        </a>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border-2 border-gray-100 p-8 sm:p-12 text-white shadow-xs">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#00C853] opacity-10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE600]/15 text-[#FFE600] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DoDonate Insights & Announcements</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            {lang === 'EN' ? 'Stories, Guides & Nonprofit Tech in Africa' : 'Articles, Guides & Technologie Philanthropique en Afrique'}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {lang === 'EN' 
              ? 'Authoritative guides, transparency reports, and platform news on fundraising with zero cuts and volunteer mobilisation across Africa.'
              : 'Guides faisant autorité, rapports de transparence et actualités sur la collecte de fonds à 0% de frais et la mobilisation de bénévoles en Afrique.'}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#00C853] text-white shadow-2xs'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={lang === 'EN' ? 'Search articles or topics...' : 'Rechercher des articles...'}
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-[#00C853] text-slate-800"
          />
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredPosts.map((post) => (
          <div
            key={post.slug}
            onClick={() => onNavigatePost(post.slug)}
            className="group bg-white border-2 border-gray-100 hover:border-[#00C853] rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
          >
            {/* Header Card Image */}
            <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900">
              <img 
                src={post.headerImage} 
                alt={post.headerImageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                {post.category}
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#FFE600]" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Content body */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.publishedDate}</span>
                </div>

                <h2 className="font-display font-black text-lg sm:text-xl text-slate-900 group-hover:text-[#00C853] transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Tags & Action Link */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-gray-200" 
                  />
                  <span className="text-xs font-semibold text-gray-600">
                    {post.author.name.split(' ')[0]}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#00C853] group-hover:translate-x-1 transition-transform">
                  <span>{lang === 'EN' ? 'Read Article' : 'Lire l\'article'}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Newsletter / Stay in Touch Card */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 border-2 border-emerald-100 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1.5 text-center md:text-left">
          <h3 className="font-display font-black text-xl text-slate-900">
            {lang === 'EN' ? 'Are you an African NGO or Orphanage?' : 'Êtes-vous une ONG ou un orphelinat en Afrique ?'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl leading-relaxed">
            {lang === 'EN' 
              ? 'Receive 100% of donations made to your center with zero platform cuts. Create your verified profile and public wishlist in minutes.'
              : 'Recevez 100% des dons faits à votre centre sans aucuns frais de plateforme. Créez votre profil vérifié et votre liste de souhaits en quelques minutes.'}
          </p>
        </div>
        <a 
          href="https://dodonate.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#00C853] hover:bg-[#009624] text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0"
        >
          <span>{lang === 'EN' ? 'Create Free NGO Profile' : 'Créer un profil ONG gratuit'}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
}
