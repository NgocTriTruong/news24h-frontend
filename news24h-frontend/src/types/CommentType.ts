// export type Comment = {
//   id: string;
//   articleId: string;
//   author: string;
//   content: string;
//   createdAt: string;
// };

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  userName: string;
}
