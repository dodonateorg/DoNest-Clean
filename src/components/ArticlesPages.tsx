import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  ChevronLeft,
  Clock,
  MapPin,
  Search,
  Share2,
  Sparkles,
  Tag
} from 'lucide-react';
import { ARTICLES, Article, findArticleBySlug } from '../data/articles';
import { getArticlePath } from '../utils/seo';

interface ArticlesListPageProps {
  onBack: () => void;
  lang?: 'EN' | 'FR';
}

export function ArticlesListPage({ onBack, lang = 'EN' }: ArticlesListPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(ARTICLES.map(a => a.category)))];

  const filteredArticles = ARTICLES.filter(article => {
    const q = searchQuery.trim().toLowerCase();
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesQuery =
      !q ||
      article.headline.toLowerCase().includes(q) ||
      article.description.toLowerCase().includes(q) ||
      article.keywords.toLowerCase().includes(q) ||
      article.tags.some(t => t.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  const featuredArticle = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);

  return (
    <div className="space-y-10 animate-fade-in py-6">
      {/* Top navigation back */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-dark px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:-translate-x-1 duration-300 shadow-2xs cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-gray-500" />
          <span>{lang === 'EN' ? 'Back to Directory' : 'Retour au Répertoire'}</span>
        </button>

        <a
          href="/volunteers"
          className="inline-flex items-center gap-2 bg-[#00C853] hover:bg-[#009624] text-white px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider shadow-xs transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'EN' ? 'Browse Live Opportunities' : 'Opportunités en Direct'}</span>
        </a>
      </div>

      {/* Editorial Header Box */}
      <section className="bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#00C853]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-3 relative max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 tracking-wide uppercase">
            <BookOpen className="w-3.5 h-3.5 text-[#00C853]" />
            <span>{lang === 'EN' ? 'DoNest Africa Editorial & Guides' : 'Guides & Articles DoNest Afrique'}</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#0B1527] tracking-tight leading-tight text-balance">
            {lang === 'EN'
              ? 'Volunteer Guides & Nonprofit Articles Across Africa'
              : 'Guides du Bénévolat & Articles Associatifs en Afrique'}
          </h1>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
            {lang === 'EN'
              ? 'Actionable playbooks on finding verified volunteer opportunities in Cameroon, Ghana, Nigeria, Kenya & beyond, supporting nonprofits directly, and earning your Attestation of Service.'
              : 'Des guides pratiques pour trouver des opportunités de bénévolat vérifiées au Cameroun, au Ghana, au Nigeria, au Kenya et partout en Afrique.'}
          </p>
        </div>

        {/* Search + Category Filters */}
        <div className="flex flex-col md:flex-row gap-4 pt-2 relative">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'EN'
                  ? 'Search guides by country, topic, or keyword (e.g. Cameroon, Ghana, Kenya)...'
                  : 'Rechercher des articles par pays ou sujet...'
              }
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-gray-100 focus:border-[#00C853] focus:bg-white rounded-2xl text-xs sm:text-sm font-medium focus:outline-none text-[#0B1527] transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#0B1527] text-white shadow-xs'
                    : 'bg-slate-50 text-gray-600 hover:bg-slate-100 border border-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article Card */}
      {featuredArticle ? (
        <div className="space-y-8">
          <a
            href={getArticlePath(featuredArticle)}
            className="group block bg-white border-2 border-gray-100 hover:border-[#00C853]/50 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 aspect-video lg:aspect-auto overflow-hidden bg-slate-900 relative">
                <img
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.ogImageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-gray-500">
                    <span className="text-[#00C853] font-black uppercase tracking-wider">
                      Featured Guide
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#0B1527]">{featuredArticle.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {featuredArticle.readingTime}
                    </span>
                  </div>

                  <h2 className="font-display font-black text-xl sm:text-2xl text-[#0B1527] leading-snug group-hover:text-[#00C853] transition-colors text-balance">
                    {featuredArticle.headline}
                  </h2>

                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {featuredArticle.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400">
                    {new Date(featuredArticle.publishedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#00C853] group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </a>

          {/* Remaining Articles Grid in Clean White Boxes */}
          {remainingArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {remainingArticles.map(article => (
                <a
                  key={article.slug}
                  href={getArticlePath(article)}
                  className="group bg-white border-2 border-gray-100 hover:border-[#00C853]/50 rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-video w-full overflow-hidden bg-slate-900 relative">
                      <img
                        src={article.coverImage}
                        alt={article.ogImageAlt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                        <span className="text-[#00C853] font-black uppercase tracking-wider">
                          {article.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {article.readingTime}
                        </span>
                      </div>
                      <h3 className="font-display font-black text-lg text-[#0B1527] leading-snug group-hover:text-[#00C853] transition-colors">
                        {article.headline}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {article.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400">
                      {new Date(article.publishedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#00C853] group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center space-y-3">
          <p className="text-gray-500 font-bold text-sm">
            No articles matched your search. Try another keyword.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="bg-[#0B1527] text-white px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

interface ArticleDetailPageProps {
  slug: string;
  onBackToArticles: () => void;
  onBackHome: () => void;
}

export function ArticleDetailPage({
  slug,
  onBackToArticles,
  onBackHome
}: ArticleDetailPageProps) {
  const [copied, setCopied] = useState(false);
  const article: Article | undefined = findArticleBySlug(slug);

  if (!article) {
    return (
      <div className="py-12 text-center space-y-5 bg-white border-2 border-gray-100 rounded-3xl p-8 max-w-2xl mx-auto">
        <h1 className="font-display font-black text-2xl text-[#0B1527]">Article Not Found</h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          We couldn&apos;t locate that guide, but you can explore all our Pan-African volunteer and nonprofit guides below.
        </p>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={onBackToArticles}
            className="bg-[#00C853] text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider cursor-pointer"
          >
            View All Articles
          </button>
          <button
            type="button"
            onClick={onBackHome}
            className="bg-slate-100 text-[#0B1527] px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider cursor-pointer"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const articlePath = getArticlePath(article);
  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${articlePath}`
      : `https://donest.org${articlePath}`;

  const handleCopyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback ignored if clipboard unavailable
    }
  };

  const relatedArticles = ARTICLES.filter(a => a.slug !== article.slug);

  return (
    <article className="space-y-8 animate-fade-in py-6 max-w-4xl mx-auto">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-3">
        <ol className="flex flex-wrap items-center gap-2 text-xs font-bold text-gray-500">
          <li>
            <a href="/" className="hover:text-[#00C853] transition-colors">
              Home
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="/articles" className="hover:text-[#00C853] transition-colors">
              Articles
            </a>
          </li>
          <li>/</li>
          <li className="text-[#0B1527] truncate max-w-[220px] sm:max-w-xs">{article.category}</li>
        </ol>

        <button
          type="button"
          onClick={onBackToArticles}
          className="inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:border-brand-dark px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-gray-500" />
          <span>All Articles</span>
        </button>
      </nav>

      {/* Main White Article Box */}
      <div className="bg-white border-2 border-gray-100 rounded-3xl overflow-hidden shadow-xs">
        {/* Header Metadata & H1 */}
        <header className="p-6 sm:p-10 pb-6 space-y-5">
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold text-gray-500">
            <span className="text-[#00C853] font-black uppercase tracking-wider">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              {article.readingTime}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              {new Date(article.publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl text-[#0B1527] tracking-tight leading-tight text-balance">
            {article.headline}
          </h1>

          {/* Author & Social Share Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2.5 text-xs">
              <div className="w-8 h-8 rounded-full bg-[#00C853]/15 text-[#00C853] font-black flex items-center justify-center">
                D
              </div>
              <div>
                <p className="font-display font-black text-[#0B1527]">{article.author}</p>
                <p className="text-[11px] text-gray-400 font-medium">DoNest · donest.org</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyShareUrl}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-gray-200 text-xs font-bold text-[#0B1527] cursor-pointer transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#00C853]" />
                    <span className="text-[#00C853]">Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-gray-500" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${article.headline} — Read on DoNest: ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-black transition-colors"
              >
                <span>Share WhatsApp</span>
              </a>
            </div>
          </div>
        </header>

        {/* 16:9 Featured Hero Banner Image */}
        <div className="px-6 sm:px-10">
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-gray-100 bg-slate-900 shadow-sm">
            <img
              src={article.coverImage}
              alt={article.ogImageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Rich Structured Article Body */}
        <div className="p-6 sm:p-10 space-y-8 text-gray-700">
          {/* Intro paragraphs */}
          <div className="space-y-4 text-base sm:text-[17px] leading-relaxed font-normal text-gray-700">
            {article.introParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Content Sections */}
          {article.sections.map(section => (
            <section key={section.id} id={section.id} className="space-y-4 pt-6 border-t border-gray-100">
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#0B1527] leading-snug text-balance">
                {section.heading}
              </h2>

              {section.paragraphs?.map((para, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base leading-relaxed text-gray-600">
                  {para}
                </p>
              ))}

              {section.bullets && (
                <ul className="space-y-3 pt-1">
                  {section.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-3 bg-slate-50/70 border border-gray-100 rounded-2xl p-4 text-sm sm:text-base leading-relaxed"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#00C853] shrink-0" />
                      <span>
                        {bullet.label && (
                          <strong className="font-display font-black text-[#0B1527]">
                            {bullet.label}:{' '}
                          </strong>
                        )}
                        {bullet.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {section.destinations && (
                <div className="grid grid-cols-1 gap-4 pt-2">
                  {section.destinations.map((dest, dIdx) => (
                    <div
                      key={dest.country}
                      className="bg-slate-50/70 border border-gray-200/80 rounded-2xl p-5 sm:p-6 space-y-3"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-2xl" aria-hidden="true">
                          {dest.flag}
                        </span>
                        <h3 className="font-display font-black text-lg text-[#0B1527]">
                          {dIdx + 1}. {dest.country}
                          {dest.subtitle ? `: ${dest.subtitle}` : ''}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-600">{dest.intro}</p>
                      {(dest.topNeeds || dest.howToConnect) && (
                        <div className="space-y-2 pt-1 text-sm">
                          {dest.topNeeds && (
                            <p>
                              <strong className="text-[#0B1527]">
                                {dest.needsLabel || 'Top Needs'}:
                              </strong>{' '}
                              {dest.topNeeds}
                            </p>
                          )}
                          {dest.howToConnect && (
                            <p>
                              <strong className="text-[#0B1527]">How to Connect:</strong>{' '}
                              {dest.howToConnect}
                            </p>
                          )}
                        </div>
                      )}
                      <div className="pt-1">
                        <a
                          href="/volunteers"
                          className="inline-flex items-center gap-1.5 text-xs font-black text-[#00C853] hover:underline"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Explore opportunities in {dest.country.split(' (')[0]}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.steps && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {section.steps.map(step => (
                    <div
                      key={step.stepNumber}
                      className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-5 space-y-2"
                    >
                      <span className="inline-block font-mono text-[11px] font-black text-[#00C853] tracking-wider uppercase">
                        STEP {step.stepNumber}
                      </span>
                      <h3 className="font-display font-black text-base text-[#0B1527]">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* Topics row */}
          <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold text-gray-500">
            <span className="inline-flex items-center gap-1 text-gray-400 uppercase tracking-wider mr-1">
              <Tag className="w-3.5 h-3.5" />
              Topics:
            </span>
            {article.tags.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span className="text-gray-700">{tag}</span>
                {idx < article.tags.length - 1 && (
                  <span aria-hidden="true" className="text-gray-300">
                    ·
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Call to Action Card */}
          <div className="bg-gradient-to-br from-[#0B1527] via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg">
            <h2 className="font-display font-black text-2xl sm:text-3xl leading-tight">
              {article.ctaHeading}
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-slate-200 leading-relaxed">
              {article.ctaParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={article.primaryCtaHref}
                className="inline-flex items-center gap-2 bg-[#00C853] hover:bg-[#00E676] text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-all shadow-md"
              >
                <span>{article.primaryCtaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={article.secondaryCtaHref}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-all"
              >
                <span>{article.secondaryCtaLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* More Articles Section in White Cards */}
      {relatedArticles.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="font-display font-black text-xl text-[#0B1527]">
            More Guides & Impact Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {relatedArticles.map(rel => (
              <a
                key={rel.slug}
                href={getArticlePath(rel)}
                className="group bg-white border-2 border-gray-100 hover:border-[#00C853]/50 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={rel.coverImage}
                    alt={rel.ogImageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#00C853]">
                    {rel.category} · {rel.readingTime}
                  </span>
                  <h3 className="font-display font-black text-base text-[#0B1527] group-hover:text-[#00C853] transition-colors leading-snug">
                    {rel.headline}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
