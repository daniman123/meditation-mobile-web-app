import { IAudioData } from "@/lib/audioMetaData/types";
import { useRef } from "react";

export interface IAudioPlayer {
  audioData: IAudioData;
}

const AudioPlayer = ({ audioData }: IAudioPlayer) => {
  const audioRef = useRef<null | HTMLAudioElement>(null);

  return (
    <div className="h-21 w-3">
      <div>
        asdd
        <audio ref={audioRef} controls>
          <source
            src={`/audio/classic/${audioData.fileName}`}
            type="audio/mpeg"
          />
        </audio>
      </div>
    </div>
  );
};

export default AudioPlayer;
