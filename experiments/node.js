const A = require("arcsecond");
const B = require("arcsecond-binary");
const C = require("construct-js");
const fs = require("fs");
const path = require("path");

const file = fs.readFileSync(path.join(__dirname, "./test.wav"));

const riffChunkSize = B.u32LE.chain((size) => {
  if (size !== file.length - 8) {
    return A.fail(`Invalid file size: ${file.length}. Expected ${size}`);
  }
  return A.succeedWith(size);
});

const riffChunk = A.sequenceOf([
  A.str("RIFF"),
  riffChunkSize,
  A.str("WAVE"),
]);