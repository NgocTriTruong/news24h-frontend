import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsApi } from '../services/api';
import type { NewsArticle } from '../types';
import Loading from '../components/Loading';
import { getCategoryName } from '../constants';
import { Clock, Eye, Tag, ExternalLink } from 'lucide-react';

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const [newsData, related] = await Promise.all([
          newsApi.getById(id),
          newsApi.getRelated(id)
        ]);
        setArticle(newsData);
        setRelatedNews(related);
      } catch (err) {
        setError('Không thể tải chi tiết tin tức. Vui lòng thử lại sau.');
        console.error('Error fetching news detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <Loading />;

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          {error || 'Không tìm thấy tin tức'}
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Category & Meta Info */}
              <div className="px-6 pt-6">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <Link
                    to={`/category/${article.category}`}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-700 transition"
                  >
                    <Tag size={14} />
                    {getCategoryName(article.category)}
                  </Link>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock size={16} />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Eye size={16} />
                    <span>{article.viewCount} lượt xem</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {decodeHtml(article.title)}
                </h1>

              </div>

              {/* Thumbnail */}
              {article.thumbnail && (
                <div className="px-6 mb-6">
                  <img
                    src={article.thumbnail}
                    alt={decodeHtml(article.title)}
                    className="w-full rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=No+Image';
                    }}
                  />
                </div>
              )}

              {/* Content */}
              <div className="px-6 pb-6">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Source Link */}
                {article.sourceUrl && (
                  <div className="mt-8 pt-6 border-t">
                    <Link
                      to="/category/gia-vang"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <ExternalLink size={18} />
                      Xem các tin tức khác về vàng
                    </Link>
                  </div>
                )}
              </div>
            </article>
          </div>

          {/* Sidebar - Related News */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-red-600">
                Tin liên quan
              </h2>
              <div className="space-y-4">
                {relatedNews.slice(0, 5).map((news) => (
                  <Link
                    key={news.id}
                    to={`/news/${news.id}`}
                    className="block group"
                  >
                    <div className="flex gap-3">
                      <img
                        src={news.thumbnail}
                        alt={decodeHtml(news.title)}
                        className="w-24 h-24 object-cover rounded flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=No+Image';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-3 group-hover:text-red-600 transition">
                          {decodeHtml(news.title)}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <Clock size={12} />
                          <span>{formatDate(news.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;