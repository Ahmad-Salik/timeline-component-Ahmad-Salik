import { useEffect, useRef, useCallback } from 'react';

interface UseScrollSyncProps {
  enabled?: boolean;
}

export const useScrollSync = ({ enabled = true }: UseScrollSyncProps = {}) => {
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);
  const isSyncingRef = useRef(false);

  const syncScroll = useCallback((source: HTMLDivElement, target: HTMLDivElement) => {
    if (!enabled || isSyncingRef.current) return;

    isSyncingRef.current = true;
    
    target.scrollLeft = source.scrollLeft;
    target.scrollTop = source.scrollTop;

    // Reset syncing flag after a short delay
    setTimeout(() => {
      isSyncingRef.current = false;
    }, 10);
  }, [enabled]);

  useEffect(() => {
    const element1 = scrollRef1.current;
    const element2 = scrollRef2.current;

    if (!element1 || !element2 || !enabled) return;

    const handleScroll1 = () => syncScroll(element1, element2);
    const handleScroll2 = () => syncScroll(element2, element1);

    element1.addEventListener('scroll', handleScroll1);
    element2.addEventListener('scroll', handleScroll2);

    return () => {
      element1.removeEventListener('scroll', handleScroll1);
      element2.removeEventListener('scroll', handleScroll2);
    };
  }, [enabled, syncScroll]);

  const scrollTo = useCallback((x: number, y: number) => {
    if (scrollRef1.current) {
      scrollRef1.current.scrollLeft = x;
      scrollRef1.current.scrollTop = y;
    }
    if (scrollRef2.current) {
      scrollRef2.current.scrollLeft = x;
      scrollRef2.current.scrollTop = y;
    }
  }, []);

  const scrollToElement = useCallback((element: HTMLElement, behavior: ScrollBehavior = 'smooth') => {
    if (scrollRef1.current) {
      element.scrollIntoView({ behavior, block: 'nearest', inline: 'center' });
    }
  }, []);

  return {
    scrollRef1,
    scrollRef2,
    scrollTo,
    scrollToElement,
  };
};

