import path from "path";
import readline from "readline";
import { extractFrames } from "./get-frames";
import { handleFrame } from "./handle-frame";
import { AudioPlayer } from "./audio-player";

const audioPlayer = AudioPlayer();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  console.clear();
  console.log("Loading Video...");
  const videoPath = path.resolve(__dirname, "../assets/video.mp4");
  const videoFrames = await extractFrames(videoPath);

  console.clear();
  console.log("Parse Frames...");
  const frames: string[] = [];
  for (const frame of videoFrames) {
    frames.push(await handleFrame(frame));
  }

  for (let i = 0; i < frames.length; i++) {
    // process.stdout.clearLine(1);
    // process.stdout.cursorTo(0);
    const frame = frames[i];
    audioPlayer.play(videoPath);
    console.log(frame + `\nframes(${i + 1}/${frames.length})`);
    await sleep(1000 / 30);
  }

  audioPlayer?.kill();
})();

process.on("SIGINT", () => {
  audioPlayer?.kill();
  process.exit();
});
