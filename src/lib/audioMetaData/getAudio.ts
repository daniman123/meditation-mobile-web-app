import path from "node:path";
import audioMetadata from "./audioMetadata.json";
import { ArrIAudioData, ObjIAudioMetaData } from "./types";

/**
 * This TypeScript function retrieves an array of audio data based on the specified audio type from a
 * given metadata object.
 * @param {string} audioType - The `audioType` parameter in the `getAudioArray` function is a string
 * that specifies the type of audio data you want to retrieve. It is used to access a specific property
 * in the `temp` object, which is then used to retrieve the audio data from the `audioData` property
 * @returns The function `getAudioArray` returns an array of audio data based on the `audioType`
 * parameter provided.
 */
export function getAudioArray(audioType: string): ArrIAudioData {
  const temp: ObjIAudioMetaData = audioMetadata[0];
  const temp_2 = temp[audioType].audioData;
  return temp_2;
}

/**
 * The function `getAudioFilePath` retrieves the absolute file path of a selected audio file based on
 * its type and name.
 * @param {string} audioType - Audio type refers to the category or type of audio file, such as
 * "music", "podcast", "sound effect", etc. It helps to identify the type of audio file you are working
 * with.
 * @param {string} selectedAudioName - The `selectedAudioName` parameter is the name of the audio file
 * that the user wants to retrieve the file path for.
 * @returns The function `getAudioFilePath` returns the absolute file path of the selected audio file
 * based on the provided audio type and selected audio name.
 */
export function getAudioFilePath(
  audioType: string,
  selectedAudioName: string
): string {
  const temp: ObjIAudioMetaData = audioMetadata[0];
  const subDirPath = temp[audioType].subDirPath;
  const fileMetaDataArray = getAudioArray(audioType);

  const fileName: string = fileMetaDataArray.filter(
    (element) => element.displayName == selectedAudioName
  )[0].fileName;

  const absolutePath = path.resolve(subDirPath, fileName);

  return absolutePath;
}
