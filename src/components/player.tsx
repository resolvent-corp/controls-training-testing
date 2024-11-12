import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play();
        });
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = src;
        videoRef.current.addEventListener("loadedmetadata", () => {
          videoRef.current?.play();
        });
      }
    }
  }, [src]);

  return <video ref={videoRef} controls style={{ width: "100%" }} />;
};

export default VideoPlayer;
