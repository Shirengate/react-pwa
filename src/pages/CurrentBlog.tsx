import PostSkeleton from "@/components/Posts/UI/PostSkeleton";
import { useGetPostQuery } from "@/store/api/post";
import { useParams } from "react-router";
const CurrentBlog = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, isError, isFetching } = useGetPostQuery(id);

  if (isLoading || isFetching) {
    return <PostSkeleton />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {data.title}
          </h1>
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span className="mr-4">By User #{data.userId}</span>
            <span>Post ID: {data.id}</span>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {data.body}
          </p>
        </div>
      </article>
    </div>
  );
};

export default CurrentBlog;
