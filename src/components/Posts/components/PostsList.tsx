import type { Posts } from "@/types/types";
import { type FC } from "react";
import PostItem from "./Post";
import { useAppSelector } from "@/store/store";

interface Props {
  posts: Posts;
}
const PostsList: FC<Props> = ({ posts }) => {
  const favoritePosts = useAppSelector((state) => state.favoritePosts.postsId);

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <PostItem
          isFavorite={favoritePosts.includes(post.id)}
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
};

export default PostsList;
