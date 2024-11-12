import { useCallback, useState } from 'react';
import { FcDislike, FcLike, FcSettings, FcShare } from 'react-icons/fc';

import Quality from './QualitySettingsOverlay';

const Settings = () => {
  const [toggleSettings, setToggleSettings] = useState<boolean>(false);

  const handleVideoQualityToggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setToggleSettings((prev) => !prev);
    },
    [],
  );

  return (
    <div className='absolute top-0 right-0 flex gap-10 h-full justify-center w-16 z-50'>
      <div className='flex flex-col-reverse w-full items-center gap-10 first:mb-16'>
        <div className='relative w-full flex flex-row-reverse justify-center'>
          <button
            className='rounded-full w-12 h-12 bg-gray-100 bg-opacity-25 flex items-center justify-center'
            onClick={(e) => handleVideoQualityToggle(e)}
          >
            <FcSettings className='w-8 h-8' />
          </button>

          <Quality
            toggleSettings={toggleSettings}
            handleVideoQualityToggle={handleVideoQualityToggle}
          />
        </div>

        <button className='rounded-full w-12 h-12 bg-gray-100 bg-opacity-25 flex items-center justify-center'>
          <FcShare className='w-8 h-8' />
        </button>

        <button className='rounded-full w-12 h-12 bg-gray-100 bg-opacity-25 flex items-center justify-center'>
          <FcDislike className='w-8 h-8' />
        </button>

        <button className='rounded-full w-12 h-12 bg-gray-100 bg-opacity-25 flex items-center justify-center'>
          <FcLike className='w-8 h-8' />
        </button>
      </div>
    </div>
  );
};

export default Settings;
