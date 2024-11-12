'use client';

import React, { useCallback, useRef } from 'react';

import useLogger from '@/hooks/Logger/useLogger';
import useVideoPlayControl from '@/hooks/VideoOverlay/useVideoPlayControls';

import MuteToggle from '../VideoOverlay/MuteToggle';
import PlayPauseToggle from '../VideoOverlay/PlayPauseToggle';
import VideoProgressBar from '../VideoOverlay/ProgressBar';
import VideoOverlay from '../VideoOverlay/VideoOverlay';
import useHLS from '../../hooks/Video/useHLS';

import { VideoType } from '@/types/video';

interface VideoProps {
  loc: string;
  observedBy: (node: HTMLDivElement | null, index: number) => void;
  video: VideoType;
  isPlaying: boolean;
  handleendfeedback: (index: number, value: boolean) => void;
  userInteracted: boolean;
  InteractionReference: React.MutableRefObject<boolean>;
}

const Video = ({
  loc,
  observedBy,
  video,
  isPlaying,
  handleendfeedback,
  userInteracted,
  InteractionReference,
}: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { logger } = useLogger();

  // useVideoEvents({ videoRef, handleEndVideoFeedback: handleendfeedback });

  //logger(`isPlaying: ${isPlaying} videoId ${videoRef.current?.id}`);
  useHLS({
    videoRef,
    video,
    play: isPlaying,
    userInteracted,
  });

  const { handlePlay, playing, playedPressed } = useVideoPlayControl({
    videoRef,
    isPlaying,
  });

  const handleVideoPlay = useCallback(() => {
    //logger(`interactionReference: ${InteractionReference.current}`);
    if (!InteractionReference.current) {
      InteractionReference.current = true;
      if (videoRef.current) videoRef.current.muted = false;
    } else handlePlay();
  }, [InteractionReference, handlePlay]);

  return (
    <div
      ref={(node) => observedBy(node, parseInt(loc))}
      className='h-[100svh] cursor-pointer aspect-[9/16] relative md:rounded-xl overflow-hidden snap-always snap-start md:first:mt-4 w-full'
      data-index={parseInt(loc)}
      onClick={handleVideoPlay}
    >
      <VideoOverlay
        feedback={false}
        playButton={
          <PlayPauseToggle playing={playing} playedPressed={playedPressed} />
        }
        muteButton={<MuteToggle />}
        ProgressBar={<VideoProgressBar videoRef={videoRef} />}
        userInteracted={userInteracted}
      >
        <video
          ref={videoRef}
          poster={video.thumbnail}
          id={loc}
          autoFocus
          autoPlay={true}
          muted={true}
          playsInline
          preload='auto'
          controlsList='nofullscreen'
          className='h-full w-full object-contain bg-black'
        />
      </VideoOverlay>
    </div>
  );
};

export default React.memo(Video);
