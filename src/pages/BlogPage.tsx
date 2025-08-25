import ErrorList from "@/components/Posts/components/ErrorList";
import PostsList from "@/components/Posts/components/PostsList";
import PostsSkeleton from "@/components/Posts/UI/PostsSkeleton";
import { useGetAllPostsQuery } from "@/store/api/posts";

const BlogPage = () => {
  const { data, isLoading, isFetching, isError } = useGetAllPostsQuery("");

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl text-center font-bold text-gray-800 mb-2">
          Blog Posts
        </h1>
        <p className="text-center text-gray-600">
          Explore our latest articles and insights
        </p>
      </div>
      {(isLoading || isFetching) && <PostsSkeleton />}
      {data && !isError ? <PostsList posts={data} /> : <ErrorList />}
    </>
  );
};

export default BlogPage;
