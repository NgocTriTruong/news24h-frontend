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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header with Champions League Logo */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://cdn.24h.com.vn/upload/4-2023/images/2023-11-29/z4921935838672_ac1b19fe3cf82c5d16a83e4ccc313c10-1701244854-906-width1772height1181.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="text-center">
            <div className="inline-block mb-6">
              <img 
                src="https://cdn.24h.com.vn/upload/4-2023/images/2023-11-29/z4921935838672_ac1b19fe3cf82c5d16a83e4ccc313c10-1701244854-906-width1772height1181.jpg" 
                alt="UEFA Champions League"
                className="w-48 h-48 object-contain filter drop-shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/UEFA_Champions_League_logo_2.svg/300px-UEFA_Champions_League_logo_2.svg.png';
                }}
              />
            </div>
            <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
              CUP C1 - CHAMPIONS LEAGUE
            </h1>
            <p className="text-blue-200 text-lg">
              Giải đấu bóng đá câu lạc bộ hàng đầu châu Âu
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featuredMatches.map((match) => (
            <div key={match.id} className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={match.image} 
                  alt={match.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {match.tag}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {match.title}
                </h3>
              </div>
              <div className="px-4 pb-4">
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors">
                  Xem chi tiết ngay
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Bảng Xếp Hạng */}
        <Link to="/bxh" className="block mb-8 group">
          <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="https://cdn.24h.com.vn/upload/4-2023/images/2023-11-29/z4921935838672_ac1b19fe3cf82c5d16a83e4ccc313c10-1701244854-906-width1772height1181.jpg" 
              alt="Bảng xếp hạng Champions League"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/50 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <Trophy className="w-20 h-20 text-yellow-400 mb-4 animate-pulse" />
              <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-2xl">
                Bảng xếp hạng bóng đá Cúp C1/Champions League
              </h2>
              <p className="text-2xl text-blue-100 mb-6">
                2025/2026 mới nhất
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-lg transition-colors shadow-lg">
                  Lịch thi đấu nổi bật
                </button>
                <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-lg transition-colors shadow-lg">
                  Đội bóng nổi bật
                </button>
                <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-lg transition-colors shadow-lg">
                  Cầu thủ nổi bật
                </button>
              </div>
            </div>
          </div>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Bảng xếp hạng preview */}
            <div className="bg-white rounded-lg shadow-md mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-lg">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-6 h-6" />
                  BXH ĐẾN DANH
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">#</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Đội</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">Trận</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">T</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">H</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">B</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">Điểm</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {standings.map((team) => (
                      <tr key={team.rank} className="hover:bg-blue-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-bold text-gray-900">{team.rank}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{team.logo}</span>
                            <span className="font-semibold text-gray-800">{team.team}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-gray-600">{team.played}</td>
                        <td className="px-4 py-3 text-center text-sm text-green-600 font-semibold">{team.won}</td>
                        <td className="px-4 py-3 text-center text-sm text-gray-600">{team.drawn}</td>
                        <td className="px-4 py-3 text-center text-sm text-red-600 font-semibold">{team.lost}</td>
                        <td className="px-4 py-3 text-center text-sm font-bold text-blue-600">{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t">
                <Link to="/bxh" className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 mx-auto w-fit">
                  Xem thêm chi tiết
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            {/* Tin mới nhất */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 rounded-t-lg">
                <h2 className="text-xl font-bold text-white">TIN MỚI NHẤT</h2>
              </div>
              
              {error && (
                <div className="p-6">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {articles.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {articles.map((article) => (
                    <Link 
                      key={article.id} 
                      to={`/news/${article.id}`}
                      className="flex gap-4 p-4 hover:bg-gray-50 transition-colors group"
                    >
                      {article.thumbnail && (
                        <img 
                          src={article.thumbnail} 
                          alt={article.title}
                          className="w-32 h-24 object-cover rounded-lg flex-shrink-0 group-hover:opacity-90 transition-opacity"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128x96?text=No+Image';
                          }}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 line-clamp-3 group-hover:text-blue-600 transition-colors mb-2">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock size={14} />
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
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
              
              <div className="px-6 py-4 bg-gray-50 border-t">
                <Link 
                  to="/category/cup-c1"
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 mx-auto w-fit"
                >
                  Xem tất cả tin tức
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Ad Space */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 mb-6 text-white text-center">
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Theo dõi Champions League</h3>
              <p className="text-sm text-blue-100 mb-4">
                Cập nhật tin tức, kết quả, lịch thi đấu mới nhất
              </p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors">
                Xem ngay
              </button>
            </div>

            {/* Related News */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="bg-gray-100 px-4 py-3 border-b">
                <h3 className="font-bold text-gray-800">TIN LIÊN QUAN</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {articles.slice(0, 5).map((article) => (
                  <Link 
                    key={article.id} 
                    to={`/news/${article.id}`}
                    className="block p-4 hover:bg-gray-50 transition-colors"
                  >
                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(article.publishedAt)}
                    </p>
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

export default CupC1Page;
