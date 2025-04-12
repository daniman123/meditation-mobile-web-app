import { expect, test } from "vitest";
import { getAudioArray, getAudioFilePath } from "./getAudio.js";

test("return ArrIAudioData", () => {
  const audioType = "classicAudio";
  const audioArray = getAudioArray(audioType);
  // console.log(audioArray);

  expect(audioArray).toStrictEqual([
    { fileName: "1min - Guided.mp3", displayName: "1min", duration: 60 },
    { fileName: "2min - Guided.mp3", displayName: "2min", duration: 120 },
    { fileName: "3min - Guided.mp3", displayName: "3min", duration: 180 },
    { fileName: "5min - Guided.mp3", displayName: "5min", duration: 300 },
    { fileName: "10min - Guided.mp3", displayName: "10min", duration: 600 },
    { fileName: "15min - Guided.mp3", displayName: "15min", duration: 900 },
    { fileName: "20min - Guided.mp3", displayName: "20min", duration: 1200 },
  ]);
});

test("return audioFilePath", () => {
  const audioType = "classicAudio";
  const audioFilePath = getAudioFilePath(audioType, "1min");
  // console.log(audioFilePath);

  const actualPath =
    "C:\\Users\\Danie\\Desktop\\programming\\JavaScript\\meditation-mobile-web-app\\public\\audio\\classic\\1min - Guided.mp3";
  expect(audioFilePath).toBe(actualPath);
});
