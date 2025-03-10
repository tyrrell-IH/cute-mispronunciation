import { CLI } from "../lib/cli.js";

const ui = new CLI();
const word = await ui.inputWord();
console.log(word);
