import { useCallback, useEffect, useState } from 'react';

interface useVideoPlayControlProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying?: boolean;
}
const useVideoPlayControl = ({
  videoRef,
  isPlaying,
}: useVideoPlayControlProps) => {
  const [playing, setPlaying] = useState<boolean | null>(null);
  const [playedPressed, setPlayedPressed] = useState<boolean>(false);

  useEffect(() => {
    setPlaying(isPlaying ? isPlaying : null);
  }, [isPlaying]);

  useEffect(() => {
    if (playedPressed) {
      const timer = setTimeout(() => {
        setPlayedPressed(false);
      }, 1700);
      return () => clearTimeout(timer);
    }
  }, [playedPressed]);

  //handle video play-pause
  const handlePlay = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        videoRef.current.muted = false;
        setPlaying(true);
      } else {
        videoRef.current.pause();
        setPlaying(false);
        videoRef.current.muted = true;
      }
      setPlayedPressed(true);
    }
  }, [videoRef]);

  return { handlePlay, playing, playedPressed };
};

export default useVideoPlayControl;
