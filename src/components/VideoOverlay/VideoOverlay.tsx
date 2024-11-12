import React from 'react';

import Settings from './Settings/SetttingsOverlay';

interface VideoFeedbackProps {
  feedback: boolean;
  children: React.ReactNode;
  playButton: React.ReactNode;
  muteButton: React.ReactNode;
  ProgressBar: React.ReactNode;
  // progressBar: React.MutableRefObject<number | null>;
  userInteracted: boolean;
}

const VideoOverlay = ({
  feedback,
  children,
  playButton,
  muteButton,
  ProgressBar,
  userInteracted,
}: VideoFeedbackProps) => {
  return (
    <>
      {children}
      {/* {
        <div
          className={`absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 rounded-3xl transition-opacity duration-1000 ease-in-out ${
            feedback ? "opacity-100" : "opacity-0"
          } ${!feedback && "pointer-events-none"}`}
        ></div>
      }
      {
        <div
          className={`fade-in-start absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center  z-50 rounded-3xl transition-all duration-500 ${
            feedback ? "" : "translate-y-full invisible"
          }`}
        >
          <span
            data-fade={1}
            className="animate-bounce flex flex-col gap-6 justify-center items-center"
          >
            {" "}
            <SvgBuilder svg="KeepWatching" /> <span>SWIPE UP FOR MORE ..</span>
          </span>
        </div>
      } */}
      {/* <Settings /> */}
      {!userInteracted ? (
        <div className='absolute top-0 left-0 right-0 pt-16 pl-4 flex gap-10 h-full'>
          <div>{muteButton}</div>
        </div>
      ) : null}

      <div className='flex absolute inset-0 items-center justify-center pointer-events-none transition-all'>
        <div>{playButton}</div>
      </div>

      {/* progressbar */}
      <div className=' flex flex-col-reverse absolute inset-0 pointer-events-none'>
        {ProgressBar}
      </div>
    </>
  );
};

export default React.memo(VideoOverlay);
