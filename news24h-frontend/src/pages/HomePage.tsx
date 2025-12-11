import React, { useEffect, useState } from 'react';
import { newsApi } from '../services/api';
import type { NewsArticle } from '../types';
import NewsCard from '../components/NewsCard';
import Loading from '../components/Loading';
import { TrendingUp } from 'lucide-react';

const HomePage: React.FC = () => {
  const [topHeadlines, setTopHeadlines] = useState<NewsArticle[]>([]);
  const [breakingNews, setBreakingNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  const otherHeadlines = topHeadlines.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breaking News Ticker */}
      {breakingNews.length > 0 && (
        <div className="bg-yellow-400 border-b-2 border-yellow-500">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-red-700 font-bold shrink-0">
                <TrendingUp size={20} />
                <span>TIN NÓNG:</span>
              </div>
              <div className="overflow-hidden">
                <div className="animate-scroll whitespace-nowrap">
                  {breakingNews.map((news, index) => (
                    <span key={news.id} className="inline-block">
                      <a
                        href={`/news/${news.id}`}
                        className="text-gray-900 hover:text-red-700 transition"
                      >
                        {news.title.replace(/&#34;/g, '"')}
                      </a>
                      {index < breakingNews.length - 1 && (
                        <span className="mx-4 text-red-700">•</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-8">
            <NewsCard article={featuredArticle} featured />
          </div>
        )}

        {/* Other Headlines */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-red-600">
            Tin tức nổi bật
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {otherHeadlines.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
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