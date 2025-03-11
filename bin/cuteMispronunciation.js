import { CLI } from "../lib/cli.js";
import { Response } from "../lib/response.js";

const ui = new CLI();
const word = await ui.inputWord();
const response = new Response(word);
const responseWord = response.createWord();
console.log(responseWord);
