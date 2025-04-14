import { useEffect, useRef, useState } from "react";

interface IAudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
}

const useAudioPlayer = (trackUrl?: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioState, setAudioState] = useState<IAudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
  });

  useEffect(() => {
    audioRef.current = new Audio();

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !trackUrl) return;

    const handleLoadedData = () => {
      setAudioState((prev) => ({
        ...prev,
        duration: audio.duration,
        currentTime: 0,
      }));
    };

    audio.src = trackUrl;
    audio.load();

    audio.addEventListener("loadedmetadata", handleLoadedData);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedData);
    };
  }, [trackUrl]);

  return audioState;
};

export default useAudioPlayer;
