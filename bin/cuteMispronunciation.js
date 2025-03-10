import { CLI } from "../lib/cli.js";
import { Mispronunciation } from "../lib/mispronunciation.js";

const ui = new CLI();
const givenWord = await ui.inputWord();
const mispronunciation = new Mispronunciation(givenWord);
const mispronunciationWord = mispronunciation.create();
console.log(mispronunciationWord);
