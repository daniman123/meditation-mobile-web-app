import audioMetadata from "./audioMetadata.json";
import { ArrIAudioData, ObjIAudioMetaData } from "./types";

export function getAudioArray(audioType: string): ArrIAudioData {
  const temp: ObjIAudioMetaData = audioMetadata[0];
  const temp_2 = temp[audioType].audioData;
  return temp_2;
}
