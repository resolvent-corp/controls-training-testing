import { useCallback, useEffect, useRef, useState } from 'react';

interface IntersectionObserverProps {
  onIntersection: (targetVideoId: number) => void;
}

const useIntersectionObserver = ({
  onIntersection,
}: IntersectionObserverProps) => {
  const observedRefs = useRef<Map<HTMLDivElement, number>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [lastIntersected, setLastIntersected] = useState<number | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            const index = observedRefs.current?.get(
              entry.target as HTMLDivElement,
            );

            if (index != undefined && index !== lastIntersected) {
              setLastIntersected(index);
              onIntersection(index);
            }
          }
          // if (!entry.isIntersecting) {
          //   const index = observedRefs.current?.get(
          //     entry.target as HTMLDivElement
          //   );
          // }
        });
      },
      { threshold: 0.5 },
    );

    const observer = observerRef.current;
    if (observer) {
      observedRefs.current.forEach((_, node: HTMLDivElement) =>
        observer.observe(node),
      );
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [onIntersection, lastIntersected]);

  //!! Track the observered refs.
  const setObservedRef = useCallback(
    (node: HTMLDivElement | null, index: number) => {
      const observer = observerRef.current;

      if (node) {
        observedRefs.current.set(node, index);
        if (observer) observer.observe(node);
      } else {
        observedRefs.current.forEach((value: number, node: HTMLDivElement) => {
          if (value === index) {
            observer?.unobserve(node);
            observedRefs.current.delete(node);
          }
        });
      }
    },
    [],
  );

  return { setObservedRef };
};

export default useIntersectionObserver;
