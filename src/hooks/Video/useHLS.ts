import Hls from 'hls.js';
import { useCallback, useEffect, useRef } from 'react';

import { VideoType } from '@/types/video';

interface useHLSProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  video: VideoType;
  play: boolean;
  userInteracted: boolean;
}

const useHLS = ({ videoRef, video, play, userInteracted }: useHLSProps) => {
  //const { logger } = useLogger();
  const hlsRef = useRef<Hls | null>(null);
  const playRef = useRef(play);

  const handlePlay = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (playRef.current && videoElement.readyState > 3) {
      videoElement
        .play()
        // eslint-disable-next-line no-console
        .catch((e) => console.error('Error playing video:', e));
    } else if (!playRef.current) {
      videoElement.pause();
      videoElement.currentTime = 0; // Reset the video to the beginning
    }
  }, [videoRef]);

  const onCanPlay = useCallback(() => {
    const videoElement = videoRef.current;
    if (videoElement && videoElement.readyState > 3) {
      handlePlay();
      videoElement.removeEventListener('canplay', onCanPlay); // Remove listener after the first call
    }
  }, [handlePlay, videoRef]);

  const initializeHls = useCallback(() => {
    //logger(`initializeHls again on videos ${videoRef.current?.id}`);

    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (False) {
      const hls = new Hls();
      hls.loadSource(video.mediaUrl);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement.addEventListener('canplay', onCanPlay);
      });
      hlsRef.current = hls;
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = video.mediaUrl;
      videoElement.addEventListener('loadedmetadata', () => {
        videoElement.addEventListener('canplay', onCanPlay);
      });
    } else {
      videoElement.src = video.mediaUrl;
      videoElement.addEventListener('canplay', onCanPlay);
    }
  }, [video.mediaUrl, onCanPlay, videoRef]);

  useEffect(() => {
    playRef.current = play;
    handlePlay();
  }, [play, handlePlay]);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = videoRef.current;
    initializeHls();

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (videoElement) {
        videoElement.removeEventListener('canplay', onCanPlay);
        videoElement.pause();
        videoElement.src = '';
      }
    };
  }, [initializeHls, onCanPlay, videoRef]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement && userInteracted) {
      videoElement.muted = false;
    }
  }, [userInteracted, videoRef]);

  return {};
};

export default useHLS;
