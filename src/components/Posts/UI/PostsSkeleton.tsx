import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const PostsSkeleton = () => {
  return (
    <SkeletonTheme>
      <div className="grid gap-6">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <article
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-500">
                  <Skeleton width={20} height={20} />
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-sm  text-gray-500">
                  <Skeleton width={20} height={20} />
                </span>
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                <Skeleton />
              </h2>

              <p className="text-gray-600 leading-relaxed mb-4">
                <Skeleton height={50} />
              </p>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                    <Skeleton width={100} height={20} />
                  </button>
                </div>
              </div>
            </article>
          ))}
      </div>
    </SkeletonTheme>
  );
};

export default PostsSkeleton;
