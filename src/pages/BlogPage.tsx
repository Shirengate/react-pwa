import ErrorList from "@/components/Posts/components/ErrorList";
import PostsList from "@/components/Posts/components/PostsList";
import PostsSkeleton from "@/components/Posts/UI/PostsSkeleton";
import Spiner from "@/components/Spiner";
import { useObserver } from "@/hooks/useObserver";
import { getPosts, clearData } from "@/store/reducer/posts";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useRef } from "react";

const BlogPage = () => {
  const dispatch = useAppDispatch();
  const { data, fetchLoading, fetchError, hasMore } = useAppSelector(
    (state) => state.posts
  );
  useEffect(() => {
    dispatch(getPosts());

    return () => {
      dispatch(clearData());
    };
  }, [dispatch]);

  const loaderRef = useRef<HTMLDivElement>(null);

  useObserver(loaderRef);

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
      {fetchLoading && <PostsSkeleton />}
      {data && !fetchError ? <PostsList posts={data} /> : <ErrorList />}
      {hasMore && (
        <div ref={loaderRef} className="flex justify-center items-center mt-10">
          <Spiner proportions={30} />
        </div>
      )}
    </>
  );
};

export default BlogPage;
