import React, { useEffect, useState } from 'react';
import { newsApi } from '../services/api';
import type { NewsArticle } from '../types';
import NewsCard from '../components/NewsCard';
import Loading from '../components/Loading';
import { TrendingUp } from 'lucide-react';
import { getCategoryName } from '../constants';

const HomePage: React.FC = () => {
  const [topHeadlines, setTopHeadlines] = useState<NewsArticle[]>([]);
  const [breakingNews, setBreakingNews] = useState<NewsArticle[]>([]);
  const [categoryNews, setCategoryNews] = useState<Record<string, NewsArticle[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // categories to show on homepage
        const HOMEPAGE_CATEGORIES = [
          'phim',
          'am-thuc',
          'thi-truong-tieu-dung',
          'the-thao',
          'giao-duc-du-hoc',
          'oto',
          'phi-thuong-ky-quac',
          'thoi-trang-hi-tech',
          'an-ninh-hinh-su',
          'tai-chinh-bat-dong-san',
          'ca-nhac-mtv',
          'bong-da',
          'trang-chu',
          'lam-dep',
          'thoi-trang',
          'ban-tre-cuoc-song',
          'suc-khoe-doi-song',
          'cong-nghe-thong-tin'
        ];

        const [headlines, breaking, ...catResults] = await Promise.all([
          newsApi.getTopHeadlines(),
          newsApi.getBreakingTicker(),
          ...HOMEPAGE_CATEGORIES.map(slug => newsApi.getByCategory(slug, 0, 8))
        ]);

        setTopHeadlines(headlines);
        setBreakingNews(breaking);

        const map: Record<string, NewsArticle[]> = {};
        HOMEPAGE_CATEGORIES.forEach((slug, idx) => {
          map[slug] = Array.isArray(catResults[idx]) ? catResults[idx] : (catResults[idx]?.content || []);
        });

        // also fetch 'tin-tuc-trong-ngay' for the one-row section
        try {
          const tinTrongNgay = await newsApi.getByCategory('tin-tuc-trong-ngay', 0, 8);
          map['tin-tuc-trong_ngay'] = tinTrongNgay.content || tinTrongNgay || [];
        } catch (e) {
          // ignore if not available
          map['tin-tuc-trong_ngay'] = [];
        }

        setCategoryNews(map);
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

  // keep featured article as topHeadlines[0] (original behavior)
  const featuredArticle = topHeadlines[0];

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

        {/* Tin tức trong ngày (one-row) */}
        {categoryNews['tin-tuc-trong_ngay'] && categoryNews['tin-tuc-trong_ngay'].length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#78b43d]">
              Tin tức trong ngày
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categoryNews['tin-tuc-trong_ngay'].slice(0, 4).map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}

        {/* Category sections: each shows up to 4 items (2 rows) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.keys(categoryNews)
            .filter(slug => slug !== 'tin-tuc-trong_ngay')
            .map((slug) => {
              const items = (categoryNews[slug] || []).filter(a => a.id !== featuredArticle?.id).slice(0, 4);
              if (items.length === 0) return null;
              return (
                <div key={slug}>
                  <h3 className="text-lg font-bold text-[#78b43d] mb-3">{getCategoryName(slug === 'tin-tuc-trong_ngay' ? 'tin-tuc-trong-ngay' : slug)}</h3>
                  {/* first item full */}
                  <div className="mb-3">
                    <NewsCard article={items[0]} />
                  </div>

                  {/* remaining items as compact list (title + description) */}
                  <ul>
                    {items.slice(1).map((a) => (
                      <li key={a.id} className="py-2 border-b border-gray-200">
                        <a href={`/news/${a.id}`} className="block text-sm font-semibold text-gray-900 hover:text-[#78b43d] mb-1">
                          {a.title.replace(/&#34;/g, '"')}
                        </a>
                        <p className="text-xs text-gray-600 line-clamp-2">{a.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
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