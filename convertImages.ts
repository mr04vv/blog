import { readdirSync } from "node:fs";
import { $ } from "bun";

const files = readdirSync("./app/pre-assets");

for (const file of files) {
  const fileName = file.split(".")[0];
  await $`ffmpeg -i ./app/pre-assets/${file} -qscale:v 60 -vf scale=1080:-1 ./app/assets/${fileName}.webp`.quiet();
}
