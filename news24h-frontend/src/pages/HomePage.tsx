import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, TrendingUp } from 'lucide-react';
import NewsCard from '../components/NewsCard';
import Loading from '../components/Loading';
import { newsApi } from '../services/api';
import { getCategoryName } from '../constants';
import type { NewsArticle } from '../types';
import '../styles/home.css';

const HomePage: React.FC = () => {
  const [topHeadlines, setTopHeadlines] = useState<NewsArticle[]>([]);
  const [breakingNews, setBreakingNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const decodeTitle = (title: string) => title.replace(/&#34;/g, '"');
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [headlines, breaking] = await Promise.all([
          newsApi.getTopHeadlines(),
          newsApi.getBreakingTicker()
        ]);
        setTopHeadlines(headlines);
        setBreakingNews(breaking);
      } catch (err) {
        setError('Không thể tải tin tức. Vui lòng thử lại sau.');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  const featuredArticle = topHeadlines[0];
  const other = topHeadlines.slice(1);
  const spotlightLeft = other.slice(0, 3);
  const spotlightRight = other.slice(3, 5);
  const mostRead = other.slice(5, 11);
  const latestNews = other.slice(11, 25);

  const renderCompactCard = (article: NewsArticle) => (
    <Link
      key={article.id}
      to={`/news/${article.id}`}
      className="block group bg-white rounded-lg shadow-sm hover:shadow-md transition"
    >
      <div className="flex gap-3 p-3">
        <div className="w-28 h-20 overflow-hidden rounded-md flex-shrink-0">
          <img
            src={`${article.thumbnail}?cache=${article.id}`}
            alt={decodeTitle(article.title)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://via.placeholder.com/320x240?text=No+Image';
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <span className="font-semibold text-[#3c811e]">
              {getCategoryName(article.category)}
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#78b43d] transition">
            {decodeTitle(article.title)}
          </h3>
        </div>
      </div>
    </Link>
  );

  const renderListCard = (article: NewsArticle) => (
    <Link
      key={article.id}
      to={`/news/${article.id}`}
      className="block group bg-white rounded-lg shadow hover:shadow-md transition"
    >
      <div className="flex gap-4 p-4">
        <div className="w-36 h-24 overflow-hidden rounded-md flex-shrink-0">
          <img
            src={`${article.thumbnail}?cache=${article.id}`}
            alt={decodeTitle(article.title)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://via.placeholder.com/360x240?text=No+Image';
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span className="px-2 py-1 bg-[#78b43d]/15 text-[#3c811e] font-semibold rounded">
              {getCategoryName(article.category)}
            </span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#78b43d] transition">
            {decodeTitle(article.title)}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{article.description}</p>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      {breakingNews.length > 0 && (
        <div className="bg-yellow-400 border-b-2 border-yellow-500 shadow-sm">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center gap-3 ticker-rail">
              <div className="flex items-center gap-2 text-red-700 font-bold shrink-0">
                <TrendingUp size={20} />
                <span>TIN NÓNG</span>
              </div>
              <div className="overflow-hidden flex-1">
                <div className="animate-scroll whitespace-nowrap flex items-center gap-4">
                  {breakingNews.map((news, index) => (
                    <span key={news.id} className="inline-flex items-center gap-3">
                      <a
                        href={`/news/${news.id}`}
                        className="text-gray-900 font-semibold hover:text-red-700 transition"
                      >
                        {news.title.replace(/&#34;/g, '"')}
                      </a>
                      {index < breakingNews.length - 1 && (
                        <span className="text-red-700">•</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 space-y-10">
        <div className="flex items-center gap-4 border-b border-gray-200 pb-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#78b43d] to-[#3c811e] flex items-center justify-center text-white font-bold">
            24h
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Giải Trí</h1>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            <span className="px-3 py-1 rounded-full bg-white shadow-sm">Đời sống Showbiz</span>
            <span className="px-3 py-1 rounded-full bg-white shadow-sm">Âm nhạc</span>
            <span className="px-3 py-1 rounded-full bg-white shadow-sm">Phim ảnh</span>
            <span className="px-3 py-1 rounded-full bg-white shadow-sm">TV Show</span>
            <span className="px-3 py-1 rounded-full bg-white shadow-sm">Đàn ông</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)_280px]">
          <div className="space-y-3">
            <div className="section-title">Tin chọn lọc</div>
            {spotlightLeft.map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.id}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="grid grid-cols-[120px_1fr] gap-3">
                  <div className="relative h-full min-h-[110px] overflow-hidden">
                    <img
                      src={`${article.thumbnail}?cache=${article.id}`}
                      alt={decodeTitle(article.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/240x180?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <span className="text-[#3c811e] font-semibold">{getCategoryName(article.category)}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#78b43d] transition">
                      {decodeTitle(article.title)}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="space-y-4">
            {featuredArticle && <NewsCard article={featuredArticle} featured />}
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
              <div className="section-title">Tin đọc nhiều</div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {mostRead.map((article) => (
                  <Link
                    key={article.id}
                    to={`/news/${article.id}`}
                    className="min-w-[200px] max-w-[220px] bg-gray-50 rounded-lg border border-gray-100 hover:border-[#78b43d] transition group"
                  >
                    <div className="h-32 overflow-hidden rounded-t-lg">
                      <img
                        src={`${article.thumbnail}?cache=${article.id}`}
                        alt={decodeTitle(article.title)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/240x160?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <Flame size={14} className="text-red-500" />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#78b43d] transition">
                        {decodeTitle(article.title)}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="section-title">Đang chú ý</div>
            <div className="space-y-3">
              {spotlightRight.map((article) => renderCompactCard(article))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="section-title mb-4">Tin mới cập nhật</div>
            <div className="space-y-4">
              {latestNews.map((article) => renderListCard(article))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="section-title">Tin giải trí</div>
              <div className="space-y-3">
                {mostRead.slice(0, 4).map((article) => renderCompactCard(article))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;