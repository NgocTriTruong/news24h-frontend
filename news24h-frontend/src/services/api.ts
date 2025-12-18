import type { NewsArticle, PageResponse } from '../types';

// const API_BASE_URL = 'http://localhost:8080/api/news';
const API_BASE_URL = 'http://139.59.249.140:8080/api/news';

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