import axios from "axios";
import type { NewsArticle, PageResponse } from '../types';
import type { AiChatMessage, AiChatResponse, AiSummaryResponse } from "../types/ai";

// Lấy base URL từ environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Axios instance (dùng cho tất cả APIs)
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==================== NEWS API ====================
export const newsApi = {
  getTopHeadlines: async (): Promise<NewsArticle[]> => {
    const response = await api.get("/api/news/top-headlines");
    return response.data;
  },

  getByCategory: async (
    slug: string,
    page: number = 0,
    size: number = 10
  ): Promise<PageResponse<NewsArticle>> => {
    const response = await api.get(`/api/news/category/${slug}`, {
      params: { page, size }
    });
    return response.data;
  },

  getById: async (id: string): Promise<NewsArticle> => {
    const response = await api.get(`/api/news/${id}`);
    return response.data;
  },

  search: async (
    query: string,
    page: number = 0,
    size: number = 10
  ): Promise<PageResponse<NewsArticle>> => {
    const response = await api.get("/api/news/search", {
      params: { query, page, size }
    });
    return response.data;
  },

  getRelated: async (id: string): Promise<NewsArticle[]> => {
    const response = await api.get(`/api/news/${id}/related`);
    return response.data;
  },

  getBreakingTicker: async (): Promise<NewsArticle[]> => {
    const response = await api.get("/api/news/breaking-ticker");
    return response.data;
  },

  getMostViewed: async (limit: number = 10): Promise<NewsArticle[]> => {
    const response = await api.get("/api/news/most-viewed", {
      params: { limit }
    });
    return response.data;
  },
};

// ==================== FOOTBALL API ====================
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

export const footballApi = {
  getStandings: async (leagueId: string): Promise<FootballTeam[]> => {
    const response = await api.get(`/api/football/${leagueId}/standings`);
    const data: FootballTeamResponse[] = response.data;
    
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
};

// ==================== AI API ====================
export const aiApi = {
  summarize: async (articleId: string): Promise<AiSummaryResponse> => {
    const res = await api.post("/api/ai/summarize", { articleId });
    return res.data;
  },

  chat: async (
    message: string,
    history: AiChatMessage[]
  ): Promise<AiChatResponse> => {
    const res = await api.post("/api/ai/chat", { message, history });
    return res.data;
  },
};


// ================== COMMENT API ================

// export const getComments = (articleId: string) =>
//   api.get(`api/comments?articleId=${articleId}`);

// export const addComment = (data: {
//   articleId: string;
//   content: string;
// }) =>
//   api.post("api/comments", data);

// services/api.ts

export const commentApi = {
  getByArticle: (articleId: string) =>
    api.get(`/api/comments/${articleId}`),

  add: (articleId: string, content: string) =>
    api.post(
      `/api/comments/${articleId}`,
      content,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    ),
};
