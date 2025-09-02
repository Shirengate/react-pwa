import Skeleton from "react-loading-skeleton";

const PostSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            <Skeleton></Skeleton>
          </h1>
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Skeleton className="mr-4"></Skeleton>

            <Skeleton></Skeleton>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            <Skeleton></Skeleton>
          </p>
        </div>
      </article>
    </div>
  );
};

export default PostSkeleton;
