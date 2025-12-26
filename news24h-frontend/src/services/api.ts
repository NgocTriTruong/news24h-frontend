import axios from "axios";
import type { NewsArticle, PageResponse } from '../types';
import type { AiChatMessage, AiChatResponse, AiSummaryResponse } from "../types/ai";

//  Axios instance (dùng cho AI)
const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
   baseURL: "https://api.animalsfeeds.online",
}); 
// attach token 
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// const API_BASE_URL = 'http://localhost:8080/api/news';
const API_BASE_URL = 'https://api.animalsfeeds.online/api/news';

export const newsApi = {
  // Lấy tin tức nổi bật
  getTopHeadlines: async (): Promise<NewsArticle[]> => {
    const response = await fetch(`${API_BASE_URL}/top-headlines`);
    if (!response.ok) throw new Error('Failed to fetch top headlines');
    return response.json();
  },

  // Lấy tin tức theo danh mục
  getByCategory: async (
    slug: string,
    page: number = 0,
    size: number = 10
  ): Promise<PageResponse<NewsArticle>> => {
    const response = await fetch(
      `${API_BASE_URL}/category/${slug}?page=${page}&size=${size}`
    );
    if (!response.ok) throw new Error('Failed to fetch category news');
    return response.json();
  },

  // Lấy chi tiết tin tức
  getById: async (id: string): Promise<NewsArticle> => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch news detail');
    return response.json();
  },

  // Tìm kiếm tin tức
  search: async (
    query: string,
    page: number = 0,
    size: number = 10
  ): Promise<PageResponse<NewsArticle>> => {
    const response = await fetch(
      `${API_BASE_URL}/search?query=${encodeURIComponent(query)}&page=${page}&size=${size}`
    );
    if (!response.ok) throw new Error('Failed to search news');
    return response.json();
  },

  // Lấy tin liên quan
  getRelated: async (id: string): Promise<NewsArticle[]> => {
    const response = await fetch(`${API_BASE_URL}/${id}/related`);
    if (!response.ok) throw new Error('Failed to fetch related news');
    return response.json();
  },

  // Lấy tin nóng
  getBreakingTicker: async (): Promise<NewsArticle[]> => {
    const response = await fetch(`${API_BASE_URL}/breaking-ticker`);
    if (!response.ok) throw new Error('Failed to fetch breaking news');
    return response.json();
  },
};

// Football API
interface FootballTeamResponse {
  position: number;
  teamName: string;
  teamLogo: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  recentForm: string;
}

interface FootballTeam {
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
  recentForm: string;
}

const FOOTBALL_API_BASE_URL = 'https://api.animalsfeeds.online/api/football';

export const footballApi = {
  // Lấy bảng xếp hạng theo giải đấu
  getStandings: async (leagueId: string): Promise<FootballTeam[]> => {
    const response = await fetch(`${FOOTBALL_API_BASE_URL}/${leagueId}/standings`);
    if (!response.ok) throw new Error('Failed to fetch standings');
    const data: FootballTeamResponse[] = await response.json();
    
    // Map backend response to frontend interface
    return data.map(team => ({
      rank: team.position,
      name: team.teamName,
      logo: team.teamLogo,
      played: team.matchesPlayed,
      won: team.wins,
      drawn: team.draws,
      lost: team.losses,
      goalsFor: team.goalsFor,
      goalsAgainst: team.goalsAgainst,
      goalDifference: team.goalDifference,
      points: team.points,
      recentForm: team.recentForm
    }));
  }
}
/**
 * =========================
 * AI API
 * =========================
 */
export const aiApi = {
  // Tóm tắt bài viết
  summarize: async (articleId: string): Promise<AiSummaryResponse> => {
    const res = await api.post("/api/ai/summarize", {
      articleId,
    });
    return res.data;
  },

  // Chat AI
  chat: async (
    message: string,
    history: AiChatMessage[]
  ): Promise<AiChatResponse> => {
    const res = await api.post("/api/ai/chat", {
      message,
      history,
    });
    return res.data;
  },
};