import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { newsApi } from '../services/api';
import type { NewsArticle } from '../types';
import Loading from '../components/Loading';
import { Trophy, ChevronRight, Clock } from 'lucide-react';

interface TeamStanding {
  rank: number;
  team: string;
  logo: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
}

const CupC1Page: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data cho bảng xếp hạng
  const standings: TeamStanding[] = [
    { rank: 1, team: 'Man City', logo: '🔵', played: 6, won: 5, drawn: 1, lost: 0, points: 16 },
    { rank: 2, team: 'Bayern', logo: '🔴', played: 6, won: 4, drawn: 2, lost: 0, points: 14 },
    { rank: 3, team: 'Real Madrid', logo: '⚪', played: 6, won: 4, drawn: 1, lost: 1, points: 13 },
    { rank: 4, team: 'PSG', logo: '🔵', played: 6, won: 3, drawn: 2, lost: 1, points: 11 },
    { rank: 5, team: 'Liverpool', logo: '🔴', played: 6, won: 3, drawn: 1, lost: 2, points: 10 },
  ];

  const featuredMatches = [
    {
      id: 1,
      title: 'Lượt về bán kết đấu C1 Champions League',
      image: 'https://cdn.24h.com.vn/upload/2-2024/images/2024-05-01/1714535353-848-thumbnail-width740height555.jpg',
      tag: 'Lịch thi đấu'
    },
    {
      id: 2,
      title: 'Video các bàn thắng đẹp nhất mùa giải',
      image: 'https://cdn.24h.com.vn/upload/1-2024/images/2024-03-15/anh-chup-man-hinh-2024-03-15-luc-07-09-26-1710463788-386-width1536height864.png',
      tag: 'Video highlight'
    },
    {
      id: 3,
      title: 'Cập nhật tin chuyển nhượng mùa hè',
      image: 'https://cdn.24h.com.vn/upload/2-2024/images/2024-05-30/z5479730819830_0df01c68a1a44cd4b06a50f8a6c3e75d-1717052854-171-width740height416.jpg',
      tag: 'Chuyển nhượng'
    }
  ];

  useEffect(() => {
    const fetchCupC1News = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await newsApi.getByCategory('cup-c1', 0, 8);
        console.log('Cup C1 Articles:', response.content.map(a => ({ id: a.id, title: a.title.substring(0, 30), thumbnail: a.thumbnail })));
        setArticles(response.content);
      } catch (err) {
        setError('Không thể tải tin tức Cup C1.');
        console.error('Error fetching Cup C1 news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCupC1News();
    window.scrollTo(0, 0);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b-4 border-green-500">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">CUP C1 - CHAMPIONS LEAGUE</h1>
            <div className="flex gap-4">
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">
                Lịch thi đấu
              </button>
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">
                Kết quả thi đấu
              </button>
              <Link to="/bxh" className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">
                Bảng xếp hạng
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Featured News Grid + Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Left Column - 2 News */}
          <div className="space-y-4">
            {articles.slice(0, 2).map((article) => (
              <Link 
                key={article.id} 
                to={`/news/${article.id}`}
                className="block group"
              >
                <div className="relative h-32 rounded-lg overflow-hidden mb-2">
                  <img 
                    src={`${article.thumbnail}?cache=${article.id}`}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=No+Image';
                    }}
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-900 line-clamp-3 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>

          {/* Center - Banner */}
          <Link to="/bxh" className="lg:col-span-2 block group">
            <div className="relative h-full min-h-[300px] rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://cdn.24h.com.vn/upload/4-2023/images/2023-11-29/z4921935838672_ac1b19fe3cf82c5d16a83e4ccc313c10-1701244854-906-width1772height1181.jpg" 
                alt="Champions League"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">
                  Bảng xếp hạng bóng đá Cúp C1/Champions League 2025/2026 mới nhất
                </h2>
              </div>
            </div>
          </Link>

          {/* Right Column - 2 News */}
          <div className="space-y-4">
            {articles.slice(2, 4).map((article) => (
              <Link 
                key={article.id} 
                to={`/news/${article.id}`}
                className="block group"
              >
                <div className="relative h-32 rounded-lg overflow-hidden mb-2">
                  <img 
                    src={`${article.thumbnail}?cache=${article.id}`}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=No+Image';
                    }}
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-900 line-clamp-3 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Three Green Buttons Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Lịch thi đấu nổi bật */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="bg-green-500 text-white px-4 py-3 font-bold text-center">
              Lịch thi đấu nổi bật
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">⚽</span>
                <span className="text-gray-700">Lịch hôm nay</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">🏆</span>
                <span className="text-gray-700">Champions League</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">🏴</span>
                <span className="text-gray-700">Ngoại hạng Anh</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">🇪🇸</span>
                <span className="text-gray-700">Tây Ban Nha</span>
              </div>
              <button className="w-full mt-2 px-4 py-2 border border-green-500 text-green-600 rounded-full text-sm font-medium hover:bg-green-50 transition-colors">
                Xem thêm lịch thi đấu ›
              </button>
            </div>
          </div>

          {/* Đội bóng nổi bật */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="bg-green-500 text-white px-4 py-3 font-bold text-center">
              Đội bóng nổi bật
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">⚪</span>
                <span className="text-gray-700">Real Madrid</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">🔵</span>
                <span className="text-gray-700">Barcelona</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">🔴</span>
                <span className="text-gray-700">Arsenal</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">🔵</span>
                <span className="text-gray-700">Bayern Munich</span>
              </div>
              <Link to="/bxh" className="block w-full mt-2 px-4 py-2 border border-green-500 text-green-600 rounded-full text-sm font-medium hover:bg-green-50 transition-colors text-center">
                Xem thêm đội bóng ›
              </Link>
            </div>
          </div>

          {/* Cầu thủ nổi bật */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="bg-green-500 text-white px-4 py-3 font-bold text-center">
              Cầu thủ nổi bật
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">⚽</span>
                <span className="text-gray-700">Kylian Mbappe</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">⚽</span>
                <span className="text-gray-700">Robert Lewandowski</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">⚽</span>
                <span className="text-gray-700">Lamine Yamal</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">⚽</span>
                <span className="text-gray-700">Harry Kane</span>
              </div>
              <button className="w-full mt-2 px-4 py-2 border border-green-500 text-green-600 rounded-full text-sm font-medium hover:bg-green-50 transition-colors">
                Xem thêm tin cầu thủ ›
              </button>
            </div>
          </div>
        </div>

        {/* Tin Mới Nhất */}
        <div className="bg-white">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-red-600 inline-block">
            TIN MỚI NHẤT
          </h2>
          
          {error && (
            <div className="p-6">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {articles.length > 0 ? (
            <div className="space-y-6">
              {articles.map((article) => (
                <Link 
                  key={article.id} 
                  to={`/news/${article.id}`}
                  className="flex gap-4 group"
                >
                  {article.thumbnail && (
                    <img 
                      src={`${article.thumbnail}?t=${Date.now()}`} 
                      alt={article.title}
                      className="w-40 h-28 object-cover rounded-lg flex-shrink-0 group-hover:opacity-90 transition-opacity"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/160x112?text=No+Image';
                      }}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {article.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Chưa có tin tức mới. Vui lòng quay lại sau!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CupC1Page;
