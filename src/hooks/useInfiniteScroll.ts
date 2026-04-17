import { useEffect, useRef } from "react";

interface Props {
  loadMore: () => void;
}

export default function useInfiniteScroll({ loadMore }: Props) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  return observerRef;
}
