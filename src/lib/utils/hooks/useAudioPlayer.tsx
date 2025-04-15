import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

  const play = useCallback(() => {
    audioRef.current
      ?.play()
      .then(() => {
        setAudioState((prev) => ({ ...prev, isPlaying: true }));
      })
      .catch((error) => {
        console.error("Audio playback failed", error);
      });
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setAudioState((prev) => ({ ...prev, isPlaying: false }));
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const safeTime = Math.min(Math.max(time, 0), audio.duration || 0);
    audio.currentTime = safeTime;
    setAudioState((prev) => ({ ...prev, currentTime: safeTime }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    const safeVolume = Math.min(Math.max(volume, 0), 1);
    setAudioState((prev) => ({
      ...prev,
      volume: safeVolume,
      isMuted: safeVolume === 0 ? true : prev.isMuted,
    }));
  }, []);

  const toggleMute = useCallback(() => {
    setAudioState((prev) => {
      const newMuted = !prev.isMuted;
      return {
        ...prev,
        isMuted: newMuted,
        volume: newMuted ? 0 : prev.volume,
      };
    });
  }, []);

  const controls = useMemo(
    () => ({ play, pause, seek, setVolume, toggleMute }),
    [play, pause, seek, setVolume, toggleMute]
  );

  return {
    ...audioState,
    ...controls,
    audioElement: audioRef.current as HTMLAudioElement,
  };
};

export default useAudioPlayer;
