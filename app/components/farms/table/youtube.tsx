import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { MdClose } from "react-icons/md";
interface YouTubePlayer {
  destroy: () => void;
  playVideo: () => void;
}

interface YouTubeEvent {
  target: YouTubePlayer;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: (() => void) | undefined;
    YT: {
      Player: new (
        elementId: string,
        config: {
          height: string | number;
          width: string | number;
          videoId: string;
          playerVars?: {
            autoplay?: 0 | 1;
            controls?: 0 | 1;
            mute?: 0 | 1;
            rel: 0;
            enablejsapi?: 0 | 1;
            origin?: string;
            playsinline?: 0 | 1;
            showinfo: 0;
          };
          events?: {
            onReady?: (event: YouTubeEvent) => void;
            onStateChange?: (event: { data: number }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => YouTubePlayer;
    };
  }
}

export const YouTubePlayer = ({
  setIsVideoOpen,
}: {
  setIsVideoOpen: (isVideoOpen: boolean) => void;
}) => {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadYouTubeAPI = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.YT) {
          resolve();
          return;
        }

        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        if (firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        window.onYouTubeIframeAPIReady = () => {
          if (isMounted) {
            console.log("YouTube API Ready");
            resolve();
          }
        };

        tag.onerror = () => {
          reject(new Error("Failed to load YouTube API"));
        };
      });
    };

    const initializePlayer = async () => {
      try {
        await loadYouTubeAPI();

        console.log("Initializing player...");
        playerRef.current = new window.YT.Player("youtube-player", {
          height: "315",
          width: "560",
          videoId: "CTzAKHfbL2Y",
          playerVars: {
            autoplay: 1,
            controls: 1,
            enablejsapi: 1,
            origin: window.location.origin,
            playsinline: 1,
            mute: 0,
            rel: 0,
            showinfo: 0,
          },
          events: {
            onReady: (event: YouTubeEvent) => {
              console.log("Player ready, attempting to play...");
              setTimeout(() => {
                if (isMounted) {
                  event.target.playVideo();
                  console.log("Delayed play attempt");
                }
              }, 1000);
              if (isMounted) {
                setIsLoading(false);
              }
            },
            onStateChange: (event: { data: number }) => {
              console.log("Player state changed:", event.data);
            },
            onError: (event: { data: number }) => {
              console.error("Player error:", event.data);
              if (isMounted) {
                setError(`Player error: ${event.data}`);
                setIsLoading(false);
              }
            },
          },
        });
      } catch (err) {
        console.error("Error initializing player:", err);
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to initialize player"
          );
          setIsLoading(false);
        }
      }
    };

    initializePlayer();

    return () => {
      isMounted = false;
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleClick = () => {
    if (playerRef.current) {
      console.log("Manual play attempt");
      playerRef.current.playVideo();
    }
  };
  return (
    <Box>
      <Box>
        <MdClose onClick={() => setIsVideoOpen(false)} />
      </Box>
      {isLoading && <div>Loading player...</div>}

      <div
        id="youtube-player"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />
    </Box>
  );
};
