import { useEffect, useState } from "react";
import { RiVolumeMuteLine } from "react-icons/ri";

const MuteToggle = () => {
  const [muted, setMuted] = useState<boolean>(true);

  useEffect(() => {
    if (muted) {
      const timer = setTimeout(() => {
        setMuted(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [muted]);

  return (
    <div
      className={`w-32 h-14 flex rounded-2xl flex-wrap flex-row items-center justify-center gap-4 transition-all duration-[200ms] z-50 bg-gray-200 text-black font-serif font-semibold border-2 border-black ${
        muted ? "w-56" : ""
      }`}
    >
      <button className="ml-4">
        <span>TAP TO UNMUTE</span>
      </button>

      {muted ? <RiVolumeMuteLine className="w-8 h-8 mr-4" /> : ""}
    </div>
  );
};

export default MuteToggle;
