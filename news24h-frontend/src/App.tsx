import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import NewsDetailPage from './pages/NewsDetailPage';
import SearchPage from './pages/SearchPage';
import GoldPricePage from './pages/GoldPricePage';
import CupC1Page from './pages/CupC1Page';
import FootballStandingsPage from './pages/FootballStandingsPage';
import FootballSchedulePage from './pages/FootballSchedulePage';
import FootballResultsPage from './pages/FootballResultsPage';
import LunarCalendarPage from './pages/LunarCalendarPage';
import TopScorersPage from './pages/TopScorersPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/gia-vang" element={<GoldPricePage />} />
            <Route path="/cup-c1" element={<CupC1Page />} />
            <Route path="/bxh" element={<FootballStandingsPage />} />
            <Route path="/lich-thi-dau" element={<FootballSchedulePage />} />
            <Route path="/ket-qua" element={<FootballResultsPage />} />
            <Route path="/lich-van-nien" element={<LunarCalendarPage />} />
            <Route path="/top-ghi-ban" element={<TopScorersPage />} />
            <Route path="/category/top-ghi-ban" element={<TopScorersPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;