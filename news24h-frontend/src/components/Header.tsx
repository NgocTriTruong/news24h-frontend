import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Home, ChevronDown, User, TrendingUp, Trophy, Calendar, DollarSign } from 'lucide-react';
import { CATEGORIES } from '../constants';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const visibleCategories = CATEGORIES.slice(0, 8);
  const hiddenCategories = CATEGORIES.slice(8);

  return (
    <>
      {/* MOBILE TOP BAR - Giữ nguyên */}
      <div className="fixed top-0 left-0 right-0 h-12 bg-green-600 text-white flex items-center justify-between px-4 text-sm font-medium z-50 md:hidden shadow-lg">
        <button onClick={() => setIsMenuOpen(true)} className="p-1">
          <Menu size={26} />
        </button>
        <div className="flex items-center gap-3">
          <Home size={18} />
        </div>
      </div>

      {/* HEADER CHÍNH (DESKTOP) */}
      <header className="bg-[#C70101] text-white sticky top-0 z-40 pt-12 md:pt-0 shadow-md">
        
        {/* Hàng 1: Logo + Các nút đặc biệt + Search + User */}
        <div className="container mx-auto px-6 py-5 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* LOGO - TO HƠN */}
          <Link to="/" className="shrink-0">
            <div className="bg-white px-5 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
               <img 
                alt="Tin tức 24h" 
                src="https://cdn.24h.com.vn/images/2023/logo-24h-new.svg" 
                className="h-12 md:h-14 w-auto object-contain" 
              />
            </div>
          </Link>

          {/* CÁC MỤC ĐẶC BIỆT - TO VÀ ĐẸP HƠN */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Giá vàng */}
            <Link 
              to="/gia-vang"
              className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-bold text-sm shadow-md hover:shadow-xl hover:scale-105"
            >
              <DollarSign size={18} className="group-hover:rotate-12 transition-transform" />
              <span>Giá vàng</span>
            </Link>

            {/* Cup C1 */}
            <Link 
              to="/cup-c1"
              className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold text-sm shadow-md hover:shadow-xl hover:scale-105"
            >
              <Trophy size={18} className="group-hover:rotate-12 transition-transform" />
              <span>Cup C1</span>
            </Link>

            {/* Đoán tỷ số */}
            <a 
              href="https://www.24h.com.vn/du-doan-ty-so-c685.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-bold text-sm shadow-md hover:shadow-xl hover:scale-105"
            >
              <TrendingUp size={18} className="group-hover:rotate-12 transition-transform" />
            </a>

            {/* Lịch Vạn Niên */}
            <Link 
              to="/lich-van-nien"
              className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-300 font-bold text-sm shadow-md hover:shadow-xl hover:scale-105"
            >
              <Calendar size={18} className="group-hover:rotate-12 transition-transform" />
              <span>Lịch</span>
            </Link>
          </div>

          {/* CỤM SEARCH & USER */}
          <div className="flex items-center gap-5 w-full lg:w-auto">
            {/* Search Form - LỚN VÀ ĐẸP HƠN */}
            <form onSubmit={handleSearch} className="relative w-full md:w-96 group">
              <input
                type="text"
                placeholder="Tìm kiếm tin tức..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-5 pr-12 text-base text-gray-800 bg-white border-2 border-white/20 rounded-full outline-none focus:border-white focus:ring-2 focus:ring-white/30 transition-all shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 hover:scale-110 transition-all shadow-md"
              >
                <Search size={18} />
              </button>
            </form>

            {/* User Icon - LỚN HƠN */}
            <button className="hidden md:flex flex-col items-center justify-center text-white hover:text-white hover:bg-white/15 px-4 py-2 rounded-xl transition-all group shadow-md hover:shadow-lg">
              <User size={28} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold mt-1">Tài khoản</span>
            </button>
          </div>
        </div>

        {/* Hàng 2: MENU NGANG */}
        <nav className="bg-[#a00000] border-t border-red-800/30">
          <div className="max-w-7xl mx-auto">
            <ul className="hidden md:flex items-center text-sm font-bold uppercase tracking-wide">
              {/* Icon Home */}
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 px-4 py-3 hover:bg-[#C70101] transition text-white/90 hover:text-white"
                >
                  <Home size={18} />
                </Link>
              </li>

              {/* Các mục menu chính */}
              {visibleCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="block px-4 py-3 hover:bg-[#C70101] transition whitespace-nowrap text-white/90 hover:text-white"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}

              {/* Dropdown Xem thêm */}
              {hiddenCategories.length > 0 && (
                <li className="relative ml-auto border-l border-red-800/30">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-1 px-4 py-3 hover:bg-[#C70101] transition text-white/90 hover:text-white"
                  >
                    <Menu size={18} />
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div
                      className="absolute top-full right-0 w-48 bg-white text-gray-800 shadow-xl rounded-b-lg overflow-hidden border-t-2 border-red-600 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <ul className="py-1">
                        {hiddenCategories.map((cat) => (
                          <li key={cat.slug}>
                            <Link
                              to={`/category/${cat.slug}`}
                              className="block px-5 py-2.5 hover:bg-red-50 hover:text-red-600 transition text-sm font-semibold"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>

      {/* MOBILE DRAWER - Giữ nguyên */}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-green-600 text-white z-50 overflow-y-auto shadow-2xl transition-transform duration-300">
            <div className="flex items-center justify-between p-4 border-b border-green-700 bg-green-700/50">
              <Link to="/" className="bg-white px-2 py-1 rounded" onClick={() => setIsMenuOpen(false)}>
                 <img src="https://cdn.24h.com.vn/images/2023/logo-24h-new.svg" alt="24h" className="h-6" />
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="hover:bg-green-700 p-1 rounded transition">
                <X size={24} />
              </button>
            </div>
            
            {/* Mobile Search */}
            <div className="p-4 border-b border-green-700 bg-green-800/30">
              <form onSubmit={handleSearch} className="flex relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 rounded-full text-gray-800 text-sm focus:ring-2 focus:ring-green-400 outline-none"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400">
                  <Search size={16} />
                </button>
              </form>
            </div>

            <ul className="text-base font-medium py-2">
              <li>
                <Link to="/" className="flex items-center gap-3 px-6 py-3 hover:bg-green-700 transition" onClick={() => setIsMenuOpen(false)}>
                  <Home size={18} /> Trang chủ
                </Link>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="block px-6 py-3 hover:bg-green-700 transition border-l-4 border-transparent hover:border-white pl-5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Header;