import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, ListFilter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { footballApi } from '../services/api';

interface Team {
  rank: number;
  name: string;
  logo: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  recentForm: string; // "WDLWW" format from backend
}

interface League {
  id: string;
  name: string;
  icon: string;
}

const FootballStandingsPage: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState('cup-c1');
  const [standings, setStandings] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [season, setSeason] = useState('2025/2026');

  const leagues: League[] = [
    { id: 'ngoai-hang-anh', name: 'Ngoại hạng Anh', icon: '⚽' },
    { id: 'la-liga', name: 'La Liga', icon: '🇪🇸' },
    { id: 'v-league', name: 'V.League 1', icon: '🇻🇳' },
    { id: 'serie-a', name: 'Serie A', icon: '🇮🇹' },
    { id: 'cup-c1', name: 'Champions League', icon: '🏆' },
    { id: 'bundesliga', name: 'Bundesliga', icon: '🇩🇪' },
    { id: 'ligue-1', name: 'Ligue 1', icon: '🇫🇷' },
  ];

  useEffect(() => {
    fetchStandings();
  }, [selectedLeague]);

  const fetchStandings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await footballApi.getStandings(selectedLeague);
      setStandings(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching standings:', err);
      setError('Không thể tải dữ liệu bảng xếp hạng. Vui lòng kiểm tra kết nối backend.');
      setLoading(false);
    }
  };

  const getFormColor = (result: 'W' | 'D' | 'L') => {
    switch (result) {
      case 'W': return 'bg-green-500';
      case 'D': return 'bg-gray-400';
      case 'L': return 'bg-red-500';
    }
  };

  const getFormIcon = (result: 'W' | 'D' | 'L') => {
    switch (result) {
      case 'W': return '✓';
      case 'D': return '=';
      case 'L': return '✗';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">⚠️ Lỗi tải dữ liệu</div>
        <div className="text-gray-600 mb-4">{error}</div>
        <button 
          onClick={fetchStandings}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 mb-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Bảng Xếp Hạng Bóng Đá</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-blue-200">Mùa giải:</span>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="2025/2026">2025/2026</option>
              <option value="2024/2025">2024/2025</option>
              <option value="2023/2024">2023/2024</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* League Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b">
            <ListFilter className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-700">Danh sách giải</span>
          </div>
          <div className="flex overflow-x-auto">
            {leagues.map((league) => (
              <button
                key={league.id}
                onClick={() => setSelectedLeague(league.id)}
                className={`flex-shrink-0 px-6 py-4 font-medium border-b-4 transition-colors ${
                  selectedLeague === league.id
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-transparent hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{league.icon}</span>
                  <span>{league.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <Link to="/lich-thi-dau" className="px-6 py-3 font-medium text-gray-600 hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span>Lịch thi đấu</span>
              </div>
            </Link>
            <button className="px-6 py-3 font-medium text-blue-600 border-b-2 border-blue-600">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Bảng xếp hạng</span>
              </div>
            </button>
          </div>
        </div>

        {/* Standings Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase">TT</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase">Đội</th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase">Trận</th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase">Thắng</th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase">Hòa</th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase">Thua</th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase">Bàn<br/>thắng</th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase">Bàn<br/>thua</th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase">Hiệu<br/>số</th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase">Điểm</th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase">Kết quả 5 trận gần nhất</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {standings.map((team, index) => (
                  <tr 
                    key={index}
                    className={`hover:bg-blue-50 transition-colors ${
                      team.rank <= 3 ? 'bg-green-50/30' : 
                      team.rank <= 4 ? 'bg-blue-50/30' : 
                      team.rank >= standings.length - 2 ? 'bg-red-50/30' : ''
                    }`}
                  >
                    <td className="px-4 py-4 text-center">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                        team.rank <= 3 ? 'bg-green-500 text-white' :
                        team.rank <= 4 ? 'bg-blue-500 text-white' :
                        team.rank >= standings.length - 2 ? 'bg-red-500 text-white' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {team.rank}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={team.logo} 
                          alt={team.name}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray"><circle cx="12" cy="12" r="10"/></svg>';
                          }}
                        />
                        <span className="font-semibold text-gray-900">{team.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center font-medium text-gray-700">{team.played}</td>
                    <td className="px-4 py-4 text-center font-medium text-green-600">{team.won}</td>
                    <td className="px-4 py-4 text-center font-medium text-gray-600">{team.drawn}</td>
                    <td className="px-4 py-4 text-center font-medium text-red-600">{team.lost}</td>
                    <td className="px-4 py-4 text-center font-medium text-gray-700">{team.goalsFor}</td>
                    <td className="px-4 py-4 text-center font-medium text-gray-700">{team.goalsAgainst}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-block px-2 py-1 rounded text-sm font-bold ${
                        team.goalDifference > 0 ? 'text-green-600' : 
                        team.goalDifference < 0 ? 'text-red-600' : 
                        'text-gray-600'
                      }`}>
                        {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-lg font-bold text-sm">
                        {team.points}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1">
                        {(team.recentForm || '').split('').filter(c => c === 'W' || c === 'D' || c === 'L').slice(-5).map((result, idx) => (
                          <div
                            key={idx}
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${getFormColor(result as 'W' | 'D' | 'L')}`}
                            title={result === 'W' ? 'Thắng' : result === 'D' ? 'Hòa' : 'Thua'}
                          >
                            {getFormIcon(result as 'W' | 'D' | 'L')}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="bg-gray-50 px-6 py-4 border-t">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-gray-700">Vòng knock-out</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span className="text-gray-700">Play-off</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-gray-700">Xuống hạng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootballStandingsPage;
