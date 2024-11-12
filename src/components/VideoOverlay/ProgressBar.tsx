import { useCallback, useEffect, useRef, useState } from "react";

interface VideoProgressBarProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

interface AnimationProps {
  stop: boolean;
  fpsInterval: number;
  startTime: number | null;
  then: number | null;
}

const VideoProgressBar = ({ videoRef }: VideoProgressBarProps) => {
  const [progress, setProgress] = useState<number | undefined>(0);
  const frameCount = useRef(0);
  const animation = useRef<AnimationProps>({
    stop: false,
    fpsInterval: 0,
    startTime: null,
    then: null,
  });

  const animate = useCallback(() => {
    // if (animation.current.stop) return;

    requestAnimationFrame(animate);
    const now = Date.now();

    if (animation.current.then) {
      const elapsed = now - animation.current.then;

      if (elapsed > animation.current.fpsInterval) {
        animation.current.then =
          now - (elapsed % animation.current.fpsInterval);
        frameCount.current++;

        if (videoRef.current) {
          setProgress(
            (videoRef.current.currentTime / videoRef.current.duration) * 100
          );
        }
      }
    }
  }, [videoRef]);

  const startAnimating = useCallback(
    (fps: number) => {
      animation.current.fpsInterval = 1000 / fps;
      animation.current.then = Date.now();
      animation.current.startTime = animation.current.then;
      animate();
    },
    [animate]
  );

  useEffect(() => {
    startAnimating(10);
    // return () => {
    //   animation.current.stop = true;
    // };
  }, [startAnimating]);

  return (
    <div className="w-full bg-gray-200 h-2.5 dark:bg-gray-700">
      <div
        className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  h-2.5"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default VideoProgressBar;
