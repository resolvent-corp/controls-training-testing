import { IoMdPause, IoMdPlay } from "react-icons/io";

interface PlayPauseToggleProps {
  playing: boolean | null;
  playedPressed: boolean;
}
const PlayPauseToggle = ({ playing, playedPressed }: PlayPauseToggleProps) => {
  return (
    <button
      className={`play-pop rounded-full w-20 h-20 flex items-center justify-center text-[rgb(var(--light-color))]  bg-[rgba(var(--light-color)/0.25)] transition-all ${
        playedPressed ? "" : "scale-0 opacity-0"
      }`}
    >
      <div>
        {playedPressed ? (
          playing ? (
            <div>
              <IoMdPause className="w-12 h-12" />
            </div>
          ) : (
            <div>
              <IoMdPlay className="w-12 h-12" />
            </div>
          )
        ) : null}
      </div>
    </button>
  );
};
export default PlayPauseToggle;
