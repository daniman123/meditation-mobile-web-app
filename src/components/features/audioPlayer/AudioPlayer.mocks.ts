import { IAudioPlayer } from "./AudioPlayer";

const base: IAudioPlayer = {
  audioData: {
    fileName: "/audio/classic/1min - Guided.mp3",
    displayName: "1min",
    duration: 60,
  },
};

export const mockAudioPlayerProps = {
  base,
};
