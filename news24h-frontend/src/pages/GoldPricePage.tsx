// src/pages/GoldPricePage.tsx
import React, { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GoldPrice {
  id: string;
  goldType: string;
  company: string;
  buyPrice: number;
  sellPrice: number;
  crawledAt: string;
  updatedAt: string;
}

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  category: string;
}

const GoldPricePage: React.FC = () => {
  const [goldPrices, setGoldPrices] = useState<GoldPrice[]>([]);
  const [goldNews, setGoldNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchGoldPrices = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/gold-prices');
      if (!response.ok) throw new Error('Không thể tải dữ liệu giá vàng');
      const data = await response.json();
      console.log('Gold prices data:', data); // Debug
      setGoldPrices(data);
      if (data.length > 0) {
        setLastUpdate(new Date(data[0].crawledAt || data[0].updatedAt).toLocaleString('vi-VN'));
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching gold prices:', err); // Debug
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/gold-prices/refresh', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Không thể cập nhật giá vàng');
      await fetchGoldPrices();
      if (goldPrices.length > 0) {
        setLastUpdate(new Date().toLocaleString('vi-VN'));
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

  const fetchGoldNews = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/news/category/gia-vang?page=0&size=6');
      if (response.ok) {
        const data = await response.json();
        console.log('Gold news data:', data); // Debug
        setGoldNews(data.content || []);
      }
    } catch (err) {
      console.error('Error fetching gold news:', err);
    }
  };

  useEffect(() => {
    fetchGoldPrices();
    fetchGoldNews();
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN');
  };

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

  if (loading && goldPrices.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-8 h-8" />
              Giá Vàng Hôm Nay
            </h1>
            {lastUpdate && (
              <p className="text-yellow-100 mt-2">
                Cập nhật lúc: {lastUpdate}
              </p>
            )}
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="bg-white text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            Cập nhật
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Bảng giá vàng */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-yellow-500 to-yellow-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                      Loại vàng
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-white uppercase tracking-wider">
                      Mua vào
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-white uppercase tracking-wider">
                      Bán ra
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                      Giá chênh lệch
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {goldPrices.map((price, index) => (
                    <tr key={index} className="hover:bg-yellow-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        <div className="font-bold text-gray-800">{price.goldType}</div>
                        <div className="text-xs text-gray-500 mt-1">{price.company}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-medium text-green-600">
                        {formatPrice(price.buyPrice)}
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-medium text-red-600">
                        {formatPrice(price.sellPrice)}
                      </td>
                      <td className="px-6 py-4 text-sm text-center font-medium text-blue-600">
                        {formatPrice(price.sellPrice - price.buyPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-blue-50 border-t border-blue-200 p-4">
              <p className="text-xs text-blue-800">
                📊 Đơn vị: Nghìn đồng | 🔄 Cập nhật mỗi 30 phút
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar: Tin tức về vàng */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-4">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Newspaper className="w-6 h-6" />
                Tin tức về Vàng
              </h2>
            </div>
            
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {goldNews.length > 0 ? (
                goldNews.map((news) => (
                  <Link 
                    key={news.id} 
                    to={`/news/${news.id}`}
                    className="block p-4 hover:bg-yellow-50 transition-colors"
                  >
                    <div className="flex gap-3">
                      {news.thumbnail && (
                        <img 
                          src={news.thumbnail} 
                          alt={news.title}
                          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x80?text=No+Image';
                          }}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-yellow-600">
                          {news.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(news.publishedAt)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500 text-sm">Chưa có tin tức về vàng</p>
                  <Link 
                    to="/category/gia-vang"
                    className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm mt-2 inline-block"
                  >
                    Xem danh mục Giá vàng →
                  </Link>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 px-6 py-3 border-t">
              <Link 
                to="/category/gia-vang"
                className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm flex items-center justify-center gap-1"
              >
                Xem tất cả tin Giá vàng →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldPricePage;
