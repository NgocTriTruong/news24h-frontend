export type Comment = {
  id: string;
  articleId: string;
  author: string;
  content: string;
  createdAt: string;
  parentId?: string; // trả lời bình luận
};