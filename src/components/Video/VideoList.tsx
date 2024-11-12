'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import useEndVideoFeedback from '@/hooks/VideoOverlay/useEndVideoFeedback';

import Video from './Video';
import useIntersectionObserver from '../../hooks/IntersectionManager/useIntersectionObserver';
import { data } from '../../mockdata/data.dummy';

import { VideoType } from '@/types/video';

const VideoList = () => {
  const videos: VideoType[] = data;

  const [, setPage] = useState<number>(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const InteractionDoneReference = useRef<boolean>(false);

  const [currentVideo, setCurrentVideo] = useState(0);

  //const { logger } = useLogger();

  const { endVideosFeedback, handleSetEndVideoFeedback } = useEndVideoFeedback({
    videosCount: videos.length,
  });

  const onIntersection = useCallback((videoIndex: number) => {
    setCurrentVideo(videoIndex);
    //console.log("currentIndex: ", videoIndex);
    //logger(`currentIndex ${videoIndex}`);
  }, []);

  const { setObservedRef } = useIntersectionObserver({ onIntersection });

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUserInteraction = (e: any) => {
    if (e.type === 'click' || (e.type === 'touchend' && !hasTouchMoved)) {
      setUserInteracted(true);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleUserInteraction);
      document.removeEventListener('touchmove', handleTouchMove);
    }
  };

  let touchStartX = 0;
  let touchStartY = 0;
  let hasTouchMoved = false;

  const handleTouchStart = (event: TouchEvent) => {
    if (event.touches.length === 1) {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
      hasTouchMoved = false;
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (event.touches.length === 1) {
      // Only track single touch events
      const deltaX = Math.abs(event.touches[0].clientX - touchStartX);
      const deltaY = Math.abs(event.touches[0].clientY - touchStartY);
      const d = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

      if (d > 10) {
        hasTouchMoved = true;
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleUserInteraction, {
      passive: false,
    });
    document.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    });
    document.addEventListener('touchend', handleUserInteraction, {
      passive: false,
    });
    document.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleUserInteraction);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className='md:flex md:items-center md:justify-center min-h-screen w-full bg-black'>
      {videos.length ? (
        <InfiniteScroll
          dataLength={videos.length}
          next={handleNextPage}
          hasMore={true}
          loader={<span className='loader'></span>}
          endMessage={<p className='end-message'>You have reached the end!</p>}
          onScroll={() => {
            scrollBy(0, -1);
          }}
          className='flex flex-col snap-y snap-mandatory overflow-y-scroll max-h-[100svh] w-full gap-0 md:gap-4'
        >
          {videos.map((video: VideoType, index: number) => {
            return (
              <div key={video.id} className='flex items-center justify-start'>
                <Video
                  loc={index.toString()}
                  observedBy={setObservedRef}
                  video={video}
                  isPlaying={index === currentVideo}
                  handleendfeedback={handleSetEndVideoFeedback}
                  userInteracted={userInteracted}
                  InteractionReference={InteractionDoneReference}
                />
              </div>
            );
          })}
        </InfiniteScroll>
      ) : (
        <span className='loader'></span>
      )}
    </div>
  );
};

export default VideoList;
