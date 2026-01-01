import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { newsApi } from '../services/api';
import type { NewsArticle } from '../types';
import NewsCard from '../components/NewsCard';
import Loading from '../components/Loading';
import { getCategoryName } from '../constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await newsApi.getByCategory(slug, currentPage, 10);
        setArticles(response.content);
        setTotalPages(response.totalPages);
      } catch (err) {
        setError('Không thể tải tin tức. Vui lòng thử lại sau.');
        console.error('Error fetching category news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryNews();
    window.scrollTo(0, 0);
  }, [slug, currentPage]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 pb-3 border-b-4 border-[#78b43d] inline-block">
            {slug ? getCategoryName(slug) : 'Danh mục'}
          </h1>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {articles.map((article, index) => (
  <div key={article.id} className="relative group">
    {/* Thẻ div này dùng để AI định vị.
      Khi AI gọi lệnh click(), ta cần navigate. 
      Do NewsCard bên trong đã có Link, ta có thể tìm thẻ <a> bên trong div này để click
    */}
    <div className="news-item-trigger hidden" onClick={() => {
        // Tìm link bên trong và click
        const link = document.getElementById(`news-link-${article.id}`);
        link?.click();
    }}></div>

    {/* Hiển thị số thứ tự để người dùng dễ đọc */}
    <span className="absolute top-0 left-0 bg-[#78b43d] text-white text-xs font-bold px-2 py-1 z-10 rounded-tl-lg">
      #{index + 1}
    </span>
    
    {/* Truyền id cho NewsCard để tạo id cho thẻ Link */}
    <NewsCard article={article} customId={`news-link-${article.id}`} />
  </div>
))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ChevronLeft size={20} />
                  Trước
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i;
                    } else if (currentPage < 3) {
                      pageNum = i;
                    } else if (currentPage > totalPages - 3) {
                      pageNum = totalPages - 5 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg ${
                          currentPage === pageNum
                            ? 'bg-[#78b43d] text-white font-bold'
                            : 'bg-white border border-gray-300 hover:bg-[#78b43d]/10'
                        }`}
                      >
                        {pageNum + 1}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Sau
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Không có tin tức nào trong danh mục này.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;