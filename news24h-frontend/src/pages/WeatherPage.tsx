import React, { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, ChevronDown } from 'lucide-react';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

interface WeatherData {
  city: string;
  currentTemp: number;
  description: string;
  todayMin: number;
  todayMax: number;
  tomorrowMin: number;
  tomorrowMax: number;
  dayAfterMin: number;
  dayAfterMax: number;
  todayDescription: string;
  tomorrowDescription: string;
  dayAfterDescription: string;
  airQuality?: number;
}

interface CityWeather {
  city: string;
  currentTemp: number | string;
  description: string;
  todayMin: number;
  todayMax: number;
  todayDesc: string;
  tomorrowMin: number;
  tomorrowMax: number;
  tomorrowDesc: string;
  dayAfterMin: number;
  dayAfterMax: number;
  dayAfterDesc: string;
}

const WeatherPage: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [selectedCity, setSelectedCity] = useState('Hà Nội');
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const cities = ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Nha Trang', 'Hải Phòng', 'Cần Thơ'];

  const airQualityData = [
    { city: 'Hà Nội', value: 188, status: 'Xấu' },
    { city: 'TP HCM', value: 97, status: 'Trung bình' },
    { city: 'Hải Phòng', value: 156, status: 'Xấu' },
    { city: 'Nha Trang', value: 61, status: 'Tốt' },
    { city: 'Đà Nẵng', value: 151, status: 'Xấu' },
    { city: 'Đà Lạt', value: 130, status: 'Xấu' },
  ];

  // Dữ liệu thời tiết mẫu cho các thành phố
  const weatherData: Record<string, CityWeather> = {
    'Hà Nội': {
      city: 'Hà Nội',
      currentTemp: 16,
      description: 'Đêm có mây',
      todayMin: 11,
      todayMax: 23,
      todayDesc: 'Ít mây, không mưa',
      tomorrowMin: 12,
      tomorrowMax: 24,
      tomorrowDesc: 'Ít mây, không mưa',
      dayAfterMin: 13,
      dayAfterMax: 25,
      dayAfterDesc: 'Ít mây, không mưa',
    },
    'TP.HCM': {
      city: 'TP.HCM',
      currentTemp: 25,
      description: 'Đêm nhiều mây',
      todayMin: 20,
      todayMax: 30,
      todayDesc: 'Có mây, không mưa',
      tomorrowMin: 21,
      tomorrowMax: 32,
      tomorrowDesc: 'Có mây, không mưa',
      dayAfterMin: 23,
      dayAfterMax: 31,
      dayAfterDesc: 'Có mây, không mưa',
    },
    'Đà Nẵng': {
      city: 'Đà Nẵng',
      currentTemp: 18,
      description: 'Đêm nhiều mây',
      todayMin: 17,
      todayMax: 24,
      todayDesc: 'Nhiều mây, không mưa',
      tomorrowMin: 15,
      tomorrowMax: 25,
      tomorrowDesc: 'Có mây, không mưa',
      dayAfterMin: 16,
      dayAfterMax: 25,
      dayAfterDesc: 'Có mây, không mưa',
    },
    'Nha Trang': {
      city: 'Nha Trang',
      currentTemp: 23,
      description: 'Đêm nhiều mây',
      todayMin: 20,
      todayMax: 28,
      todayDesc: 'Có mây, không mưa',
      tomorrowMin: 22,
      tomorrowMax: 28,
      tomorrowDesc: 'Có mây, không mưa',
      dayAfterMin: 23,
      dayAfterMax: 29,
      dayAfterDesc: 'Có mây, không mưa',
    },
    'Hải Phòng': {
      city: 'Hải Phòng',
      currentTemp: 17,
      description: 'Đêm có mây',
      todayMin: 12,
      todayMax: 23,
      todayDesc: 'Ít mây, không mưa',
      tomorrowMin: 14,
      tomorrowMax: 23,
      tomorrowDesc: 'Ít mây, không mưa',
      dayAfterMin: 13,
      dayAfterMax: 22,
      dayAfterDesc: 'Ít mây, không mưa',
    },
    'Cần Thơ': {
      city: 'Cần Thơ',
      currentTemp: 25,
      description: 'Đêm có mây',
      todayMin: 21,
      todayMax: 29,
      todayDesc: 'Có mây, không mưa',
      tomorrowMin: 20,
      tomorrowMax: 29,
      tomorrowDesc: 'Có mây, không mưa',
      dayAfterMin: 23,
      dayAfterMax: 30,
      dayAfterDesc: 'Có mây, không mưa',
    },
  };

  const allCitiesWeather: CityWeather[] = [
    { city: 'Sơn La', currentTemp: 12, description: 'Đêm có mây', todayMin: 7, todayMax: 21, todayDesc: 'Ít mây, không mưa', tomorrowMin: 8, tomorrowMax: 23, tomorrowDesc: 'Có mây, không mưa', dayAfterMin: 10, dayAfterMax: 23, dayAfterDesc: 'Ít mây, không mưa' },
    { city: 'Điện Biên', currentTemp: 'Đang cập nhật', description: '', todayMin: 10, todayMax: 23, todayDesc: 'Có mây, không mưa', tomorrowMin: 12, tomorrowMax: 25, tomorrowDesc: 'Có mây, không mưa', dayAfterMin: 11, dayAfterMax: 26, dayAfterDesc: 'Ít mây, không mưa' },
    { city: 'Hà Giang', currentTemp: 'Đang cập nhật', description: '', todayMin: 13, todayMax: 21, todayDesc: 'Có mây, không mưa', tomorrowMin: 13, tomorrowMax: 22, tomorrowDesc: 'Có mây, không mưa', dayAfterMin: 14, dayAfterMax: 24, dayAfterDesc: 'Ít mây, không mưa' },
    { city: 'Lai Châu', currentTemp: 'Đang cập nhật', description: '', todayMin: 8, todayMax: 21, todayDesc: 'Có mây, không mưa', tomorrowMin: 11, tomorrowMax: 21, tomorrowDesc: 'Có mây, không mưa', dayAfterMin: 12, dayAfterMax: 21, dayAfterDesc: 'Ít mây, không mưa' },
    { city: 'Lào Cai', currentTemp: 'Đang cập nhật', description: '', todayMin: 13, todayMax: 22, todayDesc: 'Có mây, không mưa', tomorrowMin: 12, tomorrowMax: 23, tomorrowDesc: 'Có mây, không mưa', dayAfterMin: 16, dayAfterMax: 25, dayAfterDesc: 'Ít mây, không mưa' },
    { city: 'Thái Nguyên', currentTemp: 'Đang cập nhật', description: '', todayMin: 11, todayMax: 23, todayDesc: 'Ít mây, không mưa', tomorrowMin: 10, tomorrowMax: 24, tomorrowDesc: 'Ít mây, không mưa', dayAfterMin: 12, dayAfterMax: 25, dayAfterDesc: 'Ít mây, không mưa' },
    { city: 'Vinh', currentTemp: 17, description: 'Đêm có mây', todayMin: 13, todayMax: 22, todayDesc: 'Ít mây, không mưa', tomorrowMin: 13, tomorrowMax: 23, tomorrowDesc: 'Ít mây, không mưa', dayAfterMin: 15, dayAfterMax: 23, dayAfterDesc: 'Có mây, không mưa' },
    { city: 'Pleiku', currentTemp: 15, description: 'Đêm có mây', todayMin: 12, todayMax: 24, todayDesc: 'Có mây, không mưa', tomorrowMin: 11, tomorrowMax: 26, tomorrowDesc: 'Có mây, không mưa', dayAfterMin: 13, dayAfterMax: 26, dayAfterDesc: 'Có mây, không mưa' },
    { city: 'Đà Lạt', currentTemp: 'Đang cập nhật', description: '', todayMin: 10, todayMax: 22, todayDesc: 'Có mây, không mưa', tomorrowMin: 11, tomorrowMax: 23, tomorrowDesc: 'Nhiều mây, có mưa nhỏ', dayAfterMin: 12, dayAfterMax: 23, dayAfterDesc: 'Có mây, không mưa' },
    { city: 'Huế', currentTemp: 'Đang cập nhật', description: '', todayMin: 15, todayMax: 24, todayDesc: 'Nhiều mây, không mưa', tomorrowMin: 14, tomorrowMax: 25, tomorrowDesc: 'Có mây, không mưa', dayAfterMin: 17, dayAfterMax: 24, dayAfterDesc: 'Có mây, không mưa' },
    { city: 'Vũng Tàu', currentTemp: 'Đang cập nhật', description: '', todayMin: 22, todayMax: 29, todayDesc: 'Có mây, không mưa', tomorrowMin: 23, tomorrowMax: 30, tomorrowDesc: 'Có mây, không mưa', dayAfterMin: 25, dayAfterMax: 30, dayAfterDesc: 'Có mây, không mưa' },
  ];

  useEffect(() => {
    // Cập nhật thời gian hiện tại mỗi phút
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const cityData = weatherData[selectedCity];
      if (cityData) {
        setWeather({
          city: cityData.city,
          currentTemp: cityData.currentTemp as number,
          description: cityData.description,
          todayMin: cityData.todayMin,
          todayMax: cityData.todayMax,
          tomorrowMin: cityData.tomorrowMin,
          tomorrowMax: cityData.tomorrowMax,
          dayAfterMin: cityData.dayAfterMin,
          dayAfterMax: cityData.dayAfterMax,
          todayDescription: cityData.todayDesc,
          tomorrowDescription: cityData.tomorrowDesc,
          dayAfterDescription: cityData.dayAfterDesc,
        });
      }
      setLoading(false);
    };

    loadWeather();
    window.scrollTo(0, 0);
  }, [selectedCity]);

  const formatTime = () => {
    return currentTime.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getTodayDate = () => {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const today = new Date();
    return `Hôm nay (${today.getDate()}/${today.getMonth() + 1} ${days[today.getDay()]})`;
  };

  const getTomorrowDate = () => {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return `Ngày mai (${tomorrow.getDate()}/${tomorrow.getMonth() + 1} ${days[tomorrow.getDay()]})`;
  };

  const getDayAfterDate = () => {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    return `Ngày kia (${dayAfter.getDate()}/${dayAfter.getMonth() + 1} ${days[dayAfter.getDay()]})`;
  };

  const getAirQualityColor = (value: number) => {
    if (value <= 50) return 'text-green-600 bg-green-100';
    if (value <= 100) return 'text-yellow-600 bg-yellow-100';
    if (value <= 150) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b-4 border-green-500 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">DỰ BÁO THỜI TIẾT</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Air Quality Index */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Ribbon header */}
          <div className="mb-2">
            <div className="flex items-center">
              <div className="relative inline-flex items-center">
                <span className="bg-green-500 text-white font-bold px-4 py-2 rounded-md shadow-sm">Chỉ số không khí</span>
                <span className="h-6 w-4 bg-green-500 -ml-1 transform skew-x-[-20deg] rounded-r"></span>
              </div>
              <div className="flex-1 ml-4 border-b-2 border-green-300"></div>
            </div>
          </div>

          <div className="mt-3 flex items-start justify-between gap-6">
            {/* AQI Tiles */}
            <div className="flex flex-wrap gap-4">
              {airQualityData.map((item) => (
                <div
                  key={item.city}
                  className="px-4 py-3 rounded-xl border border-green-300 shadow-sm hover:shadow-md transition hover:-translate-y-0.5 bg-white"
                >
                  <div className="text-gray-800 font-semibold text-sm text-center">{item.city}</div>
                  <div className={`mt-2 px-4 py-1.5 rounded-md font-bold text-center ${getAirQualityColor(item.value)} ring-1 ring-current/20`}> 
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-sm bg-green-500 border border-green-600"></span>
                <span className="text-gray-700 text-sm">Tốt</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-sm bg-orange-400 border border-orange-500"></span>
                <span className="text-gray-700 text-sm">Xấu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-sm bg-red-500 border border-red-600"></span>
                <span className="text-gray-700 text-sm">Kém</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Weather Widget */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg p-4 mb-6 text-white">
          <div className="mb-3">
            <h2 className="text-lg font-bold mb-2">Thời tiết trong ngày</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="appearance-none bg-white/20 backdrop-blur-sm text-white font-bold text-sm px-3 py-1.5 pr-8 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  {cities.map((city) => (
                    <option key={city} value={city} className="text-gray-900">
                      {city}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-white pointer-events-none" size={16} />
              </div>
              <span className="text-xs opacity-90">{formatTime()} - {formatDate()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Current Weather */}
            <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Cloud size={40} className="mb-1" />
              <div className="text-3xl font-bold mb-1">{weather?.currentTemp}°C</div>
              <div className="text-sm opacity-90">{weather?.description}</div>
            </div>

            {/* Today */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <h3 className="font-bold text-xs mb-2 text-center">{getTodayDate()}</h3>
              <div className="text-center mb-1">
                <span className="text-lg font-bold">{weather?.todayMin}°C - {weather?.todayMax}°C</span>
              </div>
              <p className="text-xs text-center opacity-90 line-clamp-2">{weather?.todayDescription}</p>
            </div>

            {/* Tomorrow */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <h3 className="font-bold text-xs mb-2 text-center">{getTomorrowDate()}</h3>
              <div className="text-center mb-1">
                <span className="text-lg font-bold">{weather?.tomorrowMin}°C - {weather?.tomorrowMax}°C</span>
              </div>
              <p className="text-xs text-center opacity-90 line-clamp-2">{weather?.tomorrowDescription}</p>
            </div>

            {/* Day After Tomorrow */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <h3 className="font-bold text-xs mb-2 text-center">{getDayAfterDate()}</h3>
              <div className="text-center mb-1">
                <span className="text-lg font-bold">{weather?.dayAfterMin}°C - {weather?.dayAfterMax}°C</span>
              </div>
              <p className="text-xs text-center opacity-90 line-clamp-2">{weather?.dayAfterDescription}</p>
            </div>
          </div>
        </div>

        {/* Weather Table for All Cities */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-gray-100 px-4 py-3 border-b">
            <h2 className="text-lg font-bold text-gray-900">Thời tiết các tỉnh thành</h2>
          </div>
          <div className="overflow-auto max-h-96">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Khu vực</th>
                  <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 uppercase">Hiện tại</th>
                  <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 uppercase">Hôm nay</th>
                  <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 uppercase">Ngày mai</th>
                  <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 uppercase">Ngày kia</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...Object.values(weatherData), ...allCitiesWeather].map((city, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{city.city}</span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="text-base font-bold text-blue-600">
                        {typeof city.currentTemp === 'number' ? `${city.currentTemp}°C` : city.currentTemp}
                      </div>
                      {city.description && (
                        <div className="text-xs text-gray-600">{city.description}</div>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="font-semibold text-sm">{city.todayMin}°C - {city.todayMax}°C</div>
                      <div className="text-xs text-gray-600">{city.todayDesc}</div>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="font-semibold text-sm">{city.tomorrowMin}°C - {city.tomorrowMax}°C</div>
                      <div className="text-xs text-gray-600">{city.tomorrowDesc}</div>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="font-semibold text-sm">{city.dayAfterMin}°C - {city.dayAfterMax}°C</div>
                      <div className="text-xs text-gray-600">{city.dayAfterDesc}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t">
            <p className="text-xs text-gray-600">
              Cập nhật: {formatTime()} - {formatDate()}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Nguồn: Trung tâm dự báo khí tượng thủy văn trung ương
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Thông tin chỉ mang tính tham khảo, chúng tôi không chịu bất kỳ trách nhiệm gì về việc sử dụng thông tin của các bạn.
            </p>
          </div>
        </div>

        {/* Weather News Section */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-red-600 inline-block">
            DỰ BÁO THỜI TIẾT
          </h2>
          <div className="space-y-3 mt-4">
            <Link to="/" className="block group">
              <div className="flex gap-3">
                <img 
                  src="https://cdn.24h.com.vn/upload/1-2025/images/2025-01-11/1736544373-607-thumbnail-width620height413.jpg"
                  alt="Weather news"
                  className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors mb-1 line-clamp-2">
                    Thời tiết hôm nay 11/1: Miền Bắc rét đậm, vùng núi đề phòng băng giá
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    Ngày 11/1, thời tiết trên cả nước phổ biến ít mưa, ban ngày có nắng, song rét tiếp tục bao trùm nhiều khu vực...
                  </p>
                </div>
              </div>
            </Link>

            <Link to="/" className="block group">
              <div className="flex gap-3">
                <img 
                  src="https://cdn.24h.com.vn/upload/1-2025/images/2025-01-10/1736544373-607-thumbnail-width620height413.jpg"
                  alt="Weather news"
                  className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors mb-1 line-clamp-2">
                    Hình thái thời tiết rét đậm vào đêm và nắng vào ban ngày ở miền Bắc kéo dài đến khi nào?
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    Trong một tuần tới, miền Bắc sẽ tiếp tục duy trì hình thái thời tiết không mưa, ngày nắng...
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
