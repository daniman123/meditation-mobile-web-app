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

    return () => audio.removeEventListener("loadedmetadata", handleLoadedData);
  }, [trackUrl]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleTimeUpdate = () => {
      setAudioState((prev) => ({
        ...prev,
        currentTime: audio.currentTime,
      }));
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.muted = audioState.isMuted;
    audio.volume = audioState.volume;
  }, [audioState.isMuted, audioState.volume]);

  return {
    ...audioState,
    audioElement: audioRef.current as HTMLAudioElement,
  };
};

export default useAudioPlayer;
