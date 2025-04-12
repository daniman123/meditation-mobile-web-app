import { expect, test } from "vitest";
import { getAudioArray } from "./getAudio.js";

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
