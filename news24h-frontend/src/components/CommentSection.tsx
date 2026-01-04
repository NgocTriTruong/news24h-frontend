// components/comments/CommentSection.tsx
import React, { useEffect, useState } from "react";
import type { Comment } from "../types/CommentType";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { addComment, getComments } from "../services/api";

interface Props {
  articleId: string;
}

const CommentSection: React.FC<Props> = ({ articleId }) => {

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getComments(articleId).then(res => setComments(res.data));
  }, [articleId]);

  const handleSubmit = async (content: string) => {
    await addComment({
      articleId,
      content
    });

    const res = await getComments(articleId);
    setComments(res.data);
  };

  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold mb-3">
        Bình luận ({comments.length})
      </h2>

      <CommentForm onSubmit={handleSubmit} />

      <div className="space-y-2">
        {comments.map(c => (
          <div key={c.id}>
            <p>{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;

