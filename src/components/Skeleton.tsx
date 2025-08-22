import React from "react";

export const Skeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-pulse">
      <div className="flex items-start gap-4">
        {/* Checkbox skeleton */}
        <div className="mt-1 w-5 h-5 bg-gray-300 rounded animate-pulse"></div>

        <div className="flex-1 space-y-3">
          {/* Title skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-16 animate-pulse"></div>
          </div>

          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
          </div>

          {/* Meta info skeleton */}
          <div className="flex items-center gap-4">
            <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
          </div>
        </div>

        {/* Action buttons skeleton */}
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
