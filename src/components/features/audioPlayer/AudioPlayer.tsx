import { IAudioData } from "@/lib/audioMetaData/types";

export interface IAudioPlayer {
  audioData: IAudioData;
}

const AudioPlayer = ({ audioData }: IAudioPlayer) => {
  return <div className="">{audioData.fileName}</div>;
};

export default AudioPlayer;
