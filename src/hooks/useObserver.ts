import { addPosts } from "@/store/reducer/posts";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, type Ref } from "react";

export function useObserver<T extends HTMLElement>(refLink: Ref<T>) {
  const dispatch = useAppDispatch();
  const { loading, fetchLoading, hasMore } = useAppSelector(
    (state) => state.posts
  );
  useEffect(() => {
    const callback = (
      entry: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entry.forEach((item) => {
        if (item.isIntersecting) {
          if (!hasMore) {
            observer.unobserve(item.target);
            observer.disconnect();
            return;
          }
          if (!loading && !fetchLoading) {
            dispatch(addPosts());
          }
        }
      });
    };

    const obs = new IntersectionObserver(callback);
    if (refLink && "current" in refLink && refLink.current) {
      obs.observe(refLink.current);
    }

    return () => {
      if (refLink && "current" in refLink && refLink.current) {
        obs.unobserve(refLink.current);
      }
      obs.disconnect();
    };
  }, [refLink, dispatch, loading, fetchLoading, hasMore]);
}
