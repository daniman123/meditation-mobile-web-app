export interface IAudioData {
  fileName: string;
  displayName: string;
  duration: number;
}

export type ArrIAudioData = IAudioData[];

export interface IClassicAudio {
  name: string;
  subDirPath: string;
  guided: boolean;
  audioData: ArrIAudioData;
}

export interface ObjIAudioMetaData {
  [key: string]: IClassicAudio;
}

export type ArrIAudioMetaData = [ObjIAudioMetaData];
