import React, { useCallback, useRef, useState } from "react";
import { Link } from "react-router";
import { useFetcher } from "react-router";

const PreloadLink = ({
  to,
  children,
  preloadDelay = 100,
  preloadTimeout = 5000,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  preloadDelay?: number;
  preloadTimeout?: number;
}) => {
  const fetcher = useFetcher();
  const preloadTimerRef = useRef<NodeJS.Timeout | null>(null);
  const preloadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hasPreloaded, setHasPreloaded] = useState(false);

  const handlePreload = useCallback(() => {
    if (preloadTimerRef.current) {
      clearTimeout(preloadTimerRef.current);
    }

    if (!hasPreloaded) {
      preloadTimerRef.current = setTimeout(() => {
        fetcher.load(to);
        setHasPreloaded(true);

        preloadTimeoutRef.current = setTimeout(() => {
          setHasPreloaded(false);
        }, preloadTimeout);
      }, preloadDelay);
    }
  }, [to, fetcher, hasPreloaded, preloadDelay, preloadTimeout]);

  const handleMouseLeave = useCallback(() => {
    if (preloadTimerRef.current) {
      clearTimeout(preloadTimerRef.current);
    }
  }, []);

  React.useEffect(() => {
    return () => {
      if (preloadTimerRef.current) {
        clearTimeout(preloadTimerRef.current);
      }
      if (preloadTimeoutRef.current) {
        clearTimeout(preloadTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Link
      to={to}
      style={{ textDecoration: "none", color: "inherit" }}
      onMouseEnter={handlePreload}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  );
};

export default PreloadLink;
