import { useCallback } from 'react';
import { GiSettingsKnobs } from 'react-icons/gi';

interface QualityProps {
  toggleSettings: boolean;
  handleVideoQualityToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Quality = ({
  toggleSettings,
  handleVideoQualityToggle,
}: QualityProps) => {
  const list = ['360', '720', '1080', 'auto'];

  const handleChooseQuality = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      handleVideoQualityToggle(e);
    },
    [handleVideoQualityToggle],
  );
  return (
    <div className='absolute bottom-full rounded-2xl z-40 mt-2 transform -translate-x-1/3 w-[150px] overflow-auto bg-black backdrop-blur-sm bg-opacity-70 mb-1'>
      <div className='flex flex-col items-center rounded-lg border-none'>
        {toggleSettings &&
          list.map((value: string, index: number) => {
            return (
              <button
                key={index}
                className='flex flex-row w-full gap-x-2 p-2 hover:bg-black hover:bg-opacity-35'
                onClick={(e) => handleChooseQuality(e)}
              >
                <span>
                  <GiSettingsKnobs className='w-auto h-auto text-white' />
                </span>

                <span className='font-sans font-semibold'>{value}</span>
              </button>
            );
          })}
      </div>
    </div>
  );
};
export default Quality;
