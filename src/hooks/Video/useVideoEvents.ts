import { useCallback, useEffect } from 'react';

interface useVideoEventsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  handleEndVideoFeedback: (index: number, value: boolean) => void;
}

const useVideoEvents = ({
  videoRef,
  handleEndVideoFeedback,
}: useVideoEventsProps) => {
  const handleVideoEnd = useCallback(() => {
    if (videoRef.current) {
      handleEndVideoFeedback(parseInt(videoRef.current.id), false);
      //isFeedbackHandled.current = false;
      //default option when video end is to set its currentTime to zero and replay it
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [handleEndVideoFeedback, videoRef]);

  useEffect(() => {
    if (!videoRef.current) return;
    //     videoRef.current.addEventListener("timeupdate", handleFeedbackEvent);

    const videoElementRef = videoRef.current;
    videoElementRef.addEventListener('ended', handleVideoEnd);
    // videoRef.current.addEventListener("loadedmetadata", handleResumeTime);

    return () => {
      // videoRef.current?.removeEventListener("touchstart", preventOverlay);
      // videoRef.current?.removeEventListener("touchend", preventOverlay);
      // videoRef.current?.removeEventListener("timeupdate", handleFeedbackEvent);
      videoElementRef.removeEventListener('ended', handleVideoEnd);
      // videoRef.current?.removeEventListener("loadedmetadata", handleResumeTime);
    };
  }, [handleVideoEnd, videoRef]);

  // const isFeedbackHandled = useRef<boolean>(false);

  // //!!Video events
  // const handleFeedbackEvent = useCallback(() => {
  //   if (videoRef.current) {
  //     const remainingTime =
  //       videoRef.current.duration - videoRef.current.currentTime;
  //     if (remainingTime <= 12 && !isFeedbackHandled.current) {
  //       handleEndVideoFeedback(parseInt(videoRef.current.id), true);
  //       isFeedbackHandled.current = true;
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   playRef.current = play;
  // }, [play]);

  // const handleResumeTime = useCallback(() => {
  //   if (videoRef.current) {
  //     if (playRef.current) {
  //       // //resume the video
  //       // videoRef.current.currentTime = lastPlaybackTime.current;
  //       videoRef.current.play();
  //     }
  //   }
  // }, []);
};
export default useVideoEvents;
