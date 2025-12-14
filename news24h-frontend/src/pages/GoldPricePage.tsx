// src/pages/GoldPricePage.tsx
import React, { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';

interface GoldPrice {
  id: string;
  goldType: string;
  company: string;
  buyPrice: number;
  sellPrice: number;
  crawledAt: string;
  updatedAt: string;
}

const GoldPricePage: React.FC = () => {
  const [goldPrices, setGoldPrices] = useState<GoldPrice[]>([]);
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

  useEffect(() => {
    fetchGoldPrices();
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN');
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

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-yellow-500 to-yellow-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Loại vàng
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-white uppercase tracking-wider">
                  Giá mua vào (₫)
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-white uppercase tracking-wider">
                  Giá bán ra (₫)
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                  Chênh lệch
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
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
           Lưu ý về giá vàng
        </h3>
        <ul className="text-blue-800 space-y-1 text-sm">
          <li>📊 Đơn vị tính: Nghìn đồng (VNĐ)</li>
          <li>🔄 Giá vàng được cập nhật tự động mỗi 30 phút</li>
          <li>⚠️ Giá chỉ mang tính chất tham khảo</li>
          <li>🌐 Nguồn: giavang.net</li>
        </ul>
      </div>
    </div>
  );
};

export default GoldPricePage;
