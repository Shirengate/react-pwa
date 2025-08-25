import type { Post } from "@/types/types";
import { memo, type FC } from "react";
import { useAppDispatch } from "@/store/store";
import { toggleFavorite } from "@/store/reducer/favorite";
interface PostProps {
  post: Post;
  isFavorite: boolean;
}
const PostItem: FC<PostProps> = memo(({ post, isFavorite }) => {
  const dispatch = useAppDispatch();

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm text-gray-500">Post #{post.id}</span>
        <span className="text-gray-300">•</span>
        <span className="text-sm text-gray-500">User {post.userId}</span>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer transition-colors duration-200">
        {post.title}
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">{post.body}</p>

      <div className="flex items-center justify-between">
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
          Read More →
        </button>
        <div className="flex gap-2">
          <button
            onClick={() =>
              dispatch(toggleFavorite({ id: post.id, favorite: !isFavorite }))
            }
            className="p-2 cursor-pointer text-gray-400 hover:text-red-500 transition-colors duration-200"
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </article>
  );
});

export default PostItem;
