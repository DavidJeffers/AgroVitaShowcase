import { useRef, useState, MouseEvent, useEffect } from "react";
import { Box, Typography, Link, CircularProgress, Portal } from "@mui/material";
import { useFetcher } from "react-router";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import type { CompleteMetadata } from "~/utils/metadataFetcher.server";

interface LinkPreviewProps {
  url?: string;
  name: string;
  symbol: boolean;
}

interface PreviewSize {
  width: string;
  height: string;
  minHeight?: string;
  maxHeight?: string;
}

export const cleanText = (text: string | null | undefined): string => {
  if (!text) return "";

  return text
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#x2d;/g, "-")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&nbsp;/g, " ");
};

export const LinkPreview = ({ url, name, symbol }: LinkPreviewProps) => {
  const [hover, setHover] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const fetcher = useFetcher<CompleteMetadata>();

  const getPreviewSize = (data: CompleteMetadata): PreviewSize => {
    const { openGraph, description } = data;
    const hasImage = openGraph?.ogImage;
    const hasDescription = openGraph?.ogDescription || description;

    if (!hasImage && !hasDescription) {
      return {
        width: "400px",
        height: "auto",
        minHeight: "100px",
        maxHeight: "150px",
      };
    }

    if (!hasImage) {
      return {
        width: "600px",
        height: "auto",
        minHeight: "200px",
        maxHeight: "300px",
      };
    }

    return {
      width: "600px",
      height: "400px",
    };
  };

  const handleMouseEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let top = rect.top + window.scrollY;
    let left = rect.right + window.scrollX + 10;

    if (left + 600 > viewportWidth) {
      left = rect.left + window.scrollX - 610;
    }

    if (top + 400 > viewportHeight + window.scrollY) {
      top = viewportHeight + window.scrollY - 420;
    }

    setPosition({ top, left });
    setHover(true);
  };

  useEffect(() => {
    if (hover && !hasAttemptedFetch && url) {
      setHasAttemptedFetch(true);
      fetcher.load(`/api/metadata?url=${encodeURIComponent(url)}`);
    }
  }, [hover, url, fetcher, hasAttemptedFetch]);

  const renderMetadata = () => {
    if (!fetcher.data) return null;

    const { openGraph, title, description } = fetcher.data;

    /* Clean all text content with null safety */
    const cleanedTitle = cleanText(openGraph?.ogTitle || title);
    const cleanedOgDescription = cleanText(openGraph?.ogDescription);
    const cleanedDescription = cleanText(description);

    let disc = cleanedOgDescription;
    const hasOpenGraph =
      openGraph &&
      (openGraph.ogTitle || openGraph.ogDescription || openGraph.ogImage);

    if (cleanedOgDescription && cleanedDescription) {
      disc =
        cleanedOgDescription.length > cleanedDescription.length
          ? cleanedOgDescription
          : cleanedDescription;
    } else if (!cleanedOgDescription && cleanedDescription) {
      disc = cleanedDescription;
    }

    return (
      <Box
        ref={contentRef}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          maxWidth: "100%",
          height: "100%",
        }}
      >
        {hasOpenGraph ? (
          <>
            {openGraph.ogImage && (
              <Box
                sx={{
                  width: "100%",
                  height: "180px",
                  mb: 3,
                  overflow: "auto",
                  borderRadius: 1,
                  flexShrink: 1,
                }}
              >
                <img
                  src={openGraph.ogImage}
                  alt={cleanedTitle || ""}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "fill",
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </Box>
            )}
            <Box
              sx={{
                flexGrow: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: disc ? 2 : 0,
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  lineHeight: 1.4,
                  flexShrink: 0,
                }}
              >
                {cleanedTitle}
              </Typography>
              {disc && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    overflow: "visible",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 6,
                    mb: 2,
                    lineHeight: 1.6,
                    flexGrow: 1,
                  }}
                >
                  {disc}
                </Typography>
              )}
            </Box>
          </>
        ) : (
          <>
            <Typography
              variant="h6"
              sx={{
                mb: cleanedDescription ? 2 : 0,
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                lineHeight: 1.4,
              }}
            >
              {cleanedTitle}
            </Typography>
            {cleanedDescription && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 6,
                  mb: 2,
                  lineHeight: 1.6,
                }}
              >
                {cleanedDescription}
              </Typography>
            )}
          </>
        )}
      </Box>
    );
  };

  return (
    <>
      <Link
        ref={linkRef}
        href={url}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHover(false)}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          textDecoration: "none",
          color: "primary.main",
          "&:hover": {
            textDecoration: "underline",
            color: "primary.dark",
          },
          display: "block",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {symbol ? <FaExternalLinkSquareAlt size={11} /> : name}
      </Link>

      {hover && (
        <Portal>
          <Box
            sx={{
              position: "absolute",
              top: position.top,
              left: position.left,
              zIndex: 9999,
              bgcolor: "background.paper",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              overflow: "hidden",
              animation: "fadeIn 0.2s ease-in-out",
              "@keyframes fadeIn": {
                from: {
                  opacity: 0,
                  transform: "translateY(10px)",
                },
                to: {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {fetcher.data && (
              <Box
                sx={{
                  position: "relative",
                  ...getPreviewSize(fetcher.data),
                  overflowY: "auto",
                }}
              >
                {renderMetadata()}
              </Box>
            )}
            {!fetcher.data && (
              <Box
                sx={{
                  position: "relative",
                  width: "600px",
                  height: "400px",
                  overflowY: "auto",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "background.paper",
                  }}
                >
                  <CircularProgress size={24} />
                </Box>
              </Box>
            )}
          </Box>
        </Portal>
      )}
    </>
  );
};
